

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './layout/header-footer/Navbar';
import Footer from "./layout/header-footer/Footer";
import HomePage from "./layout/homepage/HomePage";
import MovieDetail from "./layout/product/MovieDetail";
import FillerPage from "./page/FillerPage/FillerPage";
import WatchPage from "./layout/product/WatchPage";
import MoviesPage from "./layout/product/MoviesPage";
import DangNhap from "./layout/User/DangNhap";
import DangKyNguoiDung from './layout/User/DangKyNguoiDung';
import KichHoatTaiKhoan from './layout/User/KichHoatTaiKhoan';
import { ForgotPassword } from './layout/User/componetns/ForgotPassword';
import FavoriteMoviesList from './layout/product/FavoriteMoviesList';
import { ToastContainer } from 'react-toastify';
import { ConfirmProvider } from 'material-ui-confirm';
import { AuthProvider } from './utils/AuthContext';
import AdminDashboard from './layout/admin/AdminDashboard';
import Slidebar from './layout/admin/Slidebar';
import CommentPage from './layout/admin/CommnentMangement';
import MovieManagementPage from './layout/admin/MovieManagement';
import UserManagementPage from './layout/admin/UserManagement';
import GenreManagementPage from './layout/admin/GenreManagement';
import { Error404Page } from './page/Error/404Page';
import ProfilePage from './page/ProfilePage';



const MyRoutes = () => {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
  const [reloadAvatar] = useState(0);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <AuthProvider>
      <ConfirmProvider>

        {/* Navbar + Footer chỉ hiển thị nếu không phải admin */}
        {!isAdminPath && (
          <>
            <Navbar
              key={reloadAvatar}
              tuKhoaTimKiem={tuKhoaTimKiem}
              setTuKhoaTimKiem={setTuKhoaTimKiem}
            />
          </>
        )}

        {/* Routes cho user */}
        {!isAdminPath && (
          <div className="container mt-4 pt-5">
            <Routes>
              <Route path="/" element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
              <Route path="" element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
              <Route path="search/:idGenre" element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
              <Route path="movies/search" element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
              <Route path="/movies/:movieId" element={<MovieDetail />} />
              <Route path='/search' element={<FillerPage />} />
              <Route path="genre/:genreSlug" element={<MoviesPage />} />
              <Route path="/watch/:movieId" element={<WatchPage />} />
              <Route path="/watch/:movieId/episode/:episodeId" element={<WatchPage />} />
              <Route path="/dangnhap" element={<DangNhap />} />
              <Route path="/dangky" element={<DangKyNguoiDung />} />
              <Route path="/kich-hoat/:code" element={<KichHoatTaiKhoan />} />
              <Route path='/my-favorite-movie' element={<FavoriteMoviesList />} />
              <Route path='/quenMatKhau' element={<ForgotPassword />} />
              <Route path='/profile' element={<ProfilePage />} />
              {/* fallback */}
              <Route path="*" element={<Error404Page />} />
            </Routes>
          </div>
        )}

        {!isAdminPath && <Footer />}

        {/* Routes cho admin */}
        {isAdminPath && (
          <div className="row overflow-hidden w-100">
            <div className="col-2 col-md-3 col-lg-2">
              <Slidebar />
            </div>
            <div className="col-10 col-md-9 col-lg-10">
              <Routes>
                <Route path='/admin' element={<AdminDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/movie" element={<MovieManagementPage />} />
                <Route path="/admin/genre" element={<GenreManagementPage />} />
                <Route path="/admin/user" element={<UserManagementPage />} />
                <Route path="/admin/comment" element={<CommentPage />} />
              </Routes>

            </div>
          </div>
        )}

        {/* Toast */}
        <ToastContainer position='bottom-center' autoClose={3000} pauseOnFocusLoss={false} />
      </ConfirmProvider>
    </AuthProvider>
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
