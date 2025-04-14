import React from 'react';
import { Button, Form, Input } from 'antd';
import { baseUrl, headers } from '../../configs/config';
import { useNavigate } from 'react-router';

// 登入
const Login = () => {
    const navigate = useNavigate();

    const onLogin = async (values) => {
        // 送出登入表單
        const path = baseUrl + "auth/login";

        let datas = JSON.stringify(values);
        const res = await fetch(path, {
            method: "POST",
            headers: headers,
            body: datas,
            credentials: "include"
        });

        // console.log(res);
        if (res.ok) {
            navigate("/chat");
        } else {
            // TODO: Error處理
            console.log("error");
        }
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
                    Log in
                </Button>
            </Form.Item>
        </Form>
    )
};

export default Login;