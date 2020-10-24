import { PureComponent } from "react";
import { Layout } from 'antd';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const { Content } = Layout;

class MovieListPage extends PureComponent {
    render() {
        return <Layout>
            <Header />
            <Content>Content</Content>
            <Footer />
        </Layout>
    }
}

export default MovieListPage;
