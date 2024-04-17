import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Register from '../screens/Register';

const AppNavigator = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default AppNavigator;
