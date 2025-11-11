
import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams } from "react-router-dom";
import { layPhimById } from "../../api/movieApi";
import { Movie } from "../../types/movie";
import SaoXepHang from "../../utils/SaoXepHang";
import DinhDangSo from "../../utils/dinhDangSo";
import "./MovieDetail.css";
import ReviewPage from "./components/Review/ReviewPage";
import useScrollToTop from "../../hooks/ScrollToTop";
import { useFavorites } from "../../hooks/useFavorites";

const MovieDetail: React.FC = () => {
    useScrollToTop();
    const { movieId } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const { isFavorite, toggleFavorite, loading: favoriteLoading } = useFavorites();
    const isMovieFavorite = movie ? isFavorite(movie.id) : false;
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

    const handleFavoriteMovie = async () => {
        if (!movie) return;
        await toggleFavorite(movie.id);
    };
// const handleFavoriteMovie = async () => {
//   // Kiểm tra đăng nhập trước khi thực hiện
//   const loggedIn = await isAuthenticated();
//   if (!loggedIn) {
//     toast.info("Bạn cần đăng nhập để thực hiện chức năng này");
//     navigate("/dangnhap");
//     return;
//   }

//   setLoading(true);

//   try {
//     const url = isFavoriteMovie
//       ? `${endpointBe}/favorites/remove/${movie?.id}`
//       : `${endpointBe}/favorites/add`;

//     const response = await fetch(url, {
//       method: isFavoriteMovie ? "DELETE" : "POST",
//       credentials: "include", // ✅ gửi cookie HttpOnly
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: isFavoriteMovie ? undefined : JSON.stringify({ movieId: movie?.id }),
//     });

//     const result = await response.json();
//     if (!response.ok) throw new Error(result?.message || "Thao tác thất bại");

//     setIsFavoriteMovie(!isFavoriteMovie);
//     toast.success(
//       isFavoriteMovie
//         ? "Đã xóa khỏi danh sách yêu thích"
//         : "Đã thêm vào danh sách yêu thích"
//     );
//   } catch (err) {
//     console.error("❌ Không thể cập nhật danh sách yêu thích:", err);
//     toast.error("Không thể cập nhật danh sách yêu thích");
//   } finally {
//     setLoading(false);
//   }
// };

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
                            <Link to={`/watch/${movie.id}`} className="watch-now">
                                <i className="fas fa-play"></i>
                                Xem phim
                            </Link>
                            <button
                                className={`btn btn-sm ${isMovieFavorite ? "btn-danger" : "btn-outline-secondary"}`}
                                onClick={handleFavoriteMovie}
                                disabled={favoriteLoading}
                            >
                                <i className={`fas fa-heart ${isMovieFavorite ? "" : "text-muted"}`}></i>
                                {favoriteLoading 
                                    ? " Đang xử lý..." 
                                    : (isMovieFavorite ? " Bỏ yêu thích" : " Yêu thích")
                                }
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