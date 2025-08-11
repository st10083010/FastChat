// import { useState } from 'react'
// import './App.css'

import { Routes, Route } from "react-router";
import Home from "./pages/core/home";
import Register from "./pages/core/register";
import UserInfo from "./pages/chat/user_info";
import ChatRoom from "./pages/chat/chat_room";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkLogin } from "./store/user_slice";
import { App as AntdApp } from "antd";

// 路由處理

const App = () => {
    const dispatch = useDispatch();

    // 檢查登入狀態
    useEffect(() => {
        dispatch(checkLogin());
    }, [dispatch])

    return (
        <AntdApp>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="/register" element={ <Register /> } />
                <Route path="/user_info" element={ <UserInfo />}/>
                <Route path="/chat" element={ <ChatRoom /> }/>
            </Routes>
        </AntdApp>
    )
};

export default App
