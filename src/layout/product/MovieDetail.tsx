/*
// MovieDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {layPhimById} from "../../api/movieApi";
import { Movie } from "../../types/movie";
import SaoXepHang from "../../utils/SaoXepHang";
import DinhDangSo from "../../utils/dinhDangSo";
import "./MovieDetail.css";

const MovieDetail: React.FC = () => {
    const { movieId } = useParams();
    let movieIdNumber: number = 0;

    try {
        movieIdNumber = parseInt(movieId + "");
        if (Number.isNaN(movieIdNumber)) {
            movieIdNumber = 0;
        }
    } catch (error) {
        console.error("Error: " + error);
    }

    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        layPhimById(movieIdNumber)
            .then((response) => {
                setMovie(response);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [movieIdNumber]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="error-container">
                <h2>Không tìm thấy phim</h2>
            </div>
        );
    }

    return (
        <div className="movie-detail-wrapper">
            <div className="container">
                <div className="movie-detail-header">
                    <div className="movie-poster-container">
                        <div className="movie-poster">
                            <img src={movie.poster_url} alt={movie.title} />
                            <div className="quality-badge">HD</div>
                            <div className="movie-overlay">
                                <button className="play-button">
                                    <i className="fas fa-play"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="movie-info">
                        <h1 className="movie-title">{movie.title}</h1>
                        <div className="movie-meta">
                            <div className="meta-item">
                                <i className="fas fa-star"></i>
                                <span>{movie.rating}/5</span>
                            </div>
                            <div className="meta-item">
                                <i className="fas fa-clock"></i>
                                <span>{DinhDangSo(movie.duration)} phút</span>
                            </div>
                            <div className="meta-item">
                                <i className="fas fa-calendar"></i>
                                <span>
                                    {movie.release_date ? movie.release_date.toLocaleDateString() : "N/A"}
                                </span>
                            </div>
                        </div>
                        <div className="movie-genres">
                            {movie.genres?.map((genre, index) => (
                                <span key={index} className="genre-tag">
                                {genre.name}
                              </span>
                            ))}

                        </div>

                        <div className="movie-buttons">
                            <button className="watch-now">
                                <i className="fas fa-play"></i>
                                Xem phim
                            </button>
                            <button className="add-favorite">
                                <i className="fas fa-heart"></i>
                                Yêu thích
                            </button>
                        </div>
                    </div>
                </div>

                <div className="movie-detail-content">
                    <div className="content-section">
                        <h3 className="section-title">Nội dung phim</h3>
                        <div className="section-body">
                            <p className="movie-description">{movie.description}</p>
                        </div>
                    </div>

                    <div className="content-section">
                        <h3 className="section-title">Thông tin chi tiết</h3>
                        <div className="section-body">
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Đạo diễn:</span>
                                    <span className="info-value">{movie.director}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Diễn viên:</span>
                                    <span className="info-value">{movie.cast}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Thể loại:</span>
                                    <span className="info-value">
                                        {movie.genres?.map(genre => genre.name).join(", ")}
                                </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Đánh giá:</span>
                                    <span className="info-value rating">
                                        {SaoXepHang(movie.rating)}
                                        <span className="rating-number">({movie.rating}/5)</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;*/
import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams } from "react-router-dom";
import { layPhimById } from "../../api/movieApi";
import { Movie } from "../../types/movie";
import SaoXepHang from "../../utils/SaoXepHang";
import DinhDangSo from "../../utils/dinhDangSo";
import "./MovieDetail.css";
import { getIdUserByToken, isToken } from "../../utils/JwtService";
import { toast } from "react-toastify";
import { endpointBe } from "../../utils/contant";
import ReviewPage from "./components/Review/ReviewPage";

