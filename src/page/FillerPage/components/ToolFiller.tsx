// ToolFilter.tsx
import React, { ChangeEvent, useEffect, useState } from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    NativeSelect,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { Genre } from "../../../types/genre";
import { getAllGenres } from "../../../api/genreApi";
import { Search } from "react-bootstrap-icons";
import './ToolFiller.css'
interface ToolFilterProps {
    setSize: (size: number) => void;
    setKeySearch: (key: string) => void;
    setGenreId: (id: number) => void;
    setFilter: (filter: number) => void;
    size: number;
    keySearch: string;
    genreId: number;
    filter: number;
}

const ToolFilter: React.FC<ToolFilterProps> = ({
                                                   setSize,
                                                   setKeySearch,
                                                   setGenreId,
                                                   setFilter,
                                                   size,
                                                   keySearch,
                                                   genreId,
                                                   filter,
                                               }) => {
    const [keySearchTemp, setKeySearchTemp] = useState(keySearch);
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        getAllGenres()
            .then((genreList) => setGenres(genreList))
            .catch((error) => console.error("Error fetching genres:", error));
    }, []);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKeySearchTemp(e.target.value);
        if (e.target.value.trim() === "") {
            setKeySearch("");
        }
    };

    const handleSearchSubmit = () => {
        setKeySearch(keySearchTemp.trim());
    };

    const handleKeyUp = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            handleSearchSubmit();
        }
    };

    const handleGenreChange = (event: SelectChangeEvent) => {
        setGenreId(Number(event.target.value));
    };

    const handleFilterChange = (event: SelectChangeEvent) => {
        setFilter(Number(event.target.value));
    };

    return (
        <div className="tool-filter-container">
            <div className="filter-group">
                {/* Chọn thể loại */}
                <FormControl size="small" className="filter-select">
                    <InputLabel>Thể loại</InputLabel>
                    <Select
                        label="Thể loại"
                        value={String(genreId)}
                        onChange={handleGenreChange}
                    >
                        <MenuItem value="0">Tất cả thể loại</MenuItem>
                        {genres.map((genre) => (
                            <MenuItem key={genre.id} value={String(genre.id)}>
                                {genre.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Chọn sắp xếp */}
                <FormControl size="small" className="filter-select">
                    <InputLabel>Sắp xếp</InputLabel>
                    <Select
                        value={String(filter)}
                        label="Sắp xếp"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="0">Mặc định</MenuItem>
                        <MenuItem value="1">Mới nhất</MenuItem>
                        <MenuItem value="2">Cũ nhất</MenuItem>
                        <MenuItem value="3">Đánh giá cao</MenuItem>
                        <MenuItem value="4">Lượt xem nhiều</MenuItem>
                    </Select>
                </FormControl>
            </div>

            {/* Thanh tìm kiếm */}
            <div className="search-group">
                <div className="search-box">
                    <TextField
                        size="small"
                        placeholder="Tìm kiếm phim..."
                        value={keySearchTemp}
                        onChange={handleSearchChange}
                        onKeyUp={handleKeyUp}
                    />
                    <button className="search-btn" onClick={handleSearchSubmit}>
                        <Search size={18} />
                    </button>
                </div>

                {/* Chọn số lượng hiển thị */}
                <FormControl size="small" className="size-select">
                    <InputLabel variant="standard">Hiển thị</InputLabel>
                    <NativeSelect
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                    >
                        <option value={8}>8 phim</option>
                        <option value={16}>16 phim</option>
                        <option value={24}>24 phim</option>
                        <option value={32}>32 phim</option>
                    </NativeSelect>
                </FormControl>
            </div>
        </div>
    );
};

export default ToolFilter;
