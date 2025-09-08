// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Movie } from '../../../types/movie';
// import { getIdUserByToken, isToken } from '../../../utils/JwtService';
// import {endpointBe} from "../../../utils/contant";
// import { toast } from 'react-toastify';
// import SaoXepHang from '../../../utils/SaoXepHang';
// interface MoviePropsInterface {
//     movie: Movie;
// }

// const MovieProps: React.FC<MoviePropsInterface> = ({ movie }) => {
//     const [isFavoriteMovie, setIsFavoriteMovie] = useState(false);
//     const [loading,setLoading] = useState(false);
//     const navigate = useNavigate();
//     useEffect(() => {
//           const userId = getIdUserByToken();
//           console.log("User ID:", userId);
//     if (!userId) {
//         console.log("User chưa đăng nhập hoặc token lỗi");
//         return;
//     }
//         if(isToken()){
//             fetch(`${endpointBe}/favorites/get-favorite-movie/${userId}`)
//             .then(res => res.json())
//                 .then((favoriteMovieIds: number[]) => {
//                     if (favoriteMovieIds.includes(Number(movie.id))) {
//                         setIsFavoriteMovie(true);
//                     }
//                 })
//                 .catch(err => console.log(err));
//         }
//     }, [movie.id]);

// const handleFavoriteMovie = async () => {
//   if (!isToken()) {
//     toast.info("Bạn phải đăng nhập để sử dụng chức năng này");
//     navigate("/dangnhap");
//     return;
//   }

//   setLoading(true);

//   const token = localStorage.getItem("access_token"); 
//   if (!token) {
//     toast.error("Token không tồn tại, vui lòng đăng nhập lại");
//     setLoading(false);
//     navigate("/dangnhap");
//     return;
//   }

//   const url = isFavoriteMovie 
//     ? `${endpointBe}/favorites/remove`
//     : `${endpointBe}/favorites/add`;

//   const body = { movieId: Number(movie.id) };

//   try {
//     const response = await fetch(url, {
//       method: isFavoriteMovie ? "DELETE" : "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       if (response.status === 401) {
//         toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
//         navigate("/dangnhap");
//       }
//       throw new Error("Thao tác thất bại");
//     }

//     setIsFavoriteMovie(!isFavoriteMovie);
//     toast.success(
//       isFavoriteMovie
//         ? "Đã xóa khỏi danh sách yêu thích"
//         : "Đã thêm vào danh sách yêu thích"
//     );
//   } catch (error) {
//     console.error(error);
//     toast.error("Không thể cập nhật danh sách yêu thích");
//   } finally {
//     setLoading(false);
//   }
// };


//     return (
//         <div className="col-md-3 mt-2">
//             <div className="card shadow-sm h-100">
//                 <Link to={`/movies/${movie.id}`}>
//                     <img
//                         src={movie.poster_url || '/path-to-default-image.jpg'}
//                         className="card-img-top"
//                         alt={movie.title}
//                         style={{
//                             height: "300px",
//                             objectFit: "cover",
//                             borderTopLeftRadius: "10px",
//                             borderTopRightRadius: "10px"
//                         }}
//                     />
//                 </Link>

//                 <div className="card-body d-flex flex-column">
//                     <Link
//                         to={`/movie/${movie.id}`}
//                         style={{ textDecoration: "none", color: "inherit" }}
//                     >
//                         <h5 className="card-title text-center"
//                             style={{ minHeight: "48px" }}
//                         >
//                             {movie.title}
//                         </h5>
//                     </Link>

//                     <div className="movie-info text-center mb-2">
//                         <span className="badge bg-danger me-2">
//                             {movie.country}
//                         </span>
//                         <span className="badge bg-secondary">
//                           Time:{movie.duration} phút
//                         </span>
//                     </div>
//                     <div className="d-flex justify-content-between align-items-center mt-auto">
//                         <div className="movie-rating">
//                             <i className="fas fa-star text-warning"></i>
//                             <span className="ms-1">
//                                 {movie.rating ? SaoXepHang(movie.rating) : 'Chưa có đánh giá'}
//                             </span>
//                         </div>
//                         <button
//                             className={`btn btn-sm ${isFavoriteMovie ? 'btn-danger' : 'btn-outline-secondary'}`}
//                             onClick={handleFavoriteMovie}
//                             disabled={loading}
//                         >
//                             <i className={`fas fa-heart ${isFavoriteMovie ? '' : 'text-muted'}`}></i>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MovieProps;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Movie } from '../../../types/movie';
import { getIdUserByToken, isToken } from '../../../utils/JwtService';
import { endpointBe } from "../../../utils/contant";
import { toast } from 'react-toastify';
import SaoXepHang from '../../../utils/SaoXepHang';

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

//   const handleFavoriteMovie = async () => {
//     if (!isToken()) {
//       toast.info("Bạn phải đăng nhập để sử dụng chức năng này");
//       navigate("/dangnhap");
//       return;
//     }
//
//     setLoading(true);
//
//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       toast.error("Token không tồn tại, vui lòng đăng nhập lại");
//       setLoading(false);
//       navigate("/dangnhap");
//       return;
//     }
//     const userId = getIdUserByToken();
//     const url = isFavoriteMovie
//       ? `${endpointBe}/favorites/remove`
//       : `${endpointBe}/favorites/add`;
//
//     const body = { userId,movieId: Number(movie.id) };
// console.log("URL:", url);
// console.log("Method:", isFavoriteMovie ? "DELETE" : "POST");
// console.log("Body:", body);
//
//     try {
//       const response = await fetch(url, {
//         method: isFavoriteMovie ? "DELETE" : "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//       });
//
//       if (!response.ok) {
//         if (response.status === 401) {
//           toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
//           navigate("/dangnhap");
//         }
//         throw new Error("Thao tác thất bại");
//       }
//
//       setIsFavoriteMovie(!isFavoriteMovie);
//       toast.success(
//         isFavoriteMovie
//           ? "Đã xóa khỏi danh sách yêu thích"
//           : "Đã thêm vào danh sách yêu thích"
//       );
//     } catch (error) {
//       console.error(error);
//       toast.error("Không thể cập nhật danh sách yêu thích");
//     } finally {
//       setLoading(false);
//     }
//   };
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

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
          navigate("/dangnhap");
        }
        throw new Error("Thao tác thất bại");
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
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
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

          <div className="d-flex justify-content-between align-items-center mt-auto">
            <div className="movie-rating text-warning">
              <i className="fas fa-star"></i>
              <span className="ms-1 text-dark">
                {movie.rating ? SaoXepHang(movie.rating) : 'Chưa có đánh giá'}
              </span>
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
    </div>
  );
};

export default MovieProps;
