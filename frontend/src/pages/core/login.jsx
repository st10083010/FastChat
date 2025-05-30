import React from 'react';
import { Button, Form, Input } from 'antd';
import { baseUrl, headers } from '../../configs/config';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setAccessToken, setUserInfo } from '../../store/user_slice'

// 登入
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

        if (res.ok) {
            const responseBody = await res.json();
            console.log(responseBody);
            dispatch(setAccessToken(responseBody.access_token));
            dispatch(setUserInfo(responseBody.user_info));
            navigate(`/chat?token=${responseBody.access_token}`);
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