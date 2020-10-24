import { PureComponent } from "react";
import { Layout, Col, Row, Pagination } from 'antd';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import MovieCardList from "./MovieCardList";
import { getMovieList } from "../../shared/service";

const { Content } = Layout;

class MovieListPage extends PureComponent {

    constructor() {
        super();
        this.onPageChange = this.handlePageChange.bind(this);
    }

    state = {
        data: [],
        isMovieFetchFailed: false,
        page: 1,
        limit: 6,
        totalCount: 0,
        isLoadingMovies: false,
    }

    componentDidMount() {
        this.getMovieList();
    }

    handlePageChange(page, pageSize) {
        this.setState({ page, limit: pageSize, isLoadingMovies: true }, this.getMovieList);
    }

    async getMovieList() {
        try {
            const { page, limit } = this.state;
            const response = await getMovieList(page - 1, limit);
            if (response && response.data) {
                this.setState({ data: response.data, totalCount: response.totalCount, isMovieFetchFailed: false, isLoadingMovies: false });
            }
        } catch {
            this.setState({ data: [], isMovieFetchFailed: true, isLoadingMovies: false });
        }
    }

    render() {
        const { data, totalCount, page, limit, isLoadingMovies } = this.state;
        return <Layout className="movie-layout">
            <Header />
            <Content className="movie-container">
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
