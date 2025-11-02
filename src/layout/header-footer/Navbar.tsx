
// import { useEffect, useState } from "react";
// import "./Navbar.css";
// import { useAuth } from "../../utils/AuthContext";
// import { Genre } from "../../types/genre";
// import { getAllGenres } from "../../api/genreApi";
// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import { getAvatarByToken, getRoleByToken, getUserNameByToken, isToken, logout } from "../../utils/JwtService";
// import { 
//     Avatar, 
//     Button, 
//     IconButton, 
//     Menu, 
//     MenuItem, 
//     ListItemIcon, 
//     ListItemText,
//     Divider,
//     Box,
//     Typography
// } from "@mui/material";
// import { Search, X, List } from "react-bootstrap-icons";
// import { 
//     Person as PersonIcon,
//     Favorite as FavoriteIcon,
//     AdminPanelSettings as AdminIcon,
//     Logout as LogoutIcon 
// } from '@mui/icons-material';

// interface NavbarProps {
//     tuKhoaTimKiem: string;
//     setTuKhoaTimKiem: (tuKhoa: string) => void;
// }

// export default function Navbar({ tuKhoaTimKiem, setTuKhoaTimKiem }: NavbarProps) {
//     const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState("");
//     const { setLoggedIn } = useAuth();
//     const [genreList, setGenreList] = useState<Genre[]>([]);
//     const [menuOpen, setMenuOpen] = useState(false); // để toggle menu mobile
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         getAllGenres()
//             .then((genres) => setGenreList(genres))
//             .catch((err) => console.error("Error fetching genres:", err.message));
//     }, []);

//     const handleSearch = () => {
//         if (!tuKhoaTamThoi.trim()) return;
//         setTuKhoaTimKiem(tuKhoaTamThoi);
//         navigate(`/movies/search?title=${encodeURIComponent(tuKhoaTamThoi)}`);
//         setMenuOpen(false); // ẩn menu khi search trên mobile
//     };

//     const handleClear = () => {
//         setTuKhoaTamThoi("");
//         setTuKhoaTimKiem("");
//         navigate(`/movies/search`);
//     };
//     const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

// // Add this function
//     const toggleDropdown = (dropdownName: string) => {
//         setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
//     };
//     if (["/admin"].includes(location.pathname)) return null;

//     return (
//         <header className="navbar-container">
//             <div className="navbar-logo">
//                 <Link to="/" onClick={() => setMenuOpen(false)}>
//                     <img
//                         src="https://res.cloudinary.com/duhi7od89/image/upload/v1754714395/d15629_cjyuei.jpg"
//                         alt="Logo"
//                     />
//                 </Link>
//             </div>

//             {/* Hamburger button cho mobile */}
//             <button
//                 className="hamburger-btn"
//                 aria-label="Toggle menu"
//                 onClick={() => setMenuOpen(!menuOpen)}
//             >
//                 {menuOpen ? <X size={28} /> : <List size={28} />}
//             </button>

//             <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
//                 <NavLink to="/" end onClick={() => setMenuOpen(false)}>Trang chủ</NavLink>
//                 <div className={`dropdown ${activeDropdown === 'genres' ? 'active' : ''}`}>
//                   <span
//                       className="dropdown-title"
//                       onClick={() => toggleDropdown('genres')}
//                   >
//                     Thể loại
//                   </span>
//                     <div className="dropdown-menu">
//                         {genreList.map((genre) => (
//                             <Link
//                                 key={genre.id}
//                               /*  to={`/search/${genre.id}`}*/
//                                 to={`/search?genreId=${genre.id}`}

//                                 onClick={() => {
//                                     setMenuOpen(false);
//                                     setActiveDropdown(null);
//                                 }}
//                             >
//                                 {genre.name}
//                             </Link>
//                         ))}
//                     </div>
//                 </div>
//                 <NavLink to="genre/phim-moi" onClick={() => setMenuOpen(false)}>Phim Mới</NavLink>
//                 <NavLink to="genre/phim-le" onClick={() => setMenuOpen(false)}>Phim Lẻ</NavLink>
//                 <NavLink to="genre/phim-bo" onClick={() => setMenuOpen(false)}>Phim Bộ</NavLink>
//                 <NavLink to="genre/phim-chieu-rap" onClick={() => setMenuOpen(false)}>Phim Chiếu Rạp</NavLink>
//                 <NavLink to="genre/phim-tron-bo" onClick={() => setMenuOpen(false)}>Phim Trọn Bộ</NavLink>
//             </nav>

