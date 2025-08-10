/*
import React, { useEffect, useState } from "react";

import { Movie } from "../../types/movie";
import MovieProps from "./components/MovieProps";
import { PhanTrang } from "../../utils/PhanTrang";
import {layToanBoPhim, timKiemPhim} from "../../api/movieApi";
import './DanhSachPhim.css'
import SaoXepHang from "../../utils/SaoXepHang";
import { Link } from "react-router-dom";
import DinhDangSo from "../../utils/dinhDangSo";
interface DanhSachPhimProps {
    tuKhoaTimKiem: string;
    idGenre: number;
}

function DanhSachPhim({ tuKhoaTimKiem, idGenre }: DanhSachPhimProps) {
    const [danhSachPhim, setDanhSachPhim] = useState<Movie[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);

    useEffect(() => {
        if (tuKhoaTimKiem === '' && idGenre === 0) {
            layToanBoPhim(trangHienTai - 1)
                .then(kq => {
                    setDanhSachPhim(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                })
                .catch(error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                });
        } else {
            timKiemPhim(tuKhoaTimKiem, idGenre)
                .then(kq => {
                    setDanhSachPhim(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                })
                .catch(error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                });
        }
    }, [trangHienTai, tuKhoaTimKiem, idGenre]);

    const phanTrang = (trang: number) => {
        setTrangHienTai(trang);
    };

    if (dangTaiDuLieu) {
        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>Đang tải danh sách phim...</h1>
                </div>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>Gặp lỗi: {baoLoi}</h1>
                </div>
            </div>
        );
    }

    if (danhSachPhim.length === 0) {
        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>Không tìm thấy phim nào theo yêu cầu!</h1>
                </div>
            </div>
        );
    }
    return (
        <div className="movies-container">
            <div className="section-header">
                <h2 className="section-title">
                    {tuKhoaTimKiem ? `Kết quả tìm kiếm: ${tuKhoaTimKiem}` : 'Tất cả phim'}
                </h2>
            </div>

            <div className="movie-list">
                {danhSachPhim.map(phim => (
                    <div key={phim.id} className="movie-card">
                        <Link to={`/movies/${phim.id}`} className="movie-image">
                            <img src={phim.poster_url} alt={phim.title} />
                            <div className="movie-overlay">
                                <div className="movie-badge">HD</div>
                                <div className="movie-play">
                                    <i className="fas fa-play"></i>
                                </div>
                            </div>
                        </Link>
                        <div className="movie-info">
                            <h5 className="movie-title">{phim.title}</h5>
                            <div className="movie-meta">
                                <span className="rating">{SaoXepHang(phim.rating)}</span>
                                <span className="duration">{DinhDangSo(phim.duration)} phút</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination-container">
                <PhanTrang
                    trangHienTai={trangHienTai}
                    tongSoTrang={tongSoTrang}
                    phanTrang={phanTrang}
                />
            </div>
        </div>
    );
}

export default DanhSachPhim;*/
import React, { useEffect, useState } from "react";
import { Movie } from "../../types/movie";
import MovieProps from "./components/MovieProps";
import { PhanTrang } from "../../utils/PhanTrang";
import { layToanBoPhim, timKiemPhim } from "../../api/movieApi";
import './DanhSachPhim.css';
import useScrollToTop from "../../hooks/ScrollToTop";

interface DanhSachPhimProps {
    tuKhoaTimKiem: string;
    idGenre: number;
}

function DanhSachPhim({ tuKhoaTimKiem, idGenre }: DanhSachPhimProps) {
    useScrollToTop();
    const [danhSachPhim, setDanhSachPhim] = useState<Movie[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState<string | null>(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setDangTaiDuLieu(true);
                const kq = tuKhoaTimKiem === '' && idGenre === 0
                    ? await layToanBoPhim(trangHienTai - 1)
                    : await timKiemPhim(tuKhoaTimKiem, idGenre);
                console.log('API Response:', kq); // Debug API response
                setDanhSachPhim(kq.ketQua);
                setTongSoTrang(kq.tongSoTrang);
            } catch (error: any) {
                console.error('Error fetching movies:', error); // Debug error
                setBaoLoi(error.message);
            } finally {
                setDangTaiDuLieu(false);
            }
        };
        fetchMovies();
    }, [trangHienTai, tuKhoaTimKiem, idGenre]);

    const phanTrang = (trang: number) => {
        setTrangHienTai(trang);
    };

    if (dangTaiDuLieu) {
        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>Đang tải danh sách phim...</h1>
                </div>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>Gặp lỗi: {baoLoi}</h1>
                </div>
            </div>
        );
    }

    if (danhSachPhim.length === 0) {
        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>Không tìm thấy phim nào theo yêu cầu!</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="movies-container">
            <div className="section-header">
                <h2 className="section-title">
                    {tuKhoaTimKiem ? `Kết quả tìm kiếm: ${tuKhoaTimKiem}` : 'Tất cả phim'}
                </h2>
            </div>

            <div className="row mt-4 mb-4">
                {danhSachPhim.map((phim) => (
                    <MovieProps movie={phim} key={phim.id} />
                ))}
            </div>

            <div className="pagination-container">
                <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang} />
            </div>
        </div>
    );
}

export default DanhSachPhim;