import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Movie } from '../../../types/movie';
import { getIdUserByToken, isToken } from '../../../utils/JwtService';
import {endpointBe} from "../../../utils/contant";
import { toast } from 'react-toastify';
import SaoXepHang from '../../../utils/SaoXepHang';

interface MoviePropsInterface {
    movie: Movie;
}

const MovieProps: React.FC<MoviePropsInterface> = ({ movie }) => {
    const [isFavoriteMovie, setIsFavoriteMovie] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isToken()) {
            fetch(`${endpointBe}/favorite-movies/check/${getIdUserByToken()}/${movie.id}`)
                .then(response => response.json())
                .then(data => {
                    setIsFavoriteMovie(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error checking favorite status:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [movie.id]);

    const handleFavoriteMovie = async () => {
        if (!isToken()) {
            toast.info("Bạn phải đăng nhập để sử dụng chức năng này");
            navigate("/dangnhap");
            return;
        }

        const token = localStorage.getItem("token");
        const url = isFavoriteMovie
            ? `${endpointBe}/favorite-movies/remove`
            : `${endpointBe}/favorite-movies/add`;

        const body = {
            userId: getIdUserByToken(),
            movieId: movie.id
        };

        try {
            const response = await fetch(url, {
                method: isFavoriteMovie ? "DELETE" : "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error("Thao tác thất bại");
            }

            setIsFavoriteMovie(!isFavoriteMovie);
            toast.success(isFavoriteMovie
                ? "Đã xóa khỏi danh sách yêu thích"
                : "Đã thêm vào danh sách yêu thích"
            );
        } catch (error) {
            console.error(error);
            toast.error("Không thể cập nhật danh sách yêu thích");
        }
    };

    return (
        <div className="col-md-3 mt-2">
            <div className="card shadow-sm h-100">
                <Link to={`/movie/${movie.id}`}>
                    <img
                        src={movie.poster_url || '/path-to-default-image.jpg'}
                        className="card-img-top"
                        alt={movie.title}
                        style={{
                            height: "300px",
                            objectFit: "cover",
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px"
                        }}
                    />
                </Link>

                <div className="card-body d-flex flex-column">
                    <Link
                        to={`/movie/${movie.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <h5 className="card-title text-center"
                            style={{ minHeight: "48px" }}
                        >
                            {movie.title}
                        </h5>
                    </Link>

                    <div className="movie-info text-center mb-2">
                        <span className="badge bg-primary me-2">
                            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                        </span>
                        <span className="badge bg-secondary">
                            {movie.duration} phút
                        </span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-auto">
                        <div className="movie-rating">
                            <i className="fas fa-star text-warning"></i>
                            <span className="ms-1">
                                {movie.rating ? SaoXepHang(movie.rating) : 'Chưa có đánh giá'}
                            </span>
                        </div>
                        <button
                            className={`btn btn-sm ${isFavoriteMovie ? 'btn-danger' : 'btn-outline-secondary'}`}
                            onClick={handleFavoriteMovie}
                            disabled={loading}
                        >
                            <i className={`fas fa-heart ${isFavoriteMovie ? '' : 'text-muted'}`}></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieProps;