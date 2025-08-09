/*
import React, { useEffect, useState } from "react";
import {layPhimMoiNhat} from "../../api/movieApi";
import {Movie} from "../../types/movie";
import './PhimMoi.css';
import SaoXepHang from "../../utils/SaoXepHang";
import DinhDangSo from "../../utils/dinhDangSo"; // Assuming you have a CSS file for styling
import { Link } from "react-router-dom";

function PhimMoi() {
    const [movies, setMovies] = useState<Array<Movie>>([]);


    useEffect(() => {
       layPhimMoiNhat(0, 12).then(data => {
            setMovies(data.ketQua);
        });
    }, []);

    return (
        <div>
            <div className="movie-list">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <Link to={`/movies/${movie.id}`}>
                        <img src={movie.poster_url} alt={movie.title} />
                        </Link>
                        <p>{movie.title}</p>
                        <p>Đánh giá: {SaoXepHang(movie.rating)}</p>
                        <p>Thời gian: {DinhDangSo(movie.duration)} phút</p>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default PhimMoi;
*/
import React, { useEffect, useState } from "react";
import { layPhimMoiNhat } from "../../../../api/movieApi";
import { Movie } from "../../../../types/movie";
import './PhimMoiPage.css';
import SaoXepHang from "../../../../utils/SaoXepHang";
import DinhDangSo from "../../../../utils/dinhDangSo";
import { Link } from "react-router-dom";
import { PhanTrang } from "../../../../utils/PhanTrang";

function PhimMoiPage() {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState<string | null>(null);

    useEffect(() => {
        setDangTaiDuLieu(true);
        layPhimMoiNhat(trangHienTai - 1, 12)
            .then(data => {
                setMovies(data.ketQua);
                setTongSoTrang(data.tongSoTrang);
                setDangTaiDuLieu(false);
            })
            .catch(error => {
                setBaoLoi(error.message);
                setDangTaiDuLieu(false);
            });
    }, [trangHienTai]);

    const phanTrang = (trang: number) => {
        setTrangHienTai(trang);
        window.scrollTo(0, 0);
    };

    if (dangTaiDuLieu) {
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <h1>Đang tải phim mới...</h1>
                </div>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <h1>Gặp lỗi: {baoLoi}</h1>
                </div>
            </div>
        );
    }

    if (movies.length === 0) {
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <h1>Không có phim mới nào!</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="movie-list">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <Link to={`/movies/${movie.id}`}>
                            <img
                                src={movie.poster_url}
                                alt={movie.title}
                                className="movie-poster"
                            />
                        </Link>
                        <div className="movie-info">
                            <h5 className="movie-title">{movie.title}</h5>
                            <div className="movie-details">
                                <p className="rating">
                                    Đánh giá: {SaoXepHang(movie.rating)}
                                </p>
                                <p className="duration">
                                    Thời gian: {DinhDangSo(movie.duration)} phút
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-center mt-3">
                <PhanTrang
                    trangHienTai={trangHienTai}
                    tongSoTrang={tongSoTrang}
                    phanTrang={phanTrang}
                />
            </div>
        </div>
    );
}

export default PhimMoiPage;