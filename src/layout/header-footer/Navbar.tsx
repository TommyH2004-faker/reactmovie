/*
// import { useEffect, useState } from "react";
// import './Navbar.css';
// import { useAuth } from "../../utils/AuthContext";
// import { Genre } from "../../types/genre";
// import { getAllGenres } from "../../api/genreApi";
// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import { getAvatarByToken, getRoleByToken, getUserNameByToken, isToken, logout } from "../../utils/JwtService";
// import { Avatar, Button } from "@mui/material";
// import { Search } from "react-bootstrap-icons";
// interface NavbarProps {
//     tuKhoaTimKiem: string;
//     setTuKhoaTimKiem: (tuKhoa: string) => void;
// }
//
// function Navbar({ tuKhoaTimKiem, setTuKhoaTimKiem }: NavbarProps) {
//     const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState('');
//     const { setLoggedIn } = useAuth();
//     const [genreList, setGenreList] = useState<Genre[]>([]);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         getAllGenres().then((genres: Genre[]) => {
//             setGenreList(genres);
//         }).catch((error: any) => {
//             console.error('Error fetching genres:', error.message);
//         });
//     }, []);
//
//     const onsearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setTuKhoaTamThoi(event.target.value);
//     }
//
//     const handleSearch = () => {
//         setTuKhoaTimKiem(tuKhoaTamThoi);
//         navigate(`/tim-kiem?q=${encodeURIComponent(tuKhoaTamThoi)}`);
//     }
//
//     const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === 'Enter') {
//             handleSearch();
//         }
//     }
//
//     const location = useLocation();
//     const adminEndpoint = ["/admin"];
//     if (adminEndpoint.includes(location.pathname)) {
//         return null;
//     }
//
//     return(
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//                <img src="https://res.cloudinary.com/duhi7od89/image/upload/v1754714395/d15629_cjyuei.jpg" alt="Logo" style={{width: "50px", height: "50px"}}/>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
//                         data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
//                         aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//
//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                             <NavLink className="nav-link active" aria-current="page" to="/">Trang chủ</NavLink>
//                         </li>
//
//                         <li className='nav-item dropdown dropdown-hover'>
//                             <a
//                                 className='nav-link dropdown-toggle'
//                                 href='#'
//                                 role='button'
//                                 data-bs-toggle='dropdown'
//                                 aria-expanded='false'
//                             >
//                                  Thể loại
//                             </a>
//                             <ul className='dropdown-menu'>
//                                 {genreList.map((genre, index) => {
//                                     return (
//                                         <li key={index}>
//                                             <Link
//                                                 className='dropdown-item'
//                                                 to={`/search/${genre.id}`}
//                                             >
//                                                 {genre.name}
//                                             </Link>
//                                         </li>
//                                     );
//                                 })}
//                             </ul>
//                         </li>
//                         <li className='nav-item'>
//                             <NavLink className='nav-link' to='/phim-moi'>
//                                 Phim Mới
//                             </NavLink>
//                         </li>
//                         <li className='nav-item'>
//                             <Link className='nav-link' to={"/phim-le"}>
//                                 Phim Lẻ
//                             </Link>
//                         </li>
//                         <li className='nav-item'>
//                             <NavLink className='nav-link' to='/phim-bo'>
//                                 Phim Bộ
//                             </NavLink>
//                         </li>
//                         <li className='nav-item'>
//                             <NavLink className='nav-link' to='/phim-chieu-rap'>
//                                 Phim Chiếu Rạp
//                             </NavLink>
//                         </li>
//                         <li className='nav-item'>
//                             <NavLink className='nav-link' to='/phim-tron-bo'>
//                                 Phim Trọn Bộ
//                             </NavLink>
//                         </li>
//                     </ul>
//                 </div>
//
//                 {/!* Tìm kiếm *!/}
//                 <div className="d-flex">
//                     <input className="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search"
//                            onChange={onsearchInputChange} value={tuKhoaTamThoi}/>
//                     <button className="btn btn-outline-success" type="submit" onClick={handleSearch}>Search
//                         <Search/>
//                     </button>
//                 </div>
//
//
//                 {/!* Biểu tượng đăng nhập *!/}
//                 {!isToken() && (
//                     <div>
//                         <Link to={"/dangnhap"}>
//                             <Button variant="contained" color="primary">Đăng nhập</Button>
//                         </Link>
//                         <Link to={"/dangKy"}>
//                             <Button variant="contained" color="secondary">Đăng ký</Button>
//                         </Link>
//                     </div>
//                 )}
//                 {isToken() && (
//                     <>
//                         {/!* <!-- Notifications --> *!/}
//                         <div className='dropdown'>
//                             <a
//                                 className='text-reset me-3 dropdown-toggle hidden-arrow'
//                                 href='#'
//                                 id='navbarDropdownMenuLink'
//                                 role='button'
//                                 data-mdb-toggle='dropdown'
//                                 aria-expanded='false'
//                             >
//                                 <i className='fas fa-bell'></i>
//                                 <span className='badge rounded-pill badge-notification bg-danger'>
// 										1
// 									</span>
//                             </a>
//                             <ul
//                                 className='dropdown-menu dropdown-menu-end'
//                                 aria-labelledby='navbarDropdownMenuLink'
//                             >
//                                 <li>
//                                     <a className='dropdown-item' href='#'>
//                                         Tin tức
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <a className='dropdown-item' href='#'>
//                                         Thông báo mới
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <a className='dropdown-item' href='#'>
//                                         Tất cả thông báo
//                                     </a>
//                                 </li>
//                             </ul>
//                         </div>
//                         {/!* <!-- Avatar --> *!/}
//                         <div className='dropdown'>
//                             <a
//                                 className='dropdown-toggle d-flex align-items-center hidden-arrow'
//                                 href='#'
//                                 id='navbarDropdownMenuAvatar'
//                                 role='button'
//                                 data-mdb-toggle='dropdown'
//                                 aria-expanded='false'
//                             >
//                                 <Avatar
//                                     style={{fontSize: "14px"}}
//                                     alt={getUserNameByToken()?.toUpperCase()}
//                                     src={getAvatarByToken()}
//                                     sx={{width: 30, height: 30}}
//                                 />
//                             </a>
//                             <ul
//                                 className='dropdown-menu dropdown-menu-end'
//                                 aria-labelledby='navbarDropdownMenuAvatar'
//                             >
//                                 <li>
//                                     <Link to={"/profile"} className='dropdown-item'>
//                                         Thông tin cá nhân
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className='dropdown-item'
//                                         to='/my-favorite-books'
//                                     >
//                                         Sản phẩm yêu thích của tôi
//                                     </Link>
//                                 </li>
//                                 {getRoleByToken() === "ADMIN" && (
//                                     <li>
//                                         <Link
//                                             className='dropdown-item'
//                                             to='/admin/dashboard'
//                                         >
//                                             Quản lý
//                                         </Link>
//                                     </li>
//                                 )}
//                                 <li>
//                                     <a
//                                         className='dropdown-item'
//                                         style={{cursor: "pointer"}}
//                                         onClick={() => {
//                                             logout(navigate);
//                                             setLoggedIn(false);
//                                         }}
//                                     >
//                                         Đăng xuất
//                                     </a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </nav>
//     );
// }
//
// export default Navbar;
//


import { useEffect, useState } from "react";
import "./Navbar.css";
import { useAuth } from "../../utils/AuthContext";
import { Genre } from "../../types/genre";
import { getAllGenres } from "../../api/genreApi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { getAvatarByToken, getRoleByToken, getUserNameByToken, isToken, logout } from "../../utils/JwtService";
import { Avatar, Button } from "@mui/material";
import { Search } from "react-bootstrap-icons";

interface NavbarProps {
    tuKhoaTimKiem: string;
    setTuKhoaTimKiem: (tuKhoa: string) => void;
}

export default function Navbar({ tuKhoaTimKiem, setTuKhoaTimKiem }: NavbarProps) {
    const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState("");
    const { setLoggedIn } = useAuth();
    const [genreList, setGenreList] = useState<Genre[]>([]);
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
    };

    if (["/admin"].includes(location.pathname)) return null;

    return (
        <header className="navbar-container">
            <div className="navbar-logo">
                <Link to="/">
                    <img
                        src="https://res.cloudinary.com/duhi7od89/image/upload/v1754714395/d15629_cjyuei.jpg"
                        alt="Logo"
                    />
                </Link>
            </div>

            <nav className="navbar-links">
                <NavLink to="/" end>Trang chủ</NavLink>
                <div className="dropdown">
                    <span className="dropdown-title">Thể loại</span>
                    <div className="dropdown-menu">
                        {genreList.map((genre) => (
                            <Link key={genre.id} to={`/search/${genre.id}`}>{genre.name}</Link>
                        ))}
                    </div>
                </div>
                <NavLink to="/phim-moi">Phim Mới</NavLink>
                <NavLink to="/phim-le">Phim Lẻ</NavLink>
                <NavLink to="/phim-bo">Phim Bộ</NavLink>
                <NavLink to="/phim-chieu-rap">Phim Chiếu Rạp</NavLink>
                <NavLink to="/phim-tron-bo">Phim Trọn Bộ</NavLink>
            </nav>

            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={tuKhoaTamThoi}
                    onChange={(e) => setTuKhoaTamThoi(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button onClick={handleSearch}><Search /></button>
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
*/
import { useEffect, useState } from "react";
import "./Navbar.css";
import { useAuth } from "../../utils/AuthContext";
import { Genre } from "../../types/genre";
import { getAllGenres } from "../../api/genreApi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { getAvatarByToken, getRoleByToken, getUserNameByToken, isToken, logout } from "../../utils/JwtService";
import { Avatar, Button, IconButton } from "@mui/material";
import { Search, X } from "react-bootstrap-icons";

