import React, { FormEvent, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { Genre } from "../../../../types/genre";
import { Movie } from "../../../../types/movie";
import { endpointBe } from "../../../../utils/contant";
import { getAllGenres } from "../../../../api/genreApi";
import { layPhimById } from "../../../../api/movieApi";
import { SelectMultiple } from "../../../../utils/SelectMultiple";


interface MovieFormProps {
    id: number;
    option: string; // "add" | "update"
    setKeyCountReload?: any;
    handleCloseModal: any;
}

export const MovieForm: React.FC<MovieFormProps> = (props) => {
    const [movie, setMovie] = useState<Movie>({
        id: 0,
        title: "",
        original_title: "",
        slug: "",
        description: "",
        release_date: "", // chỉ lưu số nguyên (năm)
        duration: 0,
        poster_url: "",
        banner_url: "",
        trailer_url: "",
        status: "ACTIVE",
        type: "",
        country: "",
        director: "",
        cast: "",
        rating: 0,
        views: 0,
        created_at: new Date(),
        updated_at: new Date(),
        genres: [],
        episodes: [],
        comments: [],
        reviews: [],
        favorites: []
    });

    const [genresList, setGenresList] = useState<Genre[]>([]);
    const [genresListSelected, setGenresListSelected] = useState<number[]>([]);
    const [previewPoster, setPreviewPoster] = useState("");
    const [previewBanner, setPreviewBanner] = useState("");

    const [posterFile, setPosterFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);

    const [selectedListName, setSelectedListName] = useState<string[]>([]);
    const [statusBtn, setStatusBtn] = useState(false);
    const [reloadCount, setReloadCount] = useState(0);

    // Load movie khi update
    useEffect(() => {
        if (props.option === "update") {
            layPhimById(props.id).then((response) => {
                if (response) {
                    setMovie({
                        ...response,
                        release_date: response.release_date ? String(response.release_date) : ""
                    });
                    setPreviewPoster(response.poster_url);
                    setPreviewBanner(response.banner_url || "");
                    response.genres.forEach((genre) => {
                        setSelectedListName((prev) => [...prev, genre.name]);
                    });
                }
            });
        }
    }, [props.option, props.id]);

    // Load genres
    useEffect(() => {
        getAllGenres().then((response) => {
            setGenresList(response);
        });
    }, []);

    // Update genres
    useEffect(() => {
        const selectedGenres = genresList.filter(genre => genresListSelected.includes(genre.id));
        setMovie(prev => ({...prev, genres: selectedGenres}));
    }, [genresListSelected, genresList]);

    function handlePosterUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            setPosterFile(file);
            setPreviewPoster(URL.createObjectURL(file));
        }
    }

    function handleBannerUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            setBannerFile(file);
            setPreviewBanner(URL.createObjectURL(file));
        }
    }

    const initialMovie: Movie = {
        id: 0,
        title: "",
        original_title: "",
        slug: "",
        description: "",
        release_date: "",
        duration: 0,
        poster_url: "",
        banner_url: "",
        trailer_url: "",
        status: "ACTIVE",
        type: "",
        country: "",
        director: "",
        cast: "",
        rating: 0,
        views: 0,
        created_at: new Date(),
        updated_at: new Date(),
        genres: [],
        episodes: [],
        comments: [],
        reviews: [],
        favorites: []
    };

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatusBtn(true);
        const token = localStorage.getItem("token");

        try {
            // Upload ảnh nếu có
            const formData = new FormData();
            if (posterFile) formData.append("poster", posterFile);
            if (bannerFile) formData.append("banner", bannerFile);

            let posterUrl = movie.poster_url;
            let bannerUrl = movie.banner_url;

            if (posterFile || bannerFile) {
                const uploadRes = await fetch(endpointBe + "/movies/upload-images", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData,
                });
                if (!uploadRes.ok) throw new Error("Upload ảnh thất bại");
                const uploadData = await uploadRes.json();
                posterUrl = uploadData.poster_url ?? movie.poster_url;
                bannerUrl = uploadData.banner_url ?? movie.banner_url;
            }
            const movieData = {
                title: movie.title,
                original_title: movie.original_title,
                slug: movie.slug,
                description: movie.description,
                release_date: movie.release_date ? Number(movie.release_date) : null, // backend nhận số
                duration: movie.duration,
                poster_url: posterUrl,
                banner_url: bannerUrl,
                trailer_url: movie.trailer_url,
                status: movie.status,
                type: movie.type,
                country: movie.country,
                director: movie.director,
                cast: movie.cast,
                rating: movie.rating,
                views: movie.views,
                genres: genresListSelected.map((id) => ({ id })), // chỉ gửi id genre
            };

            const endpoint =
                props.option === "add"
                    ? endpointBe + "/movies"
                    : endpointBe + `/movies/${movie.id}`;

            const method = props.option === "add" ? "POST" : "PUT";

            const saveRes = await fetch(endpoint, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movieData),
            });

            if (!saveRes.ok) {
                const errText = await saveRes.text();
                console.error(" Backend trả về:", errText);
                throw new Error("Gửi dữ liệu phim thất bại");
            }

            // Reset form
            setMovie(initialMovie);
            setPreviewPoster("");
            setPreviewBanner("");
            setPosterFile(null);
            setBannerFile(null);
            setReloadCount(Math.random());
            props.setKeyCountReload(Math.random());
            props.handleCloseModal();

            toast.success(
                props.option === "add" ? "Thêm phim thành công" : "Cập nhật phim thành công"
            );
        } catch (err) {
            console.error(err);
            toast.error("Gặp lỗi trong quá trình xử lý");
        } finally {
            setStatusBtn(false);
        }
    }


    return (
        <div>
            <Typography className='text-center' variant='h4' component='h2'>
                {props.option === "add" ? "THÊM PHIM MỚI" : "CẬP NHẬT PHIM"}
            </Typography>
            <hr />
            <div className='container px-5'>
                <form onSubmit={handleSubmit} className="form">
                    <input type='hidden' id='movieId' value={movie?.id} hidden/>
                    <div className='row'>
                        <div className='col-4'>
                            <Box sx={{ "& .MuiTextField-root": {mb: 3} }}>
                                <TextField
                                    required
                                    label='Tên phim'
                                    style={{width: "100%"}}
                                    value={movie.title}
                                    onChange={(e) => setMovie({...movie, title: e.target.value})}
                                    size='small'
                                />
                                <TextField
                                    label='Tên gốc'
                                    style={{width: "100%"}}
                                    value={movie.original_title}
                                    onChange={(e) => setMovie({...movie, original_title: e.target.value})}
                                    size='small'
                                />
                                <TextField
                                    label='Đạo diễn'
                                    style={{width: "100%"}}
                                    value={movie.director}
                                    onChange={(e) => setMovie({...movie, director: e.target.value})}
                                    size='small'
                                />
                                <TextField
                                    label='Diễn viên'
                                    style={{width: "100%"}}
                                    value={movie.cast}
                                    onChange={(e) => setMovie({...movie, cast: e.target.value})}
                                    size='small'
                                />
                            </Box>
                        </div>

                        <div className='col-4'>
                            <Box sx={{ "& .MuiTextField-root": {mb: 3} }}>
                                <TextField
                                    required
                                    type="number"
                                    label='Thời lượng (phút)'
                                    style={{width: "100%"}}
                                    value={movie.duration || ""}
                                    onChange={(e) => setMovie({...movie, duration: parseInt(e.target.value)})}
                                    size='small'
                                />
                                <TextField
                                    required
                                    label='Quốc gia'
                                    style={{width: "100%"}}
                                    value={movie.country}
                                    onChange={(e) => setMovie({...movie, country: e.target.value})}
                                    size='small'
                                />
                                <TextField
                                    type="number"
                                    label="Năm sản xuất"
                                    style={{ width: "100%" }}
                                    value={movie.release_date || ""}
                                    onChange={(e) => setMovie({ ...movie, release_date: e.target.value })}
                                    size="small"
                                />



                                <SelectMultiple
                                    selectedList={genresListSelected}
                                    setSelectedList={setGenresListSelected}
                                    selectedListName={selectedListName}
                                    setSelectedListName={setSelectedListName}
                                    values={genresList}
                                    setValue={setMovie}
                                    key={reloadCount}
                                    required={true}
                                />
                            </Box>
                        </div>

                        <div className='col-4'>
                            <Box sx={{ "& .MuiTextField-root": {mb: 3} }}>
                                <TextField
                                    type="number"
                                    label='Lượt xem'
                                    style={{ width: "100%" }}
                                    value={movie.views}
                                    // onChange={(e) => setMovie({ ...movie, views: parseInt(e.target.value) || 0 })}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        setMovie({ ...movie, views: isNaN(val) ? 0 : val });
                                    }}

                                    size='small'
                                />

                                <TextField
                                    type="number"
                                    label='Đánh giá'
                                    style={{ width: "100%" }}
                                    value={movie.rating}
                                    onChange={(e) => setMovie({ ...movie, rating: parseFloat(e.target.value) || 0 })}
                                    size='small'
                                />


                                <TextField
                                    label='Trailer URL'
                                    style={{width: "100%"}}
                                    value={movie.trailer_url}
                                    onChange={(e) => setMovie({...movie, trailer_url: e.target.value})}
                                    size='small'
                                />
                            </Box>
                        </div>

                        <div className='col-12'>
                            <Box>
                                <TextField
                                    label='Mô tả phim'
                                    style={{width: "100%"}}
                                    multiline
                                    rows={4}
                                    value={movie.description}
                                    onChange={(e) => setMovie({...movie, description: e.target.value})}
                                    required
                                />
                            </Box>
                        </div>

                        <div className='d-flex align-items-center mt-3'>
                            <Button
                                size='small'
                                component='label'
                                variant='outlined'
                                startIcon={<CloudUpload/>}
                            >
                                Tải poster phim
                                <input
                                    style={{opacity: "0", width: "10px"}}
                                    type='file'
                                    accept='image/*'
                                    onChange={handlePosterUpload}
                                />
                            </Button>
                            {previewPoster && <img src={previewPoster} alt='Movie Poster' width={100} />}
                        </div>

                        <div className='d-flex align-items-center mt-3'>
                            <Button
                                size='small'
                                component='label'
                                variant='outlined'
                                startIcon={<CloudUpload/>}
                            >
                                Tải banner phim
                                <input
                                    style={{opacity: "0", width: "10px"}}
                                    type='file'
                                    accept='image/*'
                                    onChange={handleBannerUpload}
                                />
                            </Button>
                            {previewBanner && <img src={previewBanner} alt='Movie Banner' width={100} />}
                        </div>
                    </div>

                    {props.option !== "view" && (
                        <LoadingButton
                            className='w-100 my-3'
                            type='submit'
                            loading={statusBtn}
                            variant='outlined'
                            sx={{width: "25%", padding: "10px"}}
                        >
                            {props.option === "add" ? "Thêm phim" : "Lưu phim"}
                        </LoadingButton>
                    )}
                </form>
            </div>
        </div>
    );
};
