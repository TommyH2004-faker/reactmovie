import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieProps from "./components/MovieProps";
import { Movie } from "../../types/movie";
import { PhanTrang } from "../../utils/PhanTrang";
import { getMovieBySlugGenre } from "../../api/ReviewApi";

export function MoviesPage() {
    const { genreSlug } = useParams<{ genreSlug: string }>();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            if (!genreSlug) return;

            setLoading(true);
            try {
                const response = await getMovieBySlugGenre(genreSlug);
                // Since API returns a single movie object, we put it in an array
                setMovies([response]);
                setTotalPages(1); // Since it's a single movie, we set totalPages to 1
                setLoading(false);
            } catch (err: any) {
                setError(err.message || "Có lỗi xảy ra khi tải phim");
                setLoading(false);
            }
        };

        fetchMovies();
    }, [genreSlug]);

    if (loading) {
        return <div className="loading">Đang tải...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="movies-page">
            <h1>Phim thể loại: {genreSlug?.replace(/-/g, " ") || ""}</h1>
            <div className="movies-list">
                {movies.map((movie) => (
                    <MovieProps key={movie.id} movie={movie} />
                ))}
            </div>
            {movies.length > 0 && (
                <PhanTrang
                    trangHienTai={page}
                    tongSoTrang={totalPages}
                    phanTrang={setPage}
                />
            )}
        </div>
    );
}

export default MoviesPage;