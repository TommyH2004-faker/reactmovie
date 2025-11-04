
import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams } from "react-router-dom";
import { layPhimById } from "../../api/movieApi";
import { Movie } from "../../types/movie";
import SaoXepHang from "../../utils/SaoXepHang";
import DinhDangSo from "../../utils/dinhDangSo";
import "./MovieDetail.css";

import { toast } from "react-toastify";
import { endpointBe } from "../../utils/contant";
import ReviewPage from "./components/Review/ReviewPage";
import useScrollToTop from "../../hooks/ScrollToTop";
import { getIdUserByServer, isAuthenticated } from "../../utils/JwtService";

const MovieDetail: React.FC = () => {
    useScrollToTop();
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  const checkFavoriteStatus = async () => {
    if (!movie) return;

    try {
      const userId = await getIdUserByServer(); // ✅ thêm await ở đây
      if (!userId) return;

      const res = await fetch(`${endpointBe}/favorites/get-favorite-movie/${userId}`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const favoriteIds: number[] = await res.json();

      console.log("⭐ Favorite movie IDs:", favoriteIds);

      if (Array.isArray(favoriteIds) && favoriteIds.includes(Number(movie.id))) {
        setIsFavoriteMovie(true);
      } else {
        setIsFavoriteMovie(false);
      }
    } catch (err) {
      console.error("❌ Lỗi khi kiểm tra phim yêu thích:", err);
    }
  };

  checkFavoriteStatus();
}, [movie]);

const handleFavoriteMovie = async () => {
  // Kiểm tra đăng nhập
  const loggedIn = await isAuthenticated();
  if (!loggedIn) {
    toast.info("Bạn cần đăng nhập để thực hiện chức năng này");
    navigate("/dangnhap");
    return;
  }

  if (!movie?.id) {
    toast.error("Không tìm thấy thông tin phim");
    return;
  }

  setLoading(true);

  try {
    const userId = await getIdUserByServer();
    if (!userId) throw new Error("Không lấy được ID người dùng");

    const url = isFavoriteMovie
      ? `${endpointBe}/favorites/remove/${movie.id}`
      : `${endpointBe}/favorites/add`;

    const response = await fetch(url, {
      method: isFavoriteMovie ? "DELETE" : "POST",
      credentials: "include", // gửi cookie HttpOnly
      headers: {
        "Content-Type": "application/json",
      },
      body: isFavoriteMovie
        ? undefined
        : JSON.stringify({ userId, movieId: movie.id }), // ✅ gửi đầy đủ thông tin
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Server error:", result);
      throw new Error(result?.message || `Thao tác thất bại (HTTP ${response.status})`);
    }

    setIsFavoriteMovie(!isFavoriteMovie);
    toast.success(
      isFavoriteMovie
        ? "Đã xóa khỏi danh sách yêu thích"
        : "Đã thêm vào danh sách yêu thích"
    );
  } catch (err: any) {
    console.error("❌ Không thể cập nhật danh sách yêu thích:", err);
    toast.error(err.message || "Không thể cập nhật danh sách yêu thích");
  } finally {
    setLoading(false);
  }
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