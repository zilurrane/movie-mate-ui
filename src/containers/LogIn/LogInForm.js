import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LogInForm = ({ onFormSubmit }) => {
    return (
        <Form
            name="login_form"
            className="login-form"
            onFinish={onFormSubmit}
        >
            <Form.Item
                name="userName"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Button block type="primary" htmlType="submit">
                    Sign in
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LogInForm;
