import React from "react";
import {
  Dashboard as DashboardIcon,
  Movie as MovieIcon,
  CategoryRounded as CategoryRoundedIcon,
  ManageAccounts as ManageAccountsIcon,
  Feedback as FeedbackIcon,
  Person as PersonIcon,
  AccountCircle as AccountCircleIcon,
  ExitToApp as ExitToAppIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon
} from "@mui/icons-material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

const Slidebar: React.FC = () => {
 const { logout } = useAuth(); 
const navigate = useNavigate(); 

  const menuItems = [
    { path: "/admin/dashboard", icon: <DashboardIcon fontSize="small" />, label: "Dashboard" },
    { path: "/admin/movie", icon: <MovieIcon fontSize="small" />, label: "Quản lý phim" },
    { path: "/admin/genre", icon: <CategoryRoundedIcon fontSize="small" />, label: "Quản lý thể loại" },
    { path: "/admin/user", icon: <ManageAccountsIcon fontSize="small" />, label: "Quản lý tài khoản" },
    { path: "/admin/comment", icon: <FeedbackIcon fontSize="small" />, label: "Comment" },
  ];

  return (
    <div
      className="position-fixed d-flex flex-column justify-content-between min-vh-100 bg-dark shadow"
      style={{ zIndex: 100, width: 220 }}
    >
      {/* Logo */}
      <div className="px-3">
        <div className="d-flex justify-content-center align-items-center py-3">
          <img src="https://res.cloudinary.com/duhi7od89/image/upload/v1754714395/d15629_cjyuei.jpg" alt="Logo" width={100} />
        </div>
        <hr className="text-secondary" />

        {/* Menu */}
        <ul className="nav nav-pills flex-column">
          {menuItems.map(({ path, icon, label }) => (
            <li className="nav-item" key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center px-3 py-2 rounded-3 my-1 ${
                    isActive ? "bg-primary text-white" : "text-light"
                  }`
                }
              >
                {icon}
                <span className="ms-2">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Admin Profile Section */}
      <div className="px-3 mb-3">
        <hr className="text-secondary mb-2" />
        <div className="dropdown">
          <button
            className="btn w-100 text-light d-flex align-items-center justify-content-between px-3 py-2"
            style={{ 
              background: 'rgba(255, 255, 255, 0.1)', 
              borderRadius: '8px',
              transition: 'background-color 0.2s'
            }}
            id="adminMenu"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="d-flex align-items-center">
              <PersonIcon fontSize="small" className="text-primary" />
              <span className="ms-2 fw-medium">ADMIN</span>
            </div>
            <KeyboardArrowDownIcon fontSize="small" />
          </button>
          <div 
            className="dropdown-menu dropdown-menu-dark w-100" 
            aria-labelledby="adminMenu"
            style={{ 
              marginTop: '0.5rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Link 
              className="dropdown-item d-flex align-items-center py-2" 
              to="/profile"
            >
              <AccountCircleIcon fontSize="small" className="me-2" />
              Thông tin cá nhân
            </Link>
            <div className="dropdown-divider"></div>
            {/* <button 
              className="dropdown-item d-flex align-items-center py-2 text-danger" 
              // onClick={async () => {
              //   try {
              //     setLoggedIn(false);
              //     logout(navigate);
              //   } catch (error) {
              //     console.error('Lỗi khi đăng xuất:', error);
              //   }
              // }}
            

            >
              <ExitToAppIcon fontSize="small" className="me-2" />
              Đăng xuất
            </button> */}
            <button
  className="dropdown-item d-flex align-items-center py-2 text-danger"
  onClick={async () => {
    try {
      await logout();       // logout đã tự reset setLoggedIn & setUserInfo
      navigate("/dangnhap"); // redirect về trang login sau logout
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  }}
>
  <ExitToAppIcon fontSize="small" className="me-2" />
  Đăng xuất
</button>
          </div>
        </div>
      </div>

      {/* Responsive: bottom nav for small screens */}
      <div className="d-md-none bg-dark border-top w-100 position-fixed bottom-0">
        <ul className="nav justify-content-around">
          {menuItems.map(({ path, icon }) => (
            <li className="nav-item" key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `nav-link py-2 ${isActive ? "text-primary" : "text-light"}`
                }
              >
                {icon}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Slidebar;
