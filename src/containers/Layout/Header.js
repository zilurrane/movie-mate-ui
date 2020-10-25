import { Layout } from 'antd';

function Header() {
    return <Layout.Header className="header">
        <div className="title">MovieMate</div>
        <div className="user-login">
            <a>Login</a>
        </div>
    </Layout.Header>
}

export default Header;
