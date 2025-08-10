// PhimMoiPage.tsx
import React, { useEffect, useState } from "react";
import { layPhimMoiNhat } from "../../../../api/movieApi";
import { Movie } from "../../../../types/movie";
import MovieProps from "../../components/MovieProps";
import { PhanTrang } from "../../../../utils/PhanTrang";
import { Skeleton } from "@mui/material";
import useScrollToTop from "../../../../hooks/ScrollToTop";

const PhimMoiPage: React.FC = () => {
    useScrollToTop();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await layPhimMoiNhat(currentPage - 1, 12);
                setMovies(response.ketQua);
                setTotalPages(response.tongSoTrang);
            } catch (err: any) {
                setError(err.message || "Có lỗi xảy ra khi tải phim mới");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [currentPage]);

    const handlePagination = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    if (loading) {
        return (
            <div className="container mb-5 py-5 px-5 bg-light">
                <div className="row">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="col-md-3 mt-3">
                            <Skeleton variant="rectangular" height={400} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mb-5 px-5 bg-light">
                <h1 className="text-danger py-5">{error}</h1>
            </div>
        );
    }

    if (!movies || movies.length === 0) {
        return (
            <div className="container mb-5 px-5 bg-light">
                <h2 className="mt-4 px-3 py-3 mb-0">
                    Không có phim mới nào!
                </h2>
            </div>
        );
    }

    return (
        <div className="container mb-5 pb-5 px-5 bg-light">
            <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded">
                <h2 className="text-dark m-0">PHIM MỚI CẬP NHẬT</h2>
            </div>
            <hr className="mt-0" />

            <div className="row">
                {movies.map((movie) => (
                    <MovieProps key={movie.id} movie={movie} />
                ))}
            </div>

            <hr className="mt-5" style={{ color: "#aaa" }} />
            <PhanTrang
                trangHienTai={currentPage}
                tongSoTrang={totalPages}
                phanTrang={handlePagination}
            />
        </div>
    );
};

export default PhimMoiPage;