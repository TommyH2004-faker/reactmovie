
// PhimMoi.tsx
import React, { useEffect, useState } from "react";
import { layPhimMoiNhat } from "../../../../api/movieApi";
import { Movie } from "../../../../types/movie";
import './PhimMoi.css';
import SaoXepHang from "../../../../utils/SaoXepHang";
import DinhDangSo from "../../../../utils/dinhDangSo";
import { Link } from "react-router-dom";

function PhimMoi() {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState<string | null>(null);

    useEffect(() => {
        setDangTaiDuLieu(true);
        layPhimMoiNhat(0, 8)
            .then(data => {
                setMovies(data.ketQua);
                setDangTaiDuLieu(false);
            })
            .catch(error => {
                setBaoLoi(error.message);
                setDangTaiDuLieu(false);
            });
    }, []);

    if (dangTaiDuLieu) {
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <h1>Đang tải phim mới...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="section-header">
                <h2 className="section-title">Phim Mới</h2>
                <Link to="/phim-moi" className="view-more-btn">
                    Xem thêm
                </Link>
            </div>

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
        </div>
    );
}

export default PhimMoi;