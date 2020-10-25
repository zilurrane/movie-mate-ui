import { PureComponent } from "react";
import { Card } from 'antd';
import LogInForm from "./LogInForm";

class LogInPage extends PureComponent {
    render() {
        return <div className="login-container">
            <Card
                className="login-card"
                hoverable>
                    <h2 className="title">Log In</h2>
                <LogInForm />
            </Card>
        </div>;
    }
}

export default LogInPage;