const MovieDetail: React.FC = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [isFavoriteMovie, setIsFavoriteMovie] = useState(false);
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                if (!movieId) throw new Error("Invalid movie ID");
                const movieIdNumber = parseInt(movieId);
                if (isNaN(movieIdNumber)) throw new Error("Invalid movie ID format");

                const response = await layPhimById(movieIdNumber);
                setMovie(response);
            } catch (err: any) {
                setError(err.message || "Failed to fetch movie details");
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [movieId]);

    useEffect(() => {
        if (movie && isToken()) {
            fetch(`${endpointBe}/favorite-movies/check/${getIdUserByToken()}/${movie.id}`)
                .then((response) => response.json())
                .then((data) => setIsFavoriteMovie(data))
                .catch((err) => console.error("Error checking favorite status:", err));
        }
    }, [movie]);

    const handleFavoriteMovie = async () => {
        if (!isToken()) {
            toast.info("Bạn phải đăng nhập để sử dụng chức năng này");
            navigate("/dangnhap");
            return;
        }

        const token = localStorage.getItem("token");
        const url = isFavoriteMovie
            ? `${endpointBe}/favorite-movies/remove`
            : `${endpointBe}/favorites`;

        const body = {
            userId: getIdUserByToken(),
            movieId: movie?.id,
        };

        try {
            const response = await fetch(url, {
                method: isFavoriteMovie ? "DELETE" : "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error("Thao tác thất bại");
            }

            setIsFavoriteMovie(!isFavoriteMovie);
            toast.success(
                isFavoriteMovie
                    ? "Đã xóa khỏi danh sách yêu thích"
                    : "Đã thêm vào danh sách yêu thích"
            );
        } catch (err) {
            console.error(err);
            toast.error("Không thể cập nhật danh sách yêu thích");
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="error-container">
                <h2>{error || "Không tìm thấy phim"}</h2>
            </div>
        );
    }

    return (
        <div className="movie-detail-wrapper">
            <div className="container">
                <div className="movie-detail-header">
                    <div className="movie-poster-container">
                        <div className="movie-poster">
                            <img src={movie.poster_url || "/default-poster.jpg"} alt={movie.title || "N/A"} />
                            <div className="quality-badge">HD</div>
                            <div className="movie-overlay">
                                <button className="play-button">
                                    <i className="fas fa-play"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="movie-info">
                        <h1 className="movie-title">{movie.title || "N/A"}</h1>
                        <div className="movie-meta">
                            <div className="meta-item">
                                <i className="fas fa-star"></i>
                                <span>{movie.rating || 0}/5</span>
                            </div>
                            <div className="meta-item">
                                <i className="fas fa-clock"></i>
                                <span>{DinhDangSo(movie.duration || 0)} phút</span>
                            </div>
                            <div className="meta-item">
                                <i className="fas fa-calendar"></i>
                                <span>
                                    {movie.release_date
                                        ? new Date(movie.release_date).toLocaleDateString()
                                        : "N/A"}
                                </span>
                            </div>
                        </div>
                        <div className="movie-genres">
                            {movie.genres?.map((genre, index) => (
                                <span key={index} className="genre-tag">
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <div className="movie-buttons">
                            <Link to={`/watch/${movie?.id}`} className="watch-now">
                                <i className="fas fa-play"></i>
                                Xem phim
                            </Link>
                            <button
                                className={`btn btn-sm ${isFavoriteMovie ? "btn-danger" : "btn-outline-secondary"}`}
                                onClick={handleFavoriteMovie}
                            >
                                <i className={`fas fa-heart ${isFavoriteMovie ? "" : "text-muted"}`}></i>
                                {isFavoriteMovie ? " Bỏ yêu thích" : " Yêu thích"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="movie-detail-content">
                    <div className="content-section">
                        <h3 className="section-title">Nội dung phim</h3>
                        <div className="section-body">
                            <p className="movie-description">{movie.description || "N/A"}</p>
                        </div>
                    </div>

                    <div className="content-section">
                        <h3 className="section-title">Thông tin chi tiết</h3>
                        <div className="section-body">
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Đạo diễn:</span>
                                    <span className="info-value">{movie.director || "N/A"}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Diễn viên:</span>
                                    <span className="info-value">{movie.cast || "N/A"}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Thể loại:</span>
                                    <span className="info-value">
                                        {movie.genres?.map((genre) => genre.name).join(", ") || "N/A"}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Đánh giá:</span>
                                    <span className="info-value rating">
                                        {SaoXepHang(movie.rating || 0)}
                                        <span className="rating-number">({movie.rating || 0}/5)</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ReviewPage/>
        </div>
    );
};

export default MovieDetail;