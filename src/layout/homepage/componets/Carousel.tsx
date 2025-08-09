// import React, {useEffect, useState} from "react";
//
// import {Link} from "react-router-dom";
// import {get3PhimMoiNhat} from "../../../api/movieApi";
// import {Movie} from "../../../types/movie";
// import CarouselItem from "./CarouselItem";
// const Carousel: React.FC = () => {
//     const [danhsachPhim, setdanhsachPhim] = useState<Movie[]>([]);
//     const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
//     const [baoLoi, setBaoLoi] = useState<string | null>(null);
//     useEffect(() => {
//         get3PhimMoiNhat().then(
//             kq => {
//                 setdanhsachPhim(kq.ketQua);
//                 setDangTaiDuLieu(false);
//             }
//         ).catch(
//             error => {
//                 setDangTaiDuLieu(false);
//                 setBaoLoi(error.message);
//             }
//         );
//     }, []);
//     if(dangTaiDuLieu) {
//         return (
//             <div>
//                 <h1>Đang tải dữ liệu</h1>
//             </div>
//         );
//     }
//     if(baoLoi) {
//         return (
//             <div>
//                 <h1>Gặp lỗi: {baoLoi}</h1>
//             </div>
//         );
//     }
//     return (
//         <div>
//             <div id="carouselExampleDark" className="carousel carousel-dark slide">
//                 <div className="carousel-inner">
//                     <div className="carousel-item active" data-bs-interval="10000">
//                         <Link to={`/plastic-items/${danhsachPhim[0].id}`}>
//                             <CarouselItem movie={danhsachPhim[0]} />
//                         </Link>
//                     </div>
//                     <div className="carousel-item " data-bs-interval="10000">
//                         <Link to={`/plastic-items/${danhsachPhim[1].id}`}>
//                             <CarouselItem movie={danhsachPhim[1]} />
//                         </Link>
//
//                     </div>
//                     <div className="carousel-item " data-bs-interval="10000">
//                         <Link to={`/plastic-items/${danhsachPhim[2].id}`}>
//                             <CarouselItem movie={danhsachPhim[2]} />
//                         </Link>
//                     </div>
//                 </div>
//                 <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
//                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                     <span className="visually-hidden">Previous</span>
//                 </button>
//                 <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
//                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                     <span className="visually-hidden">Next</span>
//                 </button>
//             </div>
//         </div>
//     );
// }
// export default Carousel;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get3PhimMoiNhat } from "../../../api/movieApi";
import { Movie } from "../../../types/movie";
import { getMoviePoster } from "../../../api/movieApi";
import "./Carousel.css";

const Carousel: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        get3PhimMoiNhat()
            .then((res) => setMovies(res.ketQua))
            .catch((err) => console.error(err));
    }, []);

    // Tự động chuyển slide
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % movies.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [movies]);

    if (!movies.length) return <p>Đang tải banner...</p>;

    return (
        <div className="custom-carousel">
            {movies.map((movie, i) => (
                <div
                    key={movie.id}
                    className={`carousel-slide ${i === index ? "active" : ""}`}
                    style={{
                        backgroundImage: `url(${movie.poster_url || "/placeholder.jpg"})`,
                    }}
                >
                    <div className="overlay">
                        <div className="content">
                            <h2>{movie.title}</h2>
                            <p>{movie.description}</p>
                            <Link to={`/movies/${movie.id}`} className="watch-btn">
                                Xem ngay
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Carousel;
