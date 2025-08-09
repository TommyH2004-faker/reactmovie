import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter } from 'react-router';
import Navbar from './layout/header-footer/Navbar';
import { AuthProvider } from './utils/AuthContext';
import Footer from "./layout/header-footer/Footer";
import HomePage from "./layout/homepage/HomePage";
import {Route, Routes } from 'react-router-dom';
import PhimMoi from "./layout/product/components/PhimMoi/PhimMoi";
import PhimMoiPage from "./layout/product/components/PhimMoi/PhimMoiPage";



const MyRoutes = () => {
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = React.useState('');
    return (
        <div className="app-container">
            <AuthProvider>
                <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />
                <div className="mt-4">
                    <Routes>
                        <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                        <Route path='' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                        <Route path='search/:idGenre' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                        <Route path='movies/search' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                        <Route path={'/phim-moi'} element={<PhimMoiPage /> }/>
                    </Routes>

                </div>
                <Footer/>
            </AuthProvider>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <MyRoutes />
        </BrowserRouter>
    );
}

export default App;