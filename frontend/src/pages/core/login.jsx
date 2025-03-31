import React from 'react';
import { Button, Form, Input } from 'antd';
import { req_post } from '../../tools/request';

const Login = () => {
    const onLogin = async (values) => {
        const path = "auth/login";
        const response = await req_post(values, path);
        console.log(response);
    }


    return (
        <Form name='loginForm' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ minWidth: 450 }}
            onFinish={onLogin}
        >
            <Form.Item label="Email" name="email" >
                <Input/>
            </Form.Item>

            <Form.Item label="Password" name="password">
                <Input.Password/>
            </Form.Item>

            {/* <Form.Item name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember Me</Checkbox>
            </Form.Item> */}

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
};

export default Login;