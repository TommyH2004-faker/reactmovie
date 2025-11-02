// import React, { useEffect, useState } from "react";
// import { endpointBe } from "../../utils/contant";
// import { getIdUserByToken } from "../../utils/JwtService";
// import { Button, Skeleton } from "@mui/material";
// import { Link } from "react-router-dom";
// import MovieProps from "./components/MovieProps"; // Component hiển thị phim
// import { layPhimById } from "../../api/movieApi";

// interface FavoriteMoviesListProps {}

// const FavoriteMoviesList: React.FC<FavoriteMoviesListProps> = () => {
//     const [movieList, setMovieList] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetch(
//             endpointBe + `/favorites/get-favorite-movie/${getIdUserByToken()}`
//         )
//             .then((response) => response.json())
//             .then((idMovieList) => {
//                 const fetchMoviePromises = idMovieList.map(async (idMovie: any) => {
//                     const response = await layPhimById(idMovie);
//                     return response;
//                 });
//                 return Promise.all(fetchMoviePromises);
//             })
//             .then((movies) => {
//                 setMovieList(movies);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 setLoading(false);
//                 console.log(error);
//             });
//     }, []);

//     if (loading) {
//         return (
//             <div className='container-movie container mb-5 py-5 px-5 bg-light'>
//                 <div className='row'>
//                     {[...Array(4)].map((_, idx) => (
//                         <div className='col-md-6 col-lg-3 mt-3' key={idx}>
//                             <Skeleton className='my-3' variant='rectangular' height={400} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className='container-movie container mb-5 pb-5 px-5 bg-light'>
//             <h2 className='mt-4 px-3 py-3 mb-0'>PHIM YÊU THÍCH</h2>
//             <hr className='mt-0' />
//             <div className='row'>
//                 {movieList.length > 0 ? (
//                     movieList.map((movie) => (
//                         <MovieProps key={movie.id} movie={movie} />
//                     ))
//                 ) : (
//                     <div className='d-flex align-items-center justify-content-center flex-column'>
//                         <h4 className='text-center'>
//                             Bạn chưa yêu thích phim nào
//                         </h4>
//                         <Link to={"/search"}>
//                             <Button variant='contained' className='mt-3'>
//                                 Kho phim
//                             </Button>
//                         </Link>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default FavoriteMoviesList;


import React, { useEffect, useState } from "react";
import { endpointBe } from "../../utils/contant";

import { Button, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import MovieProps from "./components/MovieProps"; // Component hiển thị phim
import { layPhimById } from "../../api/movieApi";
import useScrollToTop from "../../hooks/ScrollToTop";
import { getIdUserByServer } from "../../utils/JwtService";

interface FavoriteMoviesListProps {}

const FavoriteMoviesList: React.FC<FavoriteMoviesListProps> = () => {
    useScrollToTop();
  const [movieList, setMovieList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchFavoriteMovies = async () => {
  //     const userId = getIdUserByServer();

  //     if (!userId) {
  //       console.error("User chưa đăng nhập hoặc token không hợp lệ");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const response = await fetch(
  //         `${endpointBe}/favorites/get-favorite-movie/${userId}`
  //       );

  //       const idMovieList = await response.json();

  //       if (!Array.isArray(idMovieList)) {
  //         console.error("Server response is not an array", idMovieList);
  //         setMovieList([]);
  //         setLoading(false);
  //         return;
  //       }

  //       const fetchMoviePromises = idMovieList.map(async (idMovie: number) => {
  //         try {
  //           const movie = await layPhimById(idMovie);
  //           return movie;
  //         } catch (err) {
  //           console.error(`Failed to fetch movie ${idMovie}`, err);
  //           return null;
  //         }
  //       });

  //       const movies = (await Promise.all(fetchMoviePromises)).filter(Boolean);
  //       setMovieList(movies);
  //     } catch (error) {
  //       console.error("Failed to fetch favorite movies", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchFavoriteMovies();
  // }, []);
useEffect(() => {
  const fetchFavoriteMovies = async () => {
    // ✅ Phải chờ Promise trả kết quả thật
    const userId = await getIdUserByServer();

    if (!userId) {
      console.error("⚠️ User chưa đăng nhập hoặc token không hợp lệ");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${endpointBe}/favorites/get-favorite-movie/${userId}`,
        {
          credentials: "include", // nếu backend cần cookie
        }
      );

      const idMovieList = await response.json();

      if (!Array.isArray(idMovieList)) {
        console.error("⚠️ Server response is not an array:", idMovieList);
        setMovieList([]);
        setLoading(false);
        return;
      }

      const fetchMoviePromises = idMovieList.map(async (idMovie: number) => {
        try {
          const movie = await layPhimById(idMovie);
          return movie;
        } catch (err) {
          console.error(`❌ Failed to fetch movie ${idMovie}`, err);
          return null;
        }
      });

      const movies = (await Promise.all(fetchMoviePromises)).filter(Boolean);
      setMovieList(movies);
    } catch (error) {
      console.error("❌ Failed to fetch favorite movies:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchFavoriteMovies();
}, []);

  if (loading) {
    return (
      <div className="container-movie container mb-5 py-5 px-5 bg-light">
        <div className="row">
          {[...Array(4)].map((_, idx) => (
            <div className="col-md-6 col-lg-3 mt-3" key={idx}>
              <Skeleton className="my-3" variant="rectangular" height={400} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-movie container mb-5 pb-5 px-5 bg-dark">
      <h2 className="mt-4 px-3 py-3 mb-0">PHIM YÊU THÍCH</h2>
      <hr className="mt-0" />
      <div className="row">
        {movieList.length > 0 ? (
          movieList.map((movie) => <MovieProps key={movie.id} movie={movie} />)
        ) : (
          <div className="d-flex align-items-center justify-content-center flex-column">
            <h4 className="text-center">Bạn chưa yêu thích phim nào</h4>
            <Link to={"/search"}>
              <Button variant="contained" className="mt-3">
                Kho phim
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteMoviesList;
