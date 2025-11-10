/*


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Movie } from '../../../types/movie';
import { getIdUserByToken, isToken } from '../../../utils/JwtService';
import { endpointBe } from "../../../utils/contant";
import { toast } from 'react-toastify';
import SaoXepHang from '../../../utils/SaoXepHang';
import renderRating from "../../../utils/SaoXepHang";

interface MoviePropsInterface {
  movie: Movie;
}

const MovieProps: React.FC<MoviePropsInterface> = ({ movie }) => {
  const [isFavoriteMovie, setIsFavoriteMovie] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getIdUserByToken();
    if (!userId || !isToken()) return;

    fetch(`${endpointBe}/favorites/get-favorite-movie/${userId}`)
      .then(res => res.json())
      .then((favoriteMovieIds: number[]) => {
        if (favoriteMovieIds.includes(Number(movie.id))) {
          setIsFavoriteMovie(true);
        }
      })
      .catch(err => console.log(err));
  }, [movie.id]);
  const handleFavoriteMovie = async () => {
    if (!isToken()) {
      toast.info("Bạn phải đăng nhập để sử dụng chức năng này");
      navigate("/dangnhap");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Token không tồn tại, vui lòng đăng nhập lại");
      setLoading(false);
      navigate("/dangnhap");
      return;
    }

    try {
      let response;
      if (isFavoriteMovie) {
        // Xoá bằng DELETE + param
        response = await fetch(`${endpointBe}/favorites/remove/${movie.id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
      } else {
        // Thêm bằng POST + body chỉ có movieId
        response = await fetch(`${endpointBe}/favorites/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ movieId: movie.id }),
        });
      }
      const result = await response.json();

      if (!response.ok) {
        toast.error(result?.message || "Thao tác thất bại");
        return;
      }
      setIsFavoriteMovie(!isFavoriteMovie);
      toast.success(
          isFavoriteMovie
              ? "Đã xóa khỏi danh sách yêu thích"
              : "Đã thêm vào danh sách yêu thích"
      );
    } catch (error) {
      console.error(error);
      toast.error("Không thể cập nhật danh sách yêu thích");
    } finally {
      setLoading(false);
    }
  };


  return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">

      <div
        className="card shadow-lg border-0 h-100"
        style={{ borderRadius: "15px", overflow: "hidden" }}
      >
        <Link to={`/movies/${movie.id}`}>
          <img
            src={movie.poster_url || '/path-to-default-image.jpg'}
            className="card-img-top"
            alt={movie.title}
            style={{
              height: "300px",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Link>

        <div className="card-body d-flex flex-column p-3">
          <Link
            to={`/movies/${movie.id}`}
            style={{ textDecoration: "none", color: "#222" }}
          >
            <h5 className="card-title text-center fw-bold" style={{ minHeight: "48px" }}>
              {movie.title}
            </h5>
          </Link>

          <div className="text-center mb-3">
            <span className="badge bg-danger me-2">{movie.country}</span>
            <span className="badge bg-dark">⏱ {movie.duration} phút</span>
          </div>

          {/!*<div className="d-flex justify-content-between align-items-center mt-auto">*!/}
          {/!*  <div className="movie-rating text-warning">*!/}
          {/!*    <i className="fas fa-star"></i>*!/}
          {/!*    <span className="ms-1 text-dark">*!/}
          {/!*      {movie.rating ? SaoXepHang(movie.rating) : 'Chưa có đánh giá'}*!/}
          {/!*    </span>*!/}
          {/!*  </div>*!/}
          <div className="movie-rating d-flex align-items-center" style={{ fontSize: "0.9rem" }}>
            {movie.rating
                ? renderRating(Number(movie.rating))
                : <span className="text-muted">Chưa có đánh giá</span>}
            {movie.rating && (
                <span className="ms-1 text-dark" style={{ fontSize: "0.8rem" }}>
        ({Number(movie.rating).toFixed(1)})
    </span>
            )}
          </div>



          <button
              className={`btn btn-sm rounded-circle ${isFavoriteMovie ? 'btn-danger' : 'btn-outline-secondary'}`}
              onClick={handleFavoriteMovie}
              disabled={loading}
              style={{ width: "38px", height: "38px" }}
            >
              <i className={`fas fa-heart ${isFavoriteMovie ? '' : 'text-muted'}`}></i>
            </button>
          </div>
        </div>
      </div>
  );
};

export default MovieProps;
*/
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Movie } from "../../../types/movie";

import { endpointBe } from "../../../utils/contant";
import renderRating from "../../../utils/SaoXepHang";

import useScrollToTop from "../../../hooks/ScrollToTop";
import { useAuth } from "../../../utils/AuthContext";

interface MoviePropsInterface {
  movie: Movie;
}

const MovieProps: React.FC<MoviePropsInterface> = ({ movie }) => {
  useScrollToTop();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userInfo, isLoggedIn } = useAuth();

