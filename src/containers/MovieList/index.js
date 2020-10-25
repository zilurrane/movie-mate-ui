import { PureComponent } from "react";
import { Layout, Col, Row, Pagination, Modal, notification, Button } from 'antd';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import MovieCardList from "./MovieCardList";
import { addMovie, deleteMovie, getGenreList, getMovieList, editMovie } from "../../shared/service";
import { DEFAULT_SORT, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../../shared/constants";
import MovieSortSelect from "./MovieSortSelect";
import MovieSearchInput from "./MovieSearchInput";
import MovieGenreTagSelect from "./MovieGenreTagSelect";
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import AddEditMovieModal from "./AddEditMovieModal";

const { Content } = Layout;
const { confirm } = Modal;

class MovieListPage extends PureComponent {

    constructor() {
        super();
        this.onPageChange = this.handlePageChange.bind(this);
        this.onSortSelection = this.handleSortSelection.bind(this);
        this.onSearch = this.handleSearch.bind(this);
        this.onSearchQueryChange = this.handleSearchQueryChange.bind(this);
        this.onGenreTagChange = this.handleGenreTagChange.bind(this);
        this.onMovieDelete = this.handleMovieDelete.bind(this);
        this.onMovieEdit = this.handleMovieEdit.bind(this);
        this.openAddMovieModal = this.handleAddModalOpen.bind(this);
        this.closeAddMovieModal = this.handleAddModalClose.bind(this);
        this.onAddEditMovieFormSubmit = this.handleAddEditMovieFormSubmit.bind(this);
    }

    state = {
        data: [],
        isMovieFetchFailed: false,
        page: DEFAULT_PAGE_NUMBER,
        limit: DEFAULT_PAGE_SIZE,
        totalCount: 0,
        isLoadingMovies: false,
        sort: DEFAULT_SORT,
        query: '',
        genreList: [],
        isAddEditMovieModalVisible: false,
        isEditMovieView: false,
        allGenreList: [],
        selectedMovie: {}
    }

    componentDidMount() {
        this.getMovieList();
        this.getAllGenreList();
    }

    getAllGenreList() {
        try {
            getGenreList()
                .then(data => {
                    const allGenreList = data.map(({ name }) => name);
                    this.setState({ allGenreList });
                });
        } catch (_error) {
            this.setState({ allGenreList: [] });
        }
    }

    handlePageChange(page, pageSize) {
        this.setState({ page, limit: pageSize, isLoadingMovies: true }, this.getMovieList);
    }

    handleSortSelection(sort) {
        this.setState({ sort, isLoadingMovies: true }, this.getMovieList);
    }

    handleSearchQueryChange(event) {
        const query = event.target.value;
        this.setState({ query })
    }

    handleSearch() {
        this.setState({ page: DEFAULT_PAGE_NUMBER, limit: DEFAULT_PAGE_SIZE, isLoadingMovies: true }, this.getMovieList);
    }

    onAddEditSuccess() {
        this.handleSearch();
        this.getAllGenreList();
    }

    handleGenreTagChange(genre, checked) {
        const { genreList } = this.state;
        const nextGenreList = checked ? [...genreList, genre] : genreList.filter(item => item !== genre);
        this.setState({ genreList: nextGenreList, page: DEFAULT_PAGE_NUMBER, limit: DEFAULT_PAGE_SIZE, isLoadingMovies: true }, this.getMovieList);
    }

    processApiCallFailure(error) {
        const errorMessage = error?.error?.message || 'We are unable to process your request, please try again later.';
        notification.error({
            message: 'Error',
            description: errorMessage
        });
    }

    handleMovieDelete(movie) {
        try {
            confirm({
                title: 'Are you sure delete this movie?',
                icon: <ExclamationCircleOutlined />,
                content: movie.name,
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: () => {
                    deleteMovie(movie._id).then(async response => {
                        if (response.ok) {
                            notification.success({
                                message: 'Success',
                                description: 'Selected movie has been deleted successfully.'
                            });
                            this.handleSearch();
                        } else {
                            const data = await response.json().then();
                            this.processApiCallFailure(data);
                        }
                    }).catch(error => {
                        this.processApiCallFailure(error);
                    });
                }
            });
        } catch (error) {
            this.processApiCallFailure(error);
        }
    }

    handleAddEditMovieFormSubmit(values, callBack) {
        try {
            const { isEditMovieView, selectedMovie } = this.state;
            if (isEditMovieView) {

                const updateRequest = {
                    genre: values.genre,
                    popularity99: values.popularity99,
                    director: values.director,
                    imdb_score: values.imdb_score
                }
                editMovie(selectedMovie._id, updateRequest).then(async response => {
                    if (response.ok) {
                        notification.success({
                            message: 'Success',
                            description: 'Movie has been updated successfully.'
                        });
                        if (callBack) {
                            callBack();
                            this.setState({ isAddEditMovieModalVisible: false, selectedMovie: {} }, this.onAddEditSuccess);
                        }
                    } else {
                        const data = await response.json().then();
                        this.processApiCallFailure(data);
                    }
                }).catch(error => {
                    this.processApiCallFailure(error);
                });
            } else {
                addMovie(values).then(async response => {
                    if (response.ok) {
                        notification.success({
                            message: 'Success',
                            description: 'Movie has been added successfully.'
                        });
                        if (callBack) {
                            callBack();
                            this.setState({ isAddEditMovieModalVisible: false, selectedMovie: {} }, this.onAddEditSuccess);
                        }
                    } else {
                        const data = await response.json().then();
                        this.processApiCallFailure(data);
                    }
                }).catch(error => {
                    this.processApiCallFailure(error);
                });
            }
        } catch (error) {
            this.processApiCallFailure(error);
        }
    }

    handleMovieEdit(movie) {
        console.log(movie);
        this.setState({ isAddEditMovieModalVisible: true, isEditMovieView: true, selectedMovie: movie });
    }

    handleAddModalOpen() {
        this.setState({ isAddEditMovieModalVisible: true, isEditMovieView: false, selectedMovie: {} });
    }

    handleAddModalClose() {
        this.setState({ isAddEditMovieModalVisible: false, selectedMovie: {} });
    }

    async getMovieList() {
        try {
            const { page, limit, sort, query, genreList } = this.state;
            const sortData = sort.split("-");
            const response = await getMovieList(page - 1, limit, sortData[0], sortData[1], query, genreList);
            if (response && response.data) {
                this.setState({ data: response.data, totalCount: response.totalCount, isMovieFetchFailed: false, isLoadingMovies: false });
            }
        } catch {
            this.setState({ data: [], isMovieFetchFailed: true, isLoadingMovies: false });
        }
    }

    render() {
        const { data, totalCount, page, limit, isLoadingMovies, sort, genreList, isAddEditMovieModalVisible, isEditMovieView, allGenreList, selectedMovie } = this.state;
        const { isAdminRoute } = this.props;
        return <Layout className="movie-layout">
            <Header />
            <Content className="movie-container">
                <Row justify="center" className="movie-list-actions">
                    <Col span={18}>
                        <Row className="search-action">
                            <Col span={24}>
                                <MovieSearchInput onSearch={this.onSearch} onChange={this.onSearchQueryChange} />
                            </Col>
                        </Row>
                        <Row className="search-action">
                            <Col>
                                <MovieSortSelect onSortSelection={this.onSortSelection} sort={sort} />
                            </Col>
                        </Row>
                        <Row className="search-action">
                            <Col>
                                <MovieGenreTagSelect allGenreList={allGenreList} selectedTags={genreList} onChange={this.onGenreTagChange} />
                            </Col>
                        </Row>
                        {
                            isAdminRoute && <Row justify="end" className="search-action">
                                <Col>
                                    <Button onClick={this.openAddMovieModal} type="primary" icon={<PlusOutlined />}>
                                        Add Movie
                                    </Button>
                                    <AddEditMovieModal
                                        isEditMovieView={isEditMovieView}
                                        visible={isAddEditMovieModalVisible}
                                        handleCancel={this.closeAddMovieModal}
                                        handleOk={this.onAddEditMovieFormSubmit}
                                        allGenreList={allGenreList}
                                        selectedMovie={selectedMovie}
                                    />
                                </Col>
                            </Row>
                        }
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={18}>
                        <MovieCardList isAdminRoute={isAdminRoute} data={data} isLoadingMovies={isLoadingMovies} onMovieEdit={this.onMovieEdit} onMovieDelete={this.onMovieDelete} />
                    </Col>
                </Row>
                <Row justify="center">
                    <Pagination
                        hideOnSinglePage
                        defaultCurrent={1}
                        current={page}
                        defaultPageSize={limit}
                        showSizeChanger={false}
                        total={totalCount}
                        onChange={this.onPageChange}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} movies`}
                    />
                </Row>
            </Content>
            <Footer />
        </Layout>
    }
}

export default MovieListPage;
