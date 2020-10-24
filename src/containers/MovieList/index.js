import { PureComponent } from "react";
import { Layout, Col, Row } from 'antd';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import MovieCardList from "./MovieCardList";
import { getMovieList } from "../../shared/service";

const { Content } = Layout;

class MovieListPage extends PureComponent {

    state = {
        data: [],
        isMovieFetchFailed: false,
        page: 0,
        limit: 6
    }

    componentDidMount() {
        this.getMovieList();
    }

    async getMovieList() {
        try {
            const { page, limit } = this.state;
            const response = await getMovieList(page, limit);
            if (response && response.data) {
                this.setState({ data: response.data, isMovieFetchFailed: false });
            }
        } catch {
            this.setState({ data: [], isMovieFetchFailed: true });
        }
    }

    render() {
        const { data } = this.state;
        return <Layout className="movie-layout">
            <Header />
            <Content className="movie-container">
                <Row justify="center">
                    <Col span={18}>
                        <MovieCardList data={data} />
                    </Col>
                </Row>
            </Content>
            <Footer />
        </Layout>
    }
}

export default MovieListPage;
