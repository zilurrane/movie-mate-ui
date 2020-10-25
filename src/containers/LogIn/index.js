import { PureComponent } from 'react';
import { Card, Alert } from 'antd';
import LogInForm from './LogInForm';
import { login } from '../../shared/service';
import { storeAuthToken, storeLoggedInUserInfo } from '../../shared/storage-helper';
import { Redirect } from 'react-router-dom';

class LogInPage extends PureComponent {

    state = {
        errorMessage: undefined
    }

    constructor() {
        super();
        this.onFormSubmit = this.handleFormSubmit.bind(this);
    }

    processLoginSucess(userResponse) {
        storeLoggedInUserInfo(userResponse.data);
        storeAuthToken(userResponse.token);
        this.props.history.push('/admin');
    }

    processLoginFailure(error) {
        const errorMessage = error?.error?.message || 'We are unable to process your request, please try again later.';
        this.setState({ errorMessage });
    }

    handleFormSubmit(values) {
        try {
            login(values)
                .then(userResponse => {
                    if (userResponse && userResponse.token) {
                        this.processLoginSucess(userResponse);
                    } else {
                        this.processLoginFailure(userResponse);
                    }
                })
                .catch(error => {
                    this.processLoginFailure(error);
                });
        } catch (error) {
            this.processLoginFailure(error);
        }
    }

    render() {
        const { errorMessage } = this.state;
        return <div className="login-container">
            <Card
                className="login-card"
                hoverable>
                <h2 className="title">Sign In</h2>
                {
                    errorMessage && <Alert
                        description={errorMessage}
                        type="error"
                    />
                }
                <LogInForm onFormSubmit={this.onFormSubmit} />
            </Card>
        </div>;
    }
}

export default LogInPage;
