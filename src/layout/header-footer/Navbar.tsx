
import { useEffect, useState } from "react";
import "./Navbar.css";
import { useAuth } from "../../utils/AuthContext";
import { Genre } from "../../types/genre";
import { getAllGenres } from "../../api/genreApi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { getAvatarByToken, getRoleByToken, getUserNameByToken, isToken, logout } from "../../utils/JwtService";
import { Avatar, Button, IconButton } from "@mui/material";
import { Search, X, List } from "react-bootstrap-icons";

interface NavbarProps {
    tuKhoaTimKiem: string;
    setTuKhoaTimKiem: (tuKhoa: string) => void;
}

export default function Navbar({ tuKhoaTimKiem, setTuKhoaTimKiem }: NavbarProps) {
    const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState("");
    const { setLoggedIn } = useAuth();
    const [genreList, setGenreList] = useState<Genre[]>([]);
    const [menuOpen, setMenuOpen] = useState(false); // để toggle menu mobile
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getAllGenres()
            .then((genres) => setGenreList(genres))
            .catch((err) => console.error("Error fetching genres:", err.message));
    }, []);

    const handleSearch = () => {
        if (!tuKhoaTamThoi.trim()) return;
        setTuKhoaTimKiem(tuKhoaTamThoi);
        navigate(`/movies/search?title=${encodeURIComponent(tuKhoaTamThoi)}`);
        setMenuOpen(false); // ẩn menu khi search trên mobile
    };

    const handleClear = () => {
        setTuKhoaTamThoi("");
        setTuKhoaTimKiem("");
        navigate(`/movies/search`);
    };
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

// Add this function
    const toggleDropdown = (dropdownName: string) => {
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    };
    if (["/admin"].includes(location.pathname)) return null;

    return (
        <header className="navbar-container">
            <div className="navbar-logo">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                    <img
                        src="https://res.cloudinary.com/duhi7od89/image/upload/v1754714395/d15629_cjyuei.jpg"
                        alt="Logo"
                    />
                </Link>
            </div>

            {/* Hamburger button cho mobile */}
            <button
                className="hamburger-btn"
                aria-label="Toggle menu"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <X size={28} /> : <List size={28} />}
            </button>

            <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
                <NavLink to="/" end onClick={() => setMenuOpen(false)}>Trang chủ</NavLink>
               {/* <div className="dropdown">
                    <span className="dropdown-title">Thể loại</span>
                    <div className="dropdown-menu">
                        {genreList.map((genre) => (
                            <Link
                                key={genre.id}
                                to={`/movies/genre/${genre.id}`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {genre.name}
                            </Link>
                        ))}
                    </div>
                </div>*/}
                <div className={`dropdown ${activeDropdown === 'genres' ? 'active' : ''}`}>
                  <span
                      className="dropdown-title"
                      onClick={() => toggleDropdown('genres')}
                  >
                    Thể loại
                  </span>
                    <div className="dropdown-menu">
                        {genreList.map((genre) => (
                            <Link
                                key={genre.id}
                              /*  to={`/search/${genre.id}`}*/
                                to={`/search?genreId=${genre.id}`}

                                onClick={() => {
                                    setMenuOpen(false);
                                    setActiveDropdown(null);
                                }}
                            >
                                {genre.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <NavLink to="/phim-moi" onClick={() => setMenuOpen(false)}>Phim Mới</NavLink>
                <NavLink to="/phim-le" onClick={() => setMenuOpen(false)}>Phim Lẻ</NavLink>
                <NavLink to="/phim-bo" onClick={() => setMenuOpen(false)}>Phim Bộ</NavLink>
                <NavLink to="/phim-chieu-rap" onClick={() => setMenuOpen(false)}>Phim Chiếu Rạp</NavLink>
                <NavLink to="/phim-tron-bo" onClick={() => setMenuOpen(false)}>Phim Trọn Bộ</NavLink>
            </nav>

            <div className="navbar-search" style={{ position: 'relative' }}>
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={tuKhoaTamThoi}
                    onChange={(e) => setTuKhoaTamThoi(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    style={{ paddingRight: '30px' }}
                />
                {tuKhoaTamThoi && (
                    <IconButton
                        onClick={handleClear}
                        size="small"
                        style={{
                            position: 'absolute',
                            right: 35,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            padding: 2,
                        }}
                        aria-label="clear search"
                    >
                        <X size={16} />
                    </IconButton>
                )}
                <button onClick={handleSearch} aria-label="search button">
                    <Search />
                </button>
            </div>

            {!isToken() ? (
                <div className="navbar-auth">
                    <Link to="/dangnhap"><Button variant="contained">Đăng nhập</Button></Link>
                    <Link to="/dangky"><Button variant="outlined" color="secondary">Đăng ký</Button></Link>
                </div>
            ) : (
                <div className="navbar-user">
                    <div className="dropdown">
                        <Avatar
                            alt={getUserNameByToken()?.toUpperCase()}
                            src={getAvatarByToken()}
                            sx={{ width: 35, height: 35 }}
                        />
                        <div className="dropdown-menu right">
                            <Link to="/profile">Thông tin cá nhân</Link>
                            <Link to="/my-favorite-movie">Phim yêu thích</Link>
                            {getRoleByToken() === "ADMIN" && <Link to="/admin/dashboard">Quản lý</Link>}
                            <span
                                className="logout-btn"
                                onClick={() => {
                                    logout(navigate);
                                    setLoggedIn(false);
                                }}
                            >
                                Đăng xuất
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