// useEffect(() => {
//   const fetchFavorites = async () => {
//     // ✅ Chờ Promise trả kết quả thật
//     const userId = await getIdUserByServer();
//     const loggedIn = await isAuthenticated();



//     if (!userId || !loggedIn) return; // chưa login hoặc không có id → dừng

//     try {
//       const res = await fetch(`${endpointBe}/favorites/get-favorite-movie/${userId}`);
//       const favoriteIds: number[] = await res.json();

//       if (favoriteIds.includes(Number(movie.id))) {
//         setIsFavorite(true);
//       }
//     } catch (err) {
//       console.error('❌ Lỗi khi lấy danh sách phim yêu thích:', err);
//     }
//   };

//   fetchFavorites();
// }, [movie.id]);
useEffect(() => {
  const fetchFavorites = async () => {
    if (!isLoggedIn || !userInfo?.id) return;

    try {
      const res = await fetch(`${endpointBe}/favorites/get-favorite-movie/${userInfo.id}`, {
        credentials: "include",
      });
      const favoriteIds: number[] = await res.json();

      setIsFavorite(favoriteIds.includes(Number(movie.id)));
    } catch (err) {
      console.error('❌ Lỗi khi lấy danh sách phim yêu thích:', err);
    }
  };

  fetchFavorites();
}, [movie.id, isLoggedIn, userInfo]);
 
/** Thêm / Xóa khỏi danh sách yêu thích */
// const handleFavoriteToggle = async () => {
//   // ⚠️ Kiểm tra đăng nhập (dùng hàm async!)
//   const loggedIn = await isAuthenticated();
//   if (!loggedIn) {
//     toast.info("Bạn phải đăng nhập để sử dụng chức năng này");
//     return navigate("/dangnhap");
//   }

//   setLoading(true);
//   try {
//     const url = isFavorite
//       ? `${endpointBe}/favorites/remove/${movie.id}`
//       : `${endpointBe}/favorites/add`;

//     const response = await fetch(url, {
//       method: isFavorite ? "DELETE" : "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: isFavorite ? undefined : JSON.stringify({ movieId: movie.id }),
//     });

//     const result = await response.json();
//     if (!response.ok) throw new Error(result?.message || "Thao tác thất bại");

//     setIsFavorite(!isFavorite);
//     toast.success(
//       isFavorite
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
const handleFavoriteToggle = async () => {
  if (!isLoggedIn || !userInfo?.id) {
    toast.info("Bạn phải đăng nhập để sử dụng chức năng này");
    return navigate("/dangnhap");
  }

  setLoading(true);
  try {
    const url = isFavorite
      ? `${endpointBe}/favorites/remove/${movie.id}`
      : `${endpointBe}/favorites/add`;

    const response = await fetch(url, {
      method: isFavorite ? "DELETE" : "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: isFavorite ? undefined : JSON.stringify({ movieId: movie.id, userId: userInfo.id }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result?.message || "Thao tác thất bại");

    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite
        ? "Đã xóa khỏi danh sách yêu thích"
        : "Đã thêm vào danh sách yêu thích"
    );
  } catch (err) {
    console.error("❌ Không thể cập nhật danh sách yêu thích:", err);
    toast.error("Không thể cập nhật danh sách yêu thích");
  } finally {
    setLoading(false);
  }
};


  /** 🎨 JSX giao diện phim */
  return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div className="card shadow-lg border-0 h-100 rounded-4 overflow-hidden">
          <Link to={`/movies/${movie.id}`}>
            <img
                src={movie.poster_url || "/path-to-default-image.jpg"}
                alt={movie.title}
                className="card-img-top"
                style={{
                  height: "300px",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
            />
          </Link>

          <div className="card-body d-flex flex-column p-3">
            <Link
                to={`/movies/${movie.id}`}
                className="text-decoration-none text-dark text-center"
            >
              <h5 className="card-title fw-bold mb-3" style={{ minHeight: "48px" }}>
                {movie.title}
              </h5>
            </Link>

            <div className="text-center mb-3">
              <span className="badge bg-danger me-2">{movie.country}</span>
              <span className="badge bg-dark">⏱ {movie.duration} phút</span>
            </div>

            <div className="movie-rating d-flex justify-content-center align-items-center mb-3">
              {movie.rating
                  ? (
                      <>
                        {renderRating(Number(movie.rating))}
                        <span className="ms-1 text-dark" style={{ fontSize: "0.85rem" }}>
                    ({Number(movie.rating).toFixed(1)})
                  </span>
                      </>
                  )
                  : <span className="text-muted">Chưa có đánh giá</span>
              }
            </div>

            <div className="d-flex justify-content-center mt-auto">
              <button
                  onClick={handleFavoriteToggle}
                  disabled={loading}
                  className={`btn btn-sm rounded-circle ${isFavorite ? "btn-danger" : "btn-outline-secondary"}`}
                  style={{ width: "38px", height: "38px" }}
              >
                <i className={`fas fa-heart ${isFavorite ? "" : "text-muted"}`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MovieProps;

