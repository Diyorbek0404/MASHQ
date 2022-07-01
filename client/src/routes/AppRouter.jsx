import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../screens/Home';
import NotFound from '../screens/NotFound';
import SinglePost from '../screens/SinglePost';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/item/:id' element={<SinglePost />} />
                <Route path='/!' element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;