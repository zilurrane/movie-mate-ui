import { PureComponent } from "react";
import { Layout, Col, Row, Pagination } from 'antd';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import MovieCardList from "./MovieCardList";
import { getMovieList } from "../../shared/service";
import { DEFAULT_SORT } from "../../shared/constants";
import MovieSortSelect from "./MovieSortSelect";

const { Content } = Layout;

class MovieListPage extends PureComponent {

    constructor() {
        super();
        this.onPageChange = this.handlePageChange.bind(this);
        this.onSortSelection = this.handleSortSelection.bind(this);
    }

    state = {
        data: [],
        isMovieFetchFailed: false,
        page: 1,
        limit: 12,
        totalCount: 0,
        isLoadingMovies: false,
        sort: DEFAULT_SORT
    }

    componentDidMount() {
        this.getMovieList();
    }

    handlePageChange(page, pageSize) {
        this.setState({ page, limit: pageSize, isLoadingMovies: true }, this.getMovieList);
    }

    handleSortSelection(sort) {
        this.setState({ sort, isLoadingMovies: true }, this.getMovieList);
    }

    async getMovieList() {
        try {
            const { page, limit, sort } = this.state;
            const sortData = sort.split("-");
            const response = await getMovieList(page - 1, limit, sortData[0], sortData[1]);
            if (response && response.data) {
                this.setState({ data: response.data, totalCount: response.totalCount, isMovieFetchFailed: false, isLoadingMovies: false });
            }
        } catch {
            this.setState({ data: [], isMovieFetchFailed: true, isLoadingMovies: false });
        }
    }

    render() {
        const { data, totalCount, page, limit, isLoadingMovies, sort } = this.state;
        return <Layout className="movie-layout">
            <Header />
            <Content className="movie-container">
                <Row justify="center" className="movie-list-actions">
                    <Col span={18}>
                        <Row justify="end">
                            <Col>
                                <MovieSortSelect onSortSelection={this.onSortSelection} sort={sort} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={18}>
                        <MovieCardList data={data} isLoadingMovies={isLoadingMovies} />
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
