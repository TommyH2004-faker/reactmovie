import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton, Button } from "@mui/material";

import MovieProps from "./components/MovieProps";
import { Movie } from "../../types/movie";
import { getAllMovies, searchMovies } from "../../api/movieApi";
import { PhanTrang } from "../../utils/PhanTrang";

interface MovieListProps {
    paginable?: boolean;
    keySearch?: string;
    size?: number;          // để có thể optional
    genreId?: number;
    filter?: number;
}

const MovieList: React.FC<MovieListProps> = ({
                                                 paginable = false,
                                                 keySearch = "",
                                                 size = 8,
                                                 genreId = 0,
                                                 filter = 0,
                                             }) => {
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePagination = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    // Reset trang khi keySearch, genreId, filter, size thay đổi
    useEffect(() => {
        setCurrentPage(1);
    }, [keySearch, genreId, filter, size]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                let response;
                if (
                    keySearch.trim() === "" &&
                    genreId === 0 &&
                    filter === 0
                ) {
                    response = await getAllMovies(size, currentPage - 1);
                } else {
                    response = await searchMovies(
                        genreId,
                        keySearch.trim(),
                        filter,
                        currentPage - 1,
                        size
                    );
                }

                console.log("API response:", response);

                if (response && Array.isArray(response.ketQua)) {
                    setMovieList(response.ketQua);
                } else {
                    setMovieList([]);
                }

                if (response && typeof response.tongSoTrang === "number") {
                    setTotalPages(response.tongSoTrang);
                } else {
                    setTotalPages(1);
                }
            } catch (err: any) {
                setError(err.message || "Lỗi khi tải dữ liệu");
                setMovieList([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [currentPage, keySearch, genreId, filter, size]);

    if (loading) {
        return (
            <div className="container mb-5 py-5 px-5 bg-light">
                <div className="row">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="col-md-6 col-lg-3 mt-3">
                            <Skeleton className="my-3" variant="rectangular" height={400} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mb-5 px-5 bg-light">
                <h1 className="text-danger py-5">Lỗi: {error}</h1>
            </div>
        );
    }

    if (!movieList || movieList.length === 0) {
        return (
            <div className="container mb-5 px-5 bg-light">
                <h2 className="mt-4 px-3 py-3 mb-0 text-dark">
                    Không tìm thấy phim nào theo yêu cầu! "{keySearch}"
                </h2>
            </div>
        );
    }

    return (
        <div className="container mb-5 pb-5 px-5 bg-light">
            {!paginable && (
                <>
                    <h2 className="mt-4 px-3 py-3 mb-0">TẤT CẢ PHIM</h2>
                    <hr className="mt-0" />
                </>
            )}

            <div className="row">
                {movieList.map((movie) => (
                    <MovieProps key={movie.id} movie={movie} />
                ))}
            </div>

            {paginable ? (
                <>
                    <hr className="mt-5" style={{ color: "#aaa" }} />
                    <PhanTrang
                        trangHienTai={currentPage}
                        tongSoTrang={totalPages}
                        phanTrang={handlePagination}
                    />
                </>
            ) : (
                <Link to="/tim-kiem">
                    <div className="d-flex align-items-center justify-content-center">
                        <Button variant="outlined" size="large" className="text-primary mt-5 w-25">
                            Xem Thêm
                        </Button>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default MovieList;
