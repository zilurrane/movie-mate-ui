import { Layout } from 'antd';
import { Link } from 'react-router-dom';

function Header() {
    return <Layout.Header className="header">
        <div className="title">MovieMate</div>
        <div className="user-login">
            <Link to="/auth/login">Login</Link>
        </div>
    </Layout.Header>
}

export default Header;