//             <div className="navbar-search" style={{ position: 'relative' }}>
//                 <input
//                     type="text"
//                     placeholder="Tìm kiếm..."
//                     value={tuKhoaTamThoi}
//                     onChange={(e) => setTuKhoaTamThoi(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                     style={{ paddingRight: '30px' }}
//                 />
//                 {tuKhoaTamThoi && (
//                     <IconButton
//                         onClick={handleClear}
//                         size="small"
//                         style={{
//                             position: 'absolute',
//                             right: 35,
//                             top: '50%',
//                             transform: 'translateY(-50%)',
//                             padding: 2,
//                         }}
//                         aria-label="clear search"
//                     >
//                         <X size={16} />
//                     </IconButton>
//                 )}
//                 <button onClick={handleSearch} aria-label="search button">
//                     <Search />
//                 </button>
//             </div>

//             {!isToken() ? (
//                 <div className="navbar-auth">
//                     <Link to="/dangnhap"><Button variant="contained">Đăng nhập</Button></Link>
//                     <Link to="/dangky"><Button variant="outlined" color="secondary">Đăng ký</Button></Link>
//                 </div>
//             ) : (
//                 <Box className="navbar-user">
//                     <IconButton
//                         onClick={(event) => setAnchorEl(event.currentTarget)}
//                         size="small"
//                         sx={{ padding: 0.5 }}
//                     >
//                         <Avatar
//                             alt={getUserNameByToken()?.toUpperCase()}
//                             src={getAvatarByToken()}
//                             sx={{ 
//                                 width: 35, 
//                                 height: 35,
//                                 border: '2px solid rgba(255, 255, 255, 0.2)',
//                                 transition: 'border-color 0.2s',
//                                 '&:hover': {
//                                     border: '2px solid rgba(255, 255, 255, 0.5)',
//                                 }
//                             }}
//                         />
//                     </IconButton>
//                     <Menu
//                         anchorEl={anchorEl}
//                         open={Boolean(anchorEl)}
//                         onClose={() => setAnchorEl(null)}
//                         onClick={() => setAnchorEl(null)}
//                         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//                         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//                         PaperProps={{
//                             elevation: 3,
//                             sx: {
//                                 overflow: 'visible',
//                                 filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                                 mt: 1.5,
//                                 minWidth: 220,
//                                 '&:before': {
//                                     content: '""',
//                                     display: 'block',
//                                     position: 'absolute',
//                                     top: 0,
//                                     right: 14,
//                                     width: 10,
//                                     height: 10,
//                                     bgcolor: 'background.paper',
//                                     transform: 'translateY(-50%) rotate(45deg)',
//                                     zIndex: 0,
//                                 },
//                             },
//                         }}
//                     >
//                         <Box sx={{ py: 1, px: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
//                             <Typography variant="subtitle2" color="text.secondary">
//                                 Xin chào,
//                             </Typography>
//                             <Typography variant="body1" fontWeight="500">
//                                 {getUserNameByToken()}
//                             </Typography>
//                         </Box>
//                         <MenuItem component={Link} to="/profile">
//                             <ListItemIcon>
//                                 <PersonIcon fontSize="small" />
//                             </ListItemIcon>
//                             <ListItemText>Thông tin cá nhân</ListItemText>
//                         </MenuItem>
//                         <MenuItem component={Link} to="/my-favorite-movie">
//                             <ListItemIcon>
//                                 <FavoriteIcon fontSize="small" />
//                             </ListItemIcon>
//                             <ListItemText>Phim yêu thích</ListItemText>
//                         </MenuItem>
//                         {getRoleByToken() === "ADMIN" && (
//                             <MenuItem component={Link} to="/admin/dashboard">
//                                 <ListItemIcon>
//                                     <AdminIcon fontSize="small" />
//                                 </ListItemIcon>
//                                 <ListItemText>Quản lý</ListItemText>
//                             </MenuItem>
//                         )}
//                         <Divider />
//                         <MenuItem 
//                             onClick={() => {
//                                 logout(navigate);
//                                 setLoggedIn(false);
//                             }}
//                             sx={{ color: 'error.main' }}
//                         >
//                             <ListItemIcon>
//                                 <LogoutIcon fontSize="small" color="error" />
//                             </ListItemIcon>
//                             <ListItemText>Đăng xuất</ListItemText>
//                         </MenuItem>
//                     </Menu>
//                 </Box>
//             )}
//         </header>
//     );
// }
import { useEffect, useState } from "react";
import "./Navbar.css";
import { useAuth } from "../../utils/AuthContext";
import { Genre } from "../../types/genre";
import { getAllGenres } from "../../api/genreApi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import { Search, X, List } from "react-bootstrap-icons";
import {
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { hasAuthCookie, logout } from "../../utils/JwtService";
import { endpointBe } from "../../utils/contant";

interface NavbarProps {
  tuKhoaTimKiem: string;
  setTuKhoaTimKiem: (tuKhoa: string) => void;
}

export default function Navbar({ tuKhoaTimKiem, setTuKhoaTimKiem }: NavbarProps) {
  const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState("");
  const { isLoggedIn, userInfo, setLoggedIn, setUserInfo } = useAuth();
  const [genreList, setGenreList] = useState<Genre[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // // Lấy danh sách thể loại và kiểm tra login
  // useEffect(() => {
  //   getAllGenres()
  //     .then((genres) => setGenreList(genres))
  //     .catch((err) => console.error("Error fetching genres:", err.message));

  //   // Kiểm tra login theo cookie HttpOnly
  //   fetch("http://localhost:3000/auth/profile", {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then(async (res) => {
  //       if (res.status === 401) {
  //         setLoggedIn(false);
  //         setUserInfo(null);
  //         return;
  //       }
  //       if (!res.ok) {
  //         console.error("Lỗi không xác định:", res.status);
  //         return;
  //       }
  //       const data = await res.json();
  //       setLoggedIn(true);
  //       setUserInfo({
  //         username: data.username || data.email,
  //         role: data.roles?.[0] || "USER",
  //       });
  //     })
  //     .catch((err) => {
  //       console.error("Không thể tải user:", err);
  //       setLoggedIn(false);
  //       setUserInfo(null);
  //     });
  // }, [setLoggedIn, setUserInfo]);

useEffect(() => {
  getAllGenres()
    .then((genres) => setGenreList(genres))
    .catch((err) => console.error("Error fetching genres:", err.message));

  // ✅ Chỉ gọi /auth/profile nếu có cookie
  if (!hasAuthCookie()) {
    console.log("⏭️ Chưa đăng nhập, bỏ qua fetch profile");
    setLoggedIn(false);
    setUserInfo(null);
    return;
  }

  fetch(endpointBe+"/auth/profile", {
    method: "GET",
    credentials: "include",
  })
    .then(async (res) => {
      if (res.status === 401) {
        console.log("❌ Chưa đăng nhập (401)");
        setLoggedIn(false);
        setUserInfo(null);
        return;
      }
      if (!res.ok) {
        console.error("Lỗi không xác định:", res.status);
        return;
      }
      const data = await res.json();
      console.log("📱 Profile Response Data:", data);
      
      // Gọi API để lấy thông tin user đầy đủ
      const userDetailRes = await fetch(`${endpointBe}/users/${data.id}`, {
        credentials: "include",
      });
      const userDetail = await userDetailRes.json();
      console.log("👤 User Detail Data:", userDetail);
      
      setLoggedIn(true);
      const userInfoData = {
        username: data.username || data.email,
        role: data.roles?.[0] || "USER",
        avatar: userDetail.avatar || userDetail.avatar_url, // Lấy avatar từ user detail
      };
      console.log("🎭 UserInfo được set:", userInfoData);
      setUserInfo(userInfoData);
    })
    .catch((err) => {
      console.error("Không thể tải user:", err);
      setLoggedIn(false);
      setUserInfo(null);
    });
}, [setLoggedIn, setUserInfo]);

  const handleSearch = () => {
    if (!tuKhoaTamThoi.trim()) return;
    setTuKhoaTimKiem(tuKhoaTamThoi);
    navigate(`/movies/search?title=${encodeURIComponent(tuKhoaTamThoi)}`);
    setMenuOpen(false);
  };

  const handleClear = () => {
    setTuKhoaTamThoi("");
    setTuKhoaTimKiem("");
    navigate(`/movies/search`);
  };

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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

      <button
        className="hamburger-btn"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <List size={28} />}
      </button>

      <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" end onClick={() => setMenuOpen(false)}>
          Trang chủ
        </NavLink>
        <div className={`dropdown ${activeDropdown === "genres" ? "active" : ""}`}>
          <span className="dropdown-title" onClick={() => toggleDropdown("genres")}>
            Thể loại
          </span>
          <div className="dropdown-menu">
            {genreList.map((genre) => (
              <Link
                key={genre.id}
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
        <NavLink to="genre/phim-moi" onClick={() => setMenuOpen(false)}>Phim Mới</NavLink>
        <NavLink to="genre/phim-le" onClick={() => setMenuOpen(false)}>Phim Lẻ</NavLink>
        <NavLink to="genre/phim-bo" onClick={() => setMenuOpen(false)}>Phim Bộ</NavLink>
        <NavLink to="genre/phim-chieu-rap" onClick={() => setMenuOpen(false)}>Phim Chiếu Rạp</NavLink>
        <NavLink to="genre/phim-tron-bo" onClick={() => setMenuOpen(false)}>Phim Trọn Bộ</NavLink>
      </nav>

      <div className="navbar-search" style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={tuKhoaTamThoi}
          onChange={(e) => setTuKhoaTamThoi(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          style={{ paddingRight: "30px" }}
        />
        {tuKhoaTamThoi && (
          <IconButton
            onClick={handleClear}
            size="small"
            style={{
              position: "absolute",
              right: 35,
              top: "50%",
              transform: "translateY(-50%)",
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

      {!isLoggedIn ? (
        <div className="navbar-auth">
          <Link to="/dangnhap"><Button variant="contained">Đăng nhập</Button></Link>
          <Link to="/dangky"><Button variant="outlined" color="secondary">Đăng ký</Button></Link>
        </div>
      ) : (
        <Box className="navbar-user">
          <IconButton
            onClick={(event) => {
              console.log("🖼️ Current UserInfo in Avatar:", userInfo);
              setAnchorEl(event.currentTarget);
            }}
            size="small"
            sx={{ padding: 0.5 }}
          >
            <Avatar
            src={userInfo?.avatar || "/default-avatar.jpg"}
            alt={userInfo?.username || "User"}
            sx={{
              width: 35,
              height: 35,
              border: "2px solid rgba(255,255,255,0.2)",
              transition: "border-color 0.2s",
              "&:hover": {
                border: "2px solid rgba(255,255,255,0.5)",
              },
            }}
/>

          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            onClick={() => setAnchorEl(null)}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              elevation: 3,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                minWidth: 220,
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
          >
            <Box sx={{ py: 1, px: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Xin chào,
              </Typography>
              <Typography variant="body1" fontWeight="500">
                {userInfo?.username}
              </Typography>
            </Box>
        

            <MenuItem component={Link} to="/profile">
              <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Thông tin cá nhân</ListItemText>
            </MenuItem>

            <MenuItem component={Link} to="/my-favorite-movie">
              <ListItemIcon><FavoriteIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Phim yêu thích</ListItemText>
            </MenuItem>

            {userInfo?.role === "ADMIN" && (
              <MenuItem component={Link} to="/admin/dashboard">
                <ListItemIcon><AdminIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Quản lý</ListItemText>
              </MenuItem>
            )}

            <Divider />

            <MenuItem onClick={() => { logout(navigate); setLoggedIn(false); setUserInfo(null); }} sx={{ color: "error.main" }}>
              <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
              <ListItemText>Đăng xuất</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      )}
    </header>
  );
}
