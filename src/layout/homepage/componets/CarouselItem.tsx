import React, { useEffect, useState } from "react";
import { Movie } from "../../../types/movie";
import { getMoviePoster } from "../../../api/movieApi";

interface CCarouselItemProps {
    movie: Movie;
}

const CarouselItem: React.FC<CCarouselItemProps> = ({ movie }) => {
    const [posterUrl, setPosterUrl] = useState<string>("");
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState<string | null>(null);

    useEffect(() => {
        getMoviePoster(movie.id)
            .then((url: string | null) => {
                if (url) {
                    setPosterUrl(url);
                } else {
                    setPosterUrl("/placeholder.jpg");
                }
                setDangTaiDuLieu(false);
            })
            .catch((error: Error) => {
                setBaoLoi(error.message);
                setDangTaiDuLieu(false);
            });
    }, [movie.id]);


    if (dangTaiDuLieu) {
        return <h1>Đang tải dữ liệu...</h1>;
    }

    if (baoLoi) {
        return <h1>Gặp lỗi: {baoLoi}</h1>;
    }

    return (
        <div className="row align-items-center">
            <div className="col-5 text-center">
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="float-end"
                    style={{ width: "300px" }}
                />
            </div>
            <div className="col-7">
                <h5>{movie.title}</h5>
                <p>{movie.director}</p>
            </div>
        </div>
    );
};

export default CarouselItem;
