// import { useState } from 'react'
// import './App.css'

import { Routes, Route } from "react-router";
import Home from "./pages/core/home";
import Register from "./pages/core/register";
import UserInfo from "./pages/chat/user_info";
import ChatRoom from "./pages/chat/chat_room";
import GameCanvas from "./pages/game/game_canvas";
import ChatLayout from "./pages/core/chat_layout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkLogin } from "./store/user_slice";
import { App as AntdApp } from "antd";
// import ChatHome from "./pages/chat/chat_home";

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

                <Route path="/chat" element={<ChatLayout />}>
                    {/* <Route path="/home" element={<ChatHome/>} /> */}
                    <Route path=":roomId" element={<ChatRoom />} />
                    <Route path="game" element={<GameCanvas />} />
                </Route>
            </Routes>
        </AntdApp>
    )
};

export default App