interface NavbarProps {
    tuKhoaTimKiem: string;
    setTuKhoaTimKiem: (tuKhoa: string) => void;
}

export default function Navbar({ tuKhoaTimKiem, setTuKhoaTimKiem }: NavbarProps) {
    const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState("");
    const { setLoggedIn } = useAuth();
    const [genreList, setGenreList] = useState<Genre[]>([]);
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
    };

    const handleClear = () => {
        setTuKhoaTamThoi("");
        setTuKhoaTimKiem("");
        // Nếu muốn, có thể điều hướng về trang gốc hoặc trang tìm kiếm rỗng:
        navigate(`/movies/search`);
    };

    if (["/admin"].includes(location.pathname)) return null;

    return (
        <header className="navbar-container">
            <div className="navbar-logo">
                <Link to="/">
                    <img
                        src="https://res.cloudinary.com/duhi7od89/image/upload/v1754714395/d15629_cjyuei.jpg"
                        alt="Logo"
                    />
                </Link>
            </div>

            <nav className="navbar-links">
                <NavLink to="/" end>Trang chủ</NavLink>
                <div className="dropdown">
                    <span className="dropdown-title">Thể loại</span>
                    <div className="dropdown-menu">
                        {genreList.map((genre) => (
                            <Link key={genre.id} to={`/search/${genre.id}`}>{genre.name}</Link>
                        ))}
                    </div>
                </div>
                <NavLink to="/phim-moi">Phim Mới</NavLink>
                <NavLink to="/phim-le">Phim Lẻ</NavLink>
                <NavLink to="/phim-bo">Phim Bộ</NavLink>
                <NavLink to="/phim-chieu-rap">Phim Chiếu Rạp</NavLink>
                <NavLink to="/phim-tron-bo">Phim Trọn Bộ</NavLink>
            </nav>

            <div className="navbar-search" style={{ position: 'relative' }}>
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={tuKhoaTamThoi}
                    onChange={(e) => setTuKhoaTamThoi(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    style={{ paddingRight: '30px' }} // chừa chỗ cho nút X
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
