

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { increaseViewCount, layPhimById } from "../../api/movieApi";
import { Movie } from "../../types/movie";
import "./WatchPage.css";

import InfoIcon from "@mui/icons-material/Info";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import CategoryIcon from "@mui/icons-material/Category";
import CommentIcon from "@mui/icons-material/Comment";
import CommentPage from "./components/CommnentUser/CommentPage";



const WatchPage: React.FC = () => {
  const { movieId, episodeId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (movieId) {
      increaseViewCount(Number(movieId));
    }
  }, [movieId]);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (!movieId) throw new Error("Invalid movie ID");
        const movieIdNumber = parseInt(movieId);
        if (isNaN(movieIdNumber)) throw new Error("Invalid movie ID format");

        const response = await layPhimById(movieIdNumber);
        setMovie(response);
        console.log("Du lieu tra ve : ", response);
      } catch (err: any) {
        setError(err.message || "Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="error-container">
        <h2>{error || "Không tìm thấy phim"}</h2>
      </div>
    );
  }

  // 🔹 Lấy tập hiện tại dựa vào episodeId, hoặc mặc định tập đầu tiên
  const currentEpisode =
    episodeId
      ? movie.episodes?.find((ep) => String(ep.id) === episodeId)
      : movie.episodes?.[0];

  return (
    <div className="watch-page">
      {/* Video player */}
      <div className="video-player">
        <iframe
          key={episodeId}
          src={currentEpisode?.video_url || movie.trailer_url || `/default-video.mp4`}
          title={currentEpisode?.title || movie.title || "Video Player"}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      {/* Thông tin phim */}
      <div className="movie-info">
        <h1 className="movie-title">{movie.title || "N/A"}</h1>
        <p className="movie-description d-flex align-items-center gap-2">
          <InfoIcon color="info" /> {movie.description || "N/A"}
        </p>
      </div>

      {/* Danh sách tập */}
      <div className="episode-list">
        <h3 className="d-flex align-items-center gap-2">
          <PlaylistPlayIcon color="warning" /> Danh sách tập
        </h3>
        <div className="episodes">
          {movie.episodes?.map((episode, index) => (
            <Link
              key={episode.id}
              to={`/watch/${movie.id}/episode/${episode.id}`}
              className={`episode-link ${episodeId === String(episode.id) ? "active" : ""}`}
            >
              Tập {index + 1}
            </Link>
          ))}
        </div>
      </div>

      {/* Phim liên quan */}
      <div className="related-movies">
        <h3 className="d-flex align-items-center gap-2">
          <CategoryIcon color="secondary" /> Phim liên quan
        </h3>
        <p className="related-hint">Click vào thể loại để xem các phim tương tự</p>
        {movie.genres?.map((genre) => (
          <Link
            key={genre.id}
            to={`/search?genreId=${genre.id}`}
            className="related-item"
          >
            {genre.name}
          </Link>
        ))}
      </div>

      {/* Bình luận */}
      <div className="comments-section">
        <h3 className="d-flex align-items-center gap-2">
          <CommentIcon color="action" /> Bình luận
        </h3>
        {/*<CommentPage />*/}
        <CommentPage/>
      </div>
    </div>
  );
};

export default WatchPage;
