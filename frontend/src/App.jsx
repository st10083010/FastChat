// import { useState } from 'react'
// import './App.css'

import { Routes, Route } from "react-router";
import Home from "./pages/core/home";
import Register from "./pages/core/register";

// 路由處理

const App = () => {
    return (
        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/register" element={ <Register/> } />
        </Routes>
    )
};

export default App
