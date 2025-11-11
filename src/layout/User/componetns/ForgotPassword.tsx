import React, { FormEvent, useEffect, useState } from "react";
import useScrollToTop from "../../../hooks/ScrollToTop";
import { useNavigate } from "react-router-dom";
import { TextField, Box, Paper, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../../../utils/AuthContext";
import { endpointBe } from "../../../utils/contant";

export const ForgotPassword: React.FC = () => {
  useScrollToTop();

  const { isLoggedIn } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigation("/");
    }
  }, [isLoggedIn, navigation]);

  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // function handleSubmit(event: FormEvent<HTMLFormElement>): void {
  //   event.preventDefault();
  //   if (!validateEmail(email)) {
  //     setErrorEmail("Email không hợp lệ");
  //     return;
  //   }
  //   setErrorEmail("");

  //   toast.promise(
  //     fetch(endpointBe + "/auth/forgot-password", {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email }),
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           toast.success("Gửi thành công, hãy kiểm tra email để lấy mật khẩu");
  //           setEmail("");
  //           navigation("/dangnhap");
  //         } else {
  //           toast.warning("Email không tồn tại!");
  //         }
  //       })
  //       .catch((error) => {
  //         toast.error("Gửi thất bại");
  //         console.log(error);
  //       }),
  //     { pending: "Đang trong quá trình xử lý ..." }
  //   );
  // }
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!validateEmail(email)) {
    setErrorEmail("Email không hợp lệ");
    return;
  }

  setErrorEmail("");

  try {
    const promise = fetch(endpointBe + "/auth/forgot-password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const response = await toast.promise(promise, {
      pending: "Đang gửi yêu cầu...",
      success: "Đã gửi thành công! Hãy kiểm tra email.",
      error: "Gửi thất bại, vui lòng thử lại.",
    });

    if (!response.ok) {
      const err = await response.json();
      toast.warning(err.message || "Email không tồn tại!");
      return;
    }

    navigation("/dangnhap");
  } catch (error) {
    console.error("Lỗi:", error);
    toast.error("Lỗi kết nối server");
  }
};

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      px={{ xs: 2, sm: 0 }}
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 4 },
          width: "100%",
          maxWidth: 450,
          borderRadius: 3,
          bgcolor: "#ffffff",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          fontWeight="bold"
          color="#1976d2"
        >
          QUÊN MẬT KHẨU
        </Typography>
        <Typography align="center" color="text.secondary" mb={3}>
          Nhập email để lấy lại mật khẩu
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            type="email"
            label="Email"
            placeholder="Nhập email"
            value={email}
            error={errorEmail.length > 0}
            helperText={errorEmail}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorEmail) setErrorEmail("");
            }}
            sx={{ mb: 3, bgcolor: "#f9f9f9", borderRadius: 1 }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              py: 1.5,
              fontSize: "1rem",
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#1565c0" },
            }}
          >
            Lấy lại mật khẩu
          </Button>
          <Box mt={2} textAlign="center" color="text.secondary" fontSize="0.9rem">
            Quay lại trang{" "}
            <Button
              variant="text"
              onClick={() => navigation("/dangnhap")}
              sx={{ textTransform: "none", fontSize: "0.9rem" }}
            >
              Đăng nhập
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>

  );
};
