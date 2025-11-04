// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../utils/AuthContext";
// import useScrollToTop from "../../hooks/ScrollToTop";
// import { endpointBe } from "../../utils/contant";
// import { toast } from "react-toastify";
// import {
//     Box,
//     Button,
//     Container,
//     IconButton,
//     InputAdornment,
//     Paper,
//     TextField,
//     Typography
// } from "@mui/material";
// import {
//     Visibility,
//     VisibilityOff,
//     Email,
//     Lock
// } from "@mui/icons-material";
// import {jwtDecode} from "jwt-decode";
// import {JwtPayload} from "../../admin/RequireAdmin";
// import { getRoleByToken } from "../../utils/JwtService";

// const DangNhap: React.FC = () => {
//     useScrollToTop();
//     const navigate = useNavigate();
//     const { isLoggedIn, setLoggedIn } = useAuth();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [showPassword, setShowPassword] = useState(false);

//     useEffect(() => {
//     if (isLoggedIn) {
//         const role = getRoleByToken();
//         if (role !== "ADMIN") {
//             navigate("/");
//         }
//     }
// }, [isLoggedIn, navigate]);

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         try {
//             const res = await fetch(`${endpointBe}/auth/login`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email, password })
//             });

//             if (!res.ok) throw new Error("Login failed");

//             const { access_token, refresh_token } = await res.json();

//             if (!access_token) throw new Error("Invalid response from server");

//             localStorage.setItem("access_token", access_token);
//             localStorage.setItem("refresh_token", refresh_token);

//             const decodeToken = jwtDecode(access_token) as JwtPayload;
//             console.log("Decoded Token:", decodeToken);
//             if (decodeToken.enabled === false) {
//                 toast.warning("Tài khoản chưa kích hoạt hoặc đã bị khóa");
//                 return;
//             }

//             toast.success("Đăng nhập thành công");
//             setLoggedIn(true);
//             const role = getRoleByToken();
//             console.log("Role from token:", role);
//               if (role === "ADMIN") {
//               navigate("/admin/dashboard"); // chuyển thẳng vào dashboard
//             } else {
//               navigate("/");
//             }
//         } catch (err) {
//             console.error("Lỗi đăng nhập:", err);
//             setError("Tài khoản hoặc mật khẩu không đúng");
//             toast.error("Tài khoản hoặc mật khẩu không đúng");
//         }
//     };

//     return (
//         <Container component="main" maxWidth="xs">
//             <Box
//                 sx={{
//                     marginTop: 8,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center'
//                 }}
//             >
//                 <Paper
//                     elevation={3}
//                     sx={{
//                         padding: 4,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         width: '100%'
//                     }}
//                 >
//                     <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
//                         Đăng Nhập
//                     </Typography>
//                     <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
//   <TextField
//     margin="normal"
//     required
//     fullWidth
//     id="email"
//     label="Email"
//     name="email"
//     autoComplete="email"
//     autoFocus
//     value={email}
//     onChange={(e) => setEmail(e.target.value)}
//     InputProps={{
//       startAdornment: (
//         <InputAdornment position="start">
//           <Email />
//         </InputAdornment>
//       ),
//     }}
//   />
//   <TextField
//     margin="normal"
//     required
//     fullWidth
//     name="password"
//     label="Mật khẩu"
//     type={showPassword ? "text" : "password"}
//     id="password"
//     autoComplete="current-password"
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//     InputProps={{
//       startAdornment: (
//         <InputAdornment position="start">
//           <Lock />
//         </InputAdornment>
//       ),
//       endAdornment: (
//         <InputAdornment position="end">
//           <IconButton
//             onClick={() => setShowPassword(!showPassword)}
//             edge="end"
//           >
//             {showPassword ? <VisibilityOff /> : <Visibility />}
//           </IconButton>
//         </InputAdornment>
//       ),
//     }}
//   />

//   {/* Thêm link Quên mật khẩu ở đây */}
//   <Box sx={{ textAlign: "right", mt: 1 }}>
//     <Link
//       to="/quenMatKhau"
//       style={{
//         textDecoration: "none",
//         color: "#1976d2",
//         fontSize: "0.875rem"
//       }}
//     >
//       Quên mật khẩu?
//     </Link>
//   </Box>

//   {error && (
//     <Typography color="error" sx={{ mt: 2 }}>
//       {error}
//     </Typography>
//   )}

//   <Button
//     type="submit"
//     fullWidth
//     variant="contained"
//     sx={{ mt: 3, mb: 2 }}
//   >
//     Đăng Nhập
//   </Button>

//   <Box sx={{ textAlign: 'right', mt: 1 }}>
//     <Typography variant="body2">
//       Bạn chưa có tài khoản?{' '}
//       <Link
//         to="/dangKy"
//         style={{
//           textDecoration: 'none',
//           color: '#1976d2'
//         }}
//       >
//         Đăng ký
//       </Link>
//     </Typography>
//   </Box>
// </Box>



//                 </Paper>
//             </Box>
//         </Container>
//     );
// };

// export default DangNhap;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { toast } from "react-toastify";
import { endpointBe } from "../../utils/contant";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import useScrollToTop from "../../hooks/ScrollToTop";

const DangNhap: React.FC = () => {
  const navigate = useNavigate();
  useScrollToTop();
  const { setLoggedIn, setUserInfo, isLoggedIn, userInfo } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Nếu đã đăng nhập, tự điều hướng đúng role
  useEffect(() => {
    if (isLoggedIn && userInfo) {
      if (userInfo.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isLoggedIn, userInfo, navigate]);

  // 🔹 Gửi request login
// 🔹 Gửi request login
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    const res = await fetch(`${endpointBe}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Lấy dữ liệu phản hồi từ server
    const data = await res.json().catch(() => ({}));
    console.log("Server response:", data); // Log để debug

    if (!res.ok) {
  const errorMessage = data.error?.message || data.message || "";
  switch (res.status) {
    case 401:
      if (errorMessage.includes("not enabled")) {
        toast.error("Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt.");
        setError("Tài khoản chưa được kích hoạt");
      } else if (errorMessage.includes("locked")) {
        toast.error("Tài khoản đã bị khóa. Vui lòng liên hệ admin.");
        setError("Tài khoản đã bị khóa");
      } else if (errorMessage.includes("password")) {
        toast.error("Mật khẩu không chính xác");
        setError("Mật khẩu không chính xác");
      } else {
        toast.error(errorMessage || "Thông tin đăng nhập không chính xác");
        setError("Thông tin đăng nhập không chính xác");
      }
      return;
    case 404:
      toast.error("Tài khoản không tồn tại");
      setError("Tài khoản không tồn tại");
      return;
    default:
      toast.error(errorMessage || "Đăng nhập thất bại");
      setError("Đăng nhập thất bại");
      return;
  }
}


    // ✅ Nếu đăng nhập thành công thì gọi lấy profile
    const profileRes = await fetch(`${endpointBe}/auth/profile`, {
      credentials: "include",
    });

    if (!profileRes.ok) {
      toast.error("Không thể lấy thông tin người dùng");
      return;
    }

    const userProfile = await profileRes.json();

    setLoggedIn(true);
    setUserInfo({
      username: userProfile.email,
      role: userProfile.roles?.[0] || "USER",
    });

    toast.success("Đăng nhập thành công");

    if (userProfile.roles?.includes("ADMIN")) {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  } catch (err) {
    console.error("❌ Lỗi đăng nhập:", err);
    toast.error("Có lỗi xảy ra khi đăng nhập, vui lòng thử lại!");
    setError("Tài khoản hoặc mật khẩu không đúng");
  }
};


  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper 
          elevation={6}
          sx={{ 
            p: 4, 
            width: "100%",
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              component="h1" 
              variant="h4" 
              sx={{ 
                fontWeight: 600,
                color: 'primary.main',
                mb: 1
              }}
            >
              Đăng Nhập
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Chào mừng bạn quay trở lại!
            </Typography>
          </Box>

          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
              width: "100%",
              '& .MuiTextField-root': { mb: 2.5 }
            }}
          >
            <TextField
              fullWidth
              required
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5
                }
              }}
            />
            <TextField
              fullWidth
              required
              type={showPassword ? "text" : "password"}
              label="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5
                }
              }}
            />
            
            {error && (
              <Typography 
                color="error" 
                sx={{ 
                  mt: 1, 
                  display: 'flex', 
                  alignItems: 'center',
                  fontSize: '0.875rem'
                }}
              >
                {error}
              </Typography>
            )}

            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              sx={{ 
                mt: 2,
                mb: 3,
                py: 1.5,
                borderRadius: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              Đăng Nhập
            </Button>

            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
              pt: 1,
              borderTop: '1px solid',
              borderColor: 'divider'
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1 
              }}>
                <Typography variant="body2" color="text.secondary">
                  Bạn chưa có tài khoản?
                </Typography>
                <Button
                  variant="text"
                  onClick={() => navigate("/dangKy")}
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  Đăng ký ngay
                </Button>
              </Box>

              <Button
                variant="text"
                onClick={() => navigate("/quenMatKhau")}
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 500
                }}
              >
                Quên mật khẩu?
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default DangNhap;
