import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../../types/movie";
import { getMovieBySlugGenre } from "../../../api/ReviewApi";
import MovieProps from "./MovieProps";


interface PhimTheoSlugProps {
  slug: string;       // slug của thể loại (vd: "phim-moi", "hanh-dong")
  title: string;      // tiêu đề hiển thị (vd: "Phim Mới", "Phim Hành Động")
  limit?: number;     // số phim preview (vd: 4)
}

const PhimTheoSlug: React.FC<PhimTheoSlugProps> = ({ slug, title, limit = 4 }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await getMovieBySlugGenre(slug);

        if (response && response.length > 0) {
          // lấy danh sách phim từ API
          const allMovies: Movie[] = response[0].movies || [];
          setMovies(allMovies.slice(0, limit));
        } else {
          setError("Không tìm thấy phim");
        }
      } catch (err) {
        console.error("Lỗi tải phim:", err);
        setError("Có lỗi xảy ra khi tải phim");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [slug, limit]);

  if (loading) {
    return (
      <div className="container my-4">
        <p>Đang tải {title}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="section-title">{title}</h2>
        <Link to={`/genre/${slug}`} className="btn btn-link">
          Xem thêm
        </Link>
      </div>

      <div className="row">
        {movies.map((movie) => (
          <MovieProps key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default PhimTheoSlug;
