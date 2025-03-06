// import { useState } from 'react'
// import './App.css'

import { Flex, Divider } from "antd";
import Login from "./pages/core/login";
import LoginOptions from "./pages/core/login_options";

const App = () => {
    return (
        <Flex justify="center" gap="large">
            <Login/>
            <Divider type="vertical" style={{ height: 200 }}/>
            <LoginOptions/>
        </Flex>
    )
};

export default App
