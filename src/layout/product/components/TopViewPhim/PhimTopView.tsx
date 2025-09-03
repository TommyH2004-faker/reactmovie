// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Movie } from "../../../../types/movie";
// import { endpointBe } from "../../../../utils/contant";

// const PhimTopView: React.FC = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);

//   useEffect(() => {
//     const fetchTopMovies = async () => {
//       try {
//         const res = await fetch(`${endpointBe}/movies/top`);
//         const data = await res.json();
//         setMovies(data.movies || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchTopMovies();
//   }, []);

//   return (
//     <div className="bg-dark p-3 rounded shadow-sm">
//       <h5 className="fw-bold mb-3 text-center text-warning">
//         🔥 Top View Phim
//       </h5>
//       <div className="d-flex flex-column gap-3">
//         {movies.map((movie, index) => (
//           <Link
//             to={`/movies/${movie.id}`}
//             key={movie.id}
//             className="d-flex align-items-center p-2 rounded transition"
//             style={{
//               textDecoration: "none",
//               color: "#f8f9fa",
//               background: "#212529",
//             }}
//           >
//             {/* Số thứ hạng */}
//             <div
//               className="me-2 fw-bold text-white d-flex align-items-center justify-content-center"
//               style={{
//                 width: "28px",
//                 height: "28px",
//                 borderRadius: "50%",
//                 backgroundColor:
//                   index === 0
//                     ? "#dc3545"
//                     : index === 1
//                     ? "#fd7e14"
//                     : index === 2
//                     ? "#ffc107"
//                     : "#6c757d",
//                 fontSize: "14px",
//               }}
//             >
//               {index + 1}
//             </div>

//             {/* Poster */}
//             <img
//               src={movie.poster_url}
//               alt={movie.title}
//               style={{
//                 width: "60px",
//                 height: "80px",
//                 objectFit: "cover",
//                 borderRadius: "6px",
//                 marginRight: "10px",
//                 flexShrink: 0,
//               }}
//             />

//             {/* Nội dung */}
//             <div className="flex-grow-1">
//               <h6
//                 className="mb-1 text-truncate fw-bold"
//                 style={{ maxWidth: "200px", color: "#fff" }}
//               >
//                 {movie.title}
//               </h6>
//               <small className="d-block text-secondary">
//                 🎬 {movie.director || "Đang cập nhật"}
//               </small>
//               <small className="text-muted">
//                 👁 {movie.views.toLocaleString()} lượt xem
//               </small>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PhimTopView;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../../../types/movie";
import { endpointBe } from "../../../../utils/contant";

// Import Material UI icons
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import VisibilityIcon from "@mui/icons-material/Visibility";

const PhimTopView: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const res = await fetch(`${endpointBe}/movies/top`);
        const data = await res.json();
        setMovies(data.movies || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTopMovies();
  }, []);

  return (
    <div className="bg-dark p-3 rounded shadow-sm">
      <h5 className="fw-bold mb-3 text-center text-warning d-flex align-items-center justify-content-center gap-2">
        <WhatshotIcon style={{ color: "#ff5722" }} />
        Top View Phim
      </h5>

      <div className="d-flex flex-column gap-3">
        {movies.map((movie, index) => (
          <Link
            to={`/movies/${movie.id}`}
            key={movie.id}
            className="d-flex align-items-center p-2 rounded transition"
            style={{
              textDecoration: "none",
              color: "#f8f9fa",
              background: "#212529",
            }}
          >
            {/* Số thứ hạng */}
            <div
              className="me-2 fw-bold text-white d-flex align-items-center justify-content-center"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor:
                  index === 0
                    ? "#dc3545"
                    : index === 1
                    ? "#fd7e14"
                    : index === 2
                    ? "#ffc107"
                    : "#6c757d",
                fontSize: "14px",
              }}
            >
              {index + 1}
            </div>

            {/* Poster */}
            <img
              src={movie.poster_url}
              alt={movie.title}
              style={{
                width: "60px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "6px",
                marginRight: "10px",
                flexShrink: 0,
              }}
            />

            {/* Nội dung */}
            <div className="flex-grow-1">
              <h6
                className="mb-1 text-truncate fw-bold"
                style={{ maxWidth: "200px", color: "#fff" }}
              >
                {movie.title}
              </h6>
              <small className="d-block text-secondary d-flex align-items-center gap-1">
                <MovieIcon fontSize="small" /> {movie.director || "Đang cập nhật"}
              </small>
              <small className="text-muted d-flex align-items-center gap-1">
                <VisibilityIcon fontSize="small" /> {movie.views.toLocaleString()} lượt xem
              </small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PhimTopView;
