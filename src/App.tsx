import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter } from 'react-router';
import Navbar from './layout/header-footer/Navbar';
import { AuthProvider } from './utils/AuthContext';
import Footer from "./layout/header-footer/Footer";
import HomePage from "./layout/homepage/HomePage";
import {Route, Routes } from 'react-router-dom';
import PhimMoiPage from "./layout/product/components/PhimMoi/PhimMoiPage";
import MovieDetail from "./layout/product/MovieDetail";
import FillerPage from "./page/FillerPage/FillerPage";
import { ToastContainer } from 'react-toastify';
import WatchPage from "./layout/product/WatchPage";
import MoviesPage from "./layout/product/MoviesPage";
import DangNhap from "./layout/User/DangNhap";

const MyRoutes = () => {
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = React.useState('');
    return (
        <div className="app-container">
            <AuthProvider>
                <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />
                {/* Nếu navbar fixed-top, thêm class pt-5 (padding-top) cho div này */}
                <div className="container mt-4 pt-5">
                    <Routes>
                        <Route path="/" element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                        <Route path="" element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                        <Route path="search/:idGenre" element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                        <Route path="movies/search" element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                      {/*  <Route path="/phim-moi" element={<PhimMoiPage />} />*/}
                        <Route path="/movies/:movieId" element={<MovieDetail />} />
                        <Route path='/search' element={<FillerPage />} />
                        <Route path="genre/:genreSlug" element={<MoviesPage />} />
                        <Route path="/:genreSlug" element={<MoviesPage />} />
                        <Route path="/watch/:movieId" element={<WatchPage />} />
                        <Route path="/watch/:movieId/episode/:episodeId" element={<WatchPage />} />
                        <Route path="/dangnhap" element={<DangNhap/>} />
                        {/* Thêm các route khác tại đây */}
                    </Routes>
                </div>
                <Footer />

                {/* Toast thông báo */}
                <ToastContainer position='bottom-center' autoClose={3000} pauseOnFocusLoss={false} />
            </AuthProvider>
        </div>
    );
};

function App() {
    return (
        <BrowserRouter>
            <MyRoutes />
        </BrowserRouter>
    );
}

export default App;