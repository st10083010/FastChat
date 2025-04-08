// import { useState } from 'react'
// import './App.css'

import { Routes, Route } from "react-router";
import Home from "./pages/core/home";
import Register from "./pages/core/register";
import UserInfo from "./pages/chat/user_info";

// 路由處理

const App = () => {
    return (
        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/register" element={ <Register/> } />
            <Route path="/user_info" element={ <UserInfo/>}/>
        </Routes>
    )
};

export default App
