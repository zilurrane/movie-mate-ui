import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { getLoggedInUserInfo } from '../../shared/storage-helper';

function Header() {
    const userInfo = getLoggedInUserInfo();
    return <Layout.Header className="header">
        <div className="title">MovieMate</div>
        {
            userInfo && userInfo.name
                ?
                <div className="user-login">
                    Welcome {userInfo.name} | <Link to="/auth/login">Sign Out</Link>
                </div>
                :
                <div className="user-login">
                    <Link to="/auth/login">Sign In</Link>
                </div>
        }
    </Layout.Header>
}

export default Header;
