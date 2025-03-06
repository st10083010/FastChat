import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const Login = () => (
    <Form name='basic' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ minWidth: 450 }}>
        <Form.Item label="Account" name="account" >
            <Input/>
        </Form.Item>

        <Form.Item label="Password" name="password">
            <Input.Password/>
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember Me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
);

export default Login;