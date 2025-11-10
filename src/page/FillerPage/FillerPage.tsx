/*
// FilterPage.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useScrollToTop from "../../hooks/ScrollToTop";
import ToolFilter from "./components/ToolFiller";
import MovieList from "../../layout/product/MovieList";

interface FilterPageProps {
    keySearchNav?: string;
}

const FilterPage: React.FC<FilterPageProps> = ({ keySearchNav }) => {
    useScrollToTop();

    // State management
    const [size, setSize] = useState<number>(8);
    const [keySearch, setKeySearch] = useState<string>("");
    const [genreId, setGenreId] = useState<number>(0);
    const [filter, setFilter] = useState<number>(0);

    // Get genre ID from URL params
    const { idGenreParam } = useParams<{ idGenreParam?: string }>();

    // Update keySearch when keySearchNav changes
    useEffect(() => {
        if (keySearchNav) {
            setKeySearch(keySearchNav);
        }
    }, [keySearchNav]);

    // Update genreId when URL param changes
    useEffect(() => {
        if (idGenreParam) {
            const parsedId = parseInt(idGenreParam);
            if (!isNaN(parsedId)) {
                setGenreId(parsedId);
            }
        }
    }, [idGenreParam]);

    // Loading state
    if (idGenreParam && genreId === 0) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="filter-page">
            <div className="container bg-light my-3 py-3 px-4">
                <ToolFilter
                    size={size}
                    setSize={setSize}
                    keySearch={keySearch}
                    setKeySearch={setKeySearch}
                    genreId={genreId}
                    setGenreId={setGenreId}
                    filter={filter}
                    setFilter={setFilter}
                />
            </div>

            <MovieList
                paginable={true}
                size={size}
                keySearch={keySearch}
                genreId={genreId}
                filter={filter}
            />
        </div>
    );
};

export default FilterPage;*/
// FilterPage.tsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useScrollToTop from "../../hooks/ScrollToTop";
import ToolFilter from "./components/ToolFiller";
import MovieList from "../../layout/product/MovieList";

interface FilterPageProps {
    keySearchNav?: string;
}

const FilterPage: React.FC<FilterPageProps> = ({ keySearchNav }) => {
    useScrollToTop();
    const [searchParams] = useSearchParams();

    // State management
    const [size, setSize] = useState<number>(8);
    const [keySearch, setKeySearch] = useState<string>("");
    const [genreId, setGenreId] = useState<number>(0);
    const [filter, setFilter] = useState<number>(0);

    // Read URL parameters
    useEffect(() => {
        const genreIdFromUrl = searchParams.get("genreId");
        if (genreIdFromUrl) {
            const parsedId = parseInt(genreIdFromUrl);
            if (!isNaN(parsedId)) {
                setGenreId(parsedId);
            }
        }

        const searchQuery = searchParams.get("title");
        if (searchQuery) {
            setKeySearch(searchQuery);
        }
    }, [searchParams]);

    // Update keySearch when keySearchNav changes
    useEffect(() => {
        if (keySearchNav) {
            setKeySearch(keySearchNav);
        }
    }, [keySearchNav]);

    return (
        <div className="filter-page">
            <div className="container bg-light my-3 py-3 px-4">
                <ToolFilter
                    size={size}
                    setSize={setSize}
                    keySearch={keySearch}
                    setKeySearch={setKeySearch}
                    genreId={genreId}
                    setGenreId={setGenreId}
                    filter={filter}
                    setFilter={setFilter}
                />
            </div>

            <MovieList
                paginable={true}
                size={size}
                keySearch={keySearch}
                genreId={genreId}
                filter={filter}
            />
        </div>
    );
};

export default FilterPage;