import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import useScrollToTop from "../../hooks/ScrollToTop";
import { endpointBe } from "../../utils/contant";
import { toast } from "react-toastify";
import { getProfile } from "../../utils/auth";
import {
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import {
    Visibility,
    VisibilityOff,
    Email,
    Lock
} from "@mui/icons-material";
import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "../../admin/RequireAdmin";

const DangNhap: React.FC = () => {
    useScrollToTop();
    const navigate = useNavigate();
    const { isLoggedIn, setLoggedIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const res = await fetch(`${endpointBe}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) throw new Error("Login failed");

            const { access_token, refresh_token } = await res.json();

            if (!access_token) throw new Error("Invalid response from server");

            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);

            const decodeToken = jwtDecode(access_token) as JwtPayload;
            console.log("Decoded Token:", decodeToken);
            if (decodeToken.enabled === false) {
                toast.warning("Tài khoản chưa kích hoạt hoặc đã bị khóa");
                return;
            }

            toast.success("Đăng nhập thành công");
            setLoggedIn(true);

            if (decodeToken.roles?.includes("ADMIN")) {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            console.error("Lỗi đăng nhập:", err);
            setError("Tài khoản hoặc mật khẩu không đúng");
            toast.error("Tài khoản hoặc mật khẩu không đúng");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                        Đăng Nhập
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {error && (
                            <Typography color="error" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng Nhập
                        </Button>

                        <Box sx={{ textAlign: 'right', mt: 1 }}>
                            <Typography variant="body2">
                                Bạn chưa có tài khoản?{' '}
                                <Link
                                    to="/dangKy"
                                    style={{
                                        textDecoration: 'none',
                                        color: '#1976d2'
                                    }}
                                >
                                    Đăng ký
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default DangNhap;