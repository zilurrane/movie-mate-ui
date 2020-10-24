import { PureComponent } from "react";
import { Layout, List, Card, Col, Row } from 'antd';
import { convertStringArrayToCsv } from '../../shared/utility';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const data = [
    {
        "genre": [
            "Drama",
            "Fantasy",
            "Mystery",
            "Sci-Fi",
            "Thriller"
        ],
        "_id": "5f93bc9ed5bab8355082abed",
        "popularity99": 95,
        "director": "John Brahm",
        "imdb_score": 9.5,
        "name": "The Twilight Zone",
        "createdDate": "2020-10-24T05:33:18.050Z",
        "__v": 0
    },
    {
        "genre": [
            "Drama",
            "Fantasy",
            "Mystery",
            "Sci-Fi",
            "Thriller"
        ],
        "_id": "5f93bc9ed5bab8355082abed",
        "popularity99": 95,
        "director": "John Brahm",
        "imdb_score": 9.5,
        "name": "The Twilight Zone 1234 Pro Max Superstar",
        "createdDate": "2020-10-24T05:33:18.050Z",
        "__v": 0
    },
    {
        "genre": [
            "Drama",
            "Fantasy",
            "Mystery",
            "Sci-Fi",
            "Thriller"
        ],
        "_id": "5f93bc9ed5bab8355082abed",
        "popularity99": 95,
        "director": "John Brahm",
        "imdb_score": 9.5,
        "name": "The Twilight Zone",
        "createdDate": "2020-10-24T05:33:18.050Z",
        "__v": 0
    },
    {
        "genre": [
            "Drama",
            "Fantasy",
            "Mystery",
            "Sci-Fi",
            "Thriller"
        ],
        "_id": "5f93bc9ed5bab8355082abed",
        "popularity99": 95,
        "director": "John Brahm",
        "imdb_score": 9.5,
        "name": "The Twilight Zone",
        "createdDate": "2020-10-24T05:33:18.050Z",
        "__v": 0
    }
];

const { Content } = Layout;

class MovieListPage extends PureComponent {
    render() {
        return <Layout className="movie-layout">
            <Header />
            <Content className="movie-container">
                <Row justify="center">
                    <Col span={18}>
                        <List
                            grid={{
                                gutter: 16,
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 3,
                                xl: 3,
                                xxl: 3
                            }}
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <Card title={item.name}>
                                        <div className="movie-meta">
                                            <b>Director: </b>
                                            {item.director}
                                        </div>
                                        <div className="movie-meta">
                                            <b>IMDB Rating: </b>
                                            {item.imdb_score}
                                        </div>
                                        <div className="movie-meta">
                                            <b>Popularity: </b>
                                            {item.popularity99}
                                        </div>
                                        <div className="movie-meta">
                                            <b>Genre: </b>
                                            {convertStringArrayToCsv(item.genre)}
                                        </div>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </Content>
            <Footer />
        </Layout>
    }
}

export default MovieListPage;
