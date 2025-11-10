
import React, { useEffect, useState } from "react";
import useScrollToTop from "../../hooks/ScrollToTop";
import { Link, useNavigate } from "react-router-dom";
import {
  checkExistEmail,
  checkExistUsername,
  checkPassword,
  checkRepeatPassword,
} from "../../utils/Validation";
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../../utils/AuthContext";
import { endpointBe } from "../../utils/contant";
import { toast } from "react-toastify";

const DangKyNguoiDung: React.FC = () => {
  useScrollToTop();
  const { isLoggedIn } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigation("/");
    }
  }, [isLoggedIn, navigation]);

  // State cho form
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("M");
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-4 cho độ mạnh mật khẩu

  // Hàm đánh giá độ mạnh của mật khẩu
  const calculatePasswordStrength = (pass: string) => {
    let strength = 0;
    
    if (pass.length >= 8) strength += 1;
    if (pass.match(/[a-z]+/)) strength += 1;
    if (pass.match(/[A-Z]+/)) strength += 1;
    if (pass.match(/[0-9]+/)) strength += 1;
    if (pass.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength += 1;
    
    return strength;
  };

  // Trả về màu dựa trên độ mạnh
  const getPasswordStrengthColor = (strength: number) => {
    switch (strength) {
      case 0: return "error.main";
      case 1: return "error.main";
      case 2: return "warning.main";
      case 3: return "info.main";
      case 4:
      case 5: return "success.main";
      default: return "error.main";
    }
  };

  // Trả về text mô tả độ mạnh
  const getPasswordStrengthText = (strength: number) => {
    switch (strength) {
      case 0: return "Rất yếu";
      case 1: return "Yếu";
      case 2: return "Trung bình";
      case 3: return "Khá mạnh";
      case 4:
      case 5: return "Mạnh";
      default: return "Rất yếu";
    }
  };

  // Hiện/ẩn mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  // Error state
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRepeatPassword, setErrorRepeatPassword] = useState("");

  const [statusBtn, setStatusBtn] = useState(false);

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  setStatusBtn(true);

  setErrorName("");
  setErrorEmail("");
  setErrorPassword("");
  setErrorRepeatPassword("");

  const isNameValid = !(await checkExistUsername(setErrorName, name));
  const isEmailValid = !(await checkExistEmail(setErrorEmail, email));
  const isPassword = !checkPassword(setErrorPassword, password);
  const isRepeatPassword = !checkRepeatPassword(
    setErrorRepeatPassword,
    repeatPassword,
    password
  );

  if (isNameValid && isEmailValid && isPassword && isRepeatPassword) {
    try {
      const endpoint = endpointBe + "/auth/register";

      const response = await toast.promise(
        fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name, // Đổi name thành username nếu backend expect username
            password,
            email,
            gender,
          }),
        }),
        { pending: "Đang trong quá trình xử lý ..." }
      );

      if (response.ok) {
        toast.success(
          "Đăng ký tài khoản thành công. Vui lòng kiểm tra email để kích hoạt tài khoản."
        );
        navigation("/dangnhap");
      } else {
        const err = await response.json();
        toast.error(err.message || "Đăng ký tài khoản thất bại");
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      toast.error("Đăng ký tài khoản thất bại");
    } finally {
      setStatusBtn(false);
    }
  } else {
    setStatusBtn(false);
  }
};
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 500,
          borderRadius: 4,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          ĐĂNG KÝ
        </Typography>
        <Typography align="center" color="text.secondary" mb={3}>
          Tạo tài khoản để bắt đầu trải nghiệm 🎬
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
              fullWidth
              error={errorName.length > 0}
              helperText={errorName}
              required
              label="Tên người dùng "
              placeholder="Nhập tên đăng nhập"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorName) setErrorName("");
              }}
              onBlur={(e) => checkExistUsername(setErrorName, e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              error={errorEmail.length > 0}
              helperText={errorEmail}
              required
              type="email"
              label="Email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorEmail) setErrorEmail("");
              }}
              onBlur={(e) => checkExistEmail(setErrorEmail, e.target.value)}
              sx={{ mb: 2 }}
            />

            <Box sx={{ width: '100%', mb: 2 }}>
              <TextField
                fullWidth
                error={errorPassword.length > 0}
                required
                type={showPassword ? "text" : "password"}
                label="Mật khẩu"
                placeholder="Nhập mật khẩu (tối thiểu 8 ký tự)"
                value={password}
                onChange={(e) => {
                  const newPassword = e.target.value;
                  setPassword(newPassword);
                  setPasswordStrength(calculatePasswordStrength(newPassword));
                  if (errorPassword) setErrorPassword("");
                }}
                onBlur={(e) => checkPassword(setErrorPassword, e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {password && (
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {[0, 1, 2, 3, 4].map((index) => (
                      <Box
                        key={index}
                        sx={{
                          height: 4,
                          flex: 1,
                          bgcolor: index < passwordStrength 
                            ? getPasswordStrengthColor(passwordStrength)
                            : 'grey.300',
                          transition: 'background-color 0.3s',
                          borderRadius: 1
                        }}
                      />
                    ))}
                  </Box>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: getPasswordStrengthColor(passwordStrength),
                      mt: 0.5,
                      display: 'block'
                    }}
                  >
                    {getPasswordStrengthText(passwordStrength)}
                  </Typography>
                  {errorPassword && (
                    <Typography variant="caption" color="error.main" sx={{ mt: 0.5, display: 'block' }}>
                      {errorPassword}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>

            <TextField
              fullWidth
              error={errorRepeatPassword.length > 0}
              helperText={errorRepeatPassword}
              required
              type={showRepeatPassword ? "text" : "password"}
              label="Xác nhận mật khẩu"
              placeholder="Nhập lại mật khẩu"
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
                if (errorRepeatPassword) setErrorRepeatPassword("");
              }}
              onBlur={(e) =>
                checkRepeatPassword(setErrorRepeatPassword, e.target.value, password)
              }
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowRepeatPassword((prev) => !prev)}>
                      {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />


          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">Giới tính</FormLabel>
            <RadioGroup
              row
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="M" control={<Radio />} label="Nam" />
              <FormControlLabel value="F" control={<Radio />} label="Nữ" />
            </RadioGroup>
          </FormControl>

          <Box textAlign="center" mt={2}>
            <LoadingButton
              type="submit"
              loading={statusBtn}
              variant="contained"
              sx={{ width: "70%", py: 1.5, fontSize: "1rem" }}
            >
              ĐĂNG KÝ
            </LoadingButton>
          </Box>
        </form>

        <Typography align="center" variant="body2" mt={3}>
          Bạn đã có tài khoản?{" "}
          <Link to="/dangnhap" style={{ textDecoration: "none", fontWeight: "bold" }}>
            Đăng nhập
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default DangKyNguoiDung;
