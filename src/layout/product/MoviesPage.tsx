// MoviesPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../../types/movie";
import { getMovieBySlugGenre } from "../../api/ReviewApi";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import MovieProps from "./components/MovieProps";

export function MoviesPage() {
    const { genreSlug } = useParams<{ genreSlug: string }>();
    const [genreName, setGenreName] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            if (!genreSlug) return;

            try {
                setLoading(true);
                const response = await getMovieBySlugGenre(genreSlug);
                console.log('Genre data:', response);

                if (response && response.length > 0) {
                    setGenreName(response[0].name);
                    setMovies(response[0].movies);
                } else {
                    setError("Không tìm thấy thể loại phim");
                }
            } catch (err) {
                console.error('Error:', err);
                setError("Có lỗi xảy ra khi tải danh sách phim");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [genreSlug]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger m-4" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h1 className="mb-4">Phim thể loại: {genreName}</h1>

            {movies.length === 0 ? (
                <div className="alert alert-info">
                    Không tìm thấy phim nào thuộc thể loại này
                </div>
            ) : (
                <div className="row">
                    {movies.map((movie) => (
                        <MovieProps key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MoviesPage;