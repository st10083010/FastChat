import React from 'react';
import { Button, Flex, Form, Input } from 'antd';
import { req_post } from '../../tools/request';

const Register = () => {
    const onFinish = async (values) => {
        const path = "auth/register";
        const response = await req_post(values, path);
        console.log("Response: ", response);
    };

    return (
        <>
            <Flex align={'center'} justify={'space-between'}>
                <Button type='default' href='/'>Return</Button>
                <h1>Register</h1>
            </Flex>
            <Form name='registerForm' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ minWidth: 450 }}
                onFinish={onFinish}
            >
                <Form.Item label="E-mail" name="email" rules={[
                    { type: 'email', message: "The input is not valid E-mail." },
                    { required: true, message: "Please input your E-mail." }
                ]}>
                    <Input/>
                </Form.Item>

                {/* 只允許英數字及_符號 */}
                <Form.Item label="Username" name="username" rules={[
                    { type: 'string', pattern: /^[a-zA-Z0-9_]{3,20}$/, message: "The username can only contain A-Z, 0-9, and '_', with a length of 3 to 20 characters." },
                    { required: true, message: "Please input your Username" }
                ]}>
                    <Input/>
                </Form.Item>

                {/* 只允許英數字及_符號 */}
                <Form.Item label="Password" name="password" rules={[
                    { type: 'string', pattern: /^[a-zA-Z0-9_]{8,20}$/, message: "The password can only contain A-Z, 0-9, and '_', with a length of 8 to 20 characters."},
                    { required: true, message: "Please input your Password" }
                ]}>
                    <Input.Password/>
                </Form.Item>

                <Form.Item label="Confirm Password" name="confirm_password" dependencies={["password"]} rules={[
                    { required: true, message: "Please input your Confirm Password" },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error("The new password that you entered do not match."));
                        }
                    })
                ]}>
                    <Input.Password/>
                </Form.Item>
        
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default Register;