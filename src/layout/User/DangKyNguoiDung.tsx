// import React, { useEffect, useState } from "react";
// import useScrollToTop from "../../hooks/ScrollToTop";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   checkExistEmail,
//   checkExistUsername,
//   checkPassword,
//   checkRepeatPassword,
// } from "../../utils/Validation";
// import {
//   TextField,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Paper,
//   Typography,
//   Box,
// } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// import { useAuth } from "../../utils/AuthContext";
// import { endpointBe } from "../../utils/contant";
// import { toast } from "react-toastify";

// const DangKyNguoiDung: React.FC = () => {
//   useScrollToTop();
//   const { isLoggedIn } = useAuth();
//   const navigation = useNavigate();

//   useEffect(() => {
//     if (isLoggedIn) {
//       navigation("/");
//     }
//   }, [isLoggedIn, navigation]);

//   // State cho form
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [repeatPassword, setRepeatPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [gender, setGender] = useState("M");

//   // Error state
//   const [errorName, setErrorName] = useState("");
//   const [errorEmail, setErrorEmail] = useState("");
//   const [errorPassword, setErrorPassword] = useState("");
//   const [errorRepeatPassword, setErrorRepeatPassword] = useState("");

//   // Button loading
//   const [statusBtn, setStatusBtn] = useState(false);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setStatusBtn(true);

//     setErrorName("");
//     setErrorEmail("");
//     setErrorPassword("");
//     setErrorRepeatPassword("");

//     const isNameValid = !(await checkExistUsername(setErrorName, name));
//     const isEmailValid = !(await checkExistEmail(setErrorEmail, email));
//     const isPassword = !checkPassword(setErrorPassword, password);
//     const isRepeatPassword = !checkRepeatPassword(
//       setErrorRepeatPassword,
//       repeatPassword,
//       password
//     );

//     if (isNameValid && isEmailValid && isPassword && isRepeatPassword) {
//       try {
//         const endpoint = endpointBe + "/auth/register";

//         const response = await toast.promise(
//           fetch(endpoint, {
//             method: "POST",
//             headers: {
//               "Content-type": "application/json",
//             },
//             body: JSON.stringify({
//               name,
//               password,
//               email,
//               gender,
//             }),
//           }),
//           { pending: "Đang trong quá trình xử lý ..." }
//         );

//         if (response.ok) {
//           toast.success("Đăng ký tài khoản thành công.");
//           navigation("/dangnhap");
//         } else {
//           const err = await response.json();
//           toast.error(err.message || "Đăng ký tài khoản thất bại");
//         }
//       } catch (error) {
//         console.log(error);
//         toast.error("Đăng ký tài khoản thất bại");
//       } finally {
//         setStatusBtn(false);
//       }
//     } else {
//       setStatusBtn(false);
//     }
//   };


//   return (
//     <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
//       <Paper
//         elevation={6}
//         sx={{
//           p: 4,
//           width: "100%",
//           maxWidth: 500,
//           borderRadius: 4,
//           bgcolor: "background.paper",
//         }}
//       >
//         <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
//           ĐĂNG KÝ
//         </Typography>
//         <Typography align="center" color="text.secondary" mb={3}>
//           Tạo tài khoản để bắt đầu trải nghiệm 🎬
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             error={errorName.length > 0}
//             helperText={errorName}
//             required
//             label="Tên đăng nhập"
//             placeholder="Nhập tên đăng nhập"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             onBlur={(e) => checkExistUsername(setErrorName, e.target.value)}
//             sx={{ mb: 2 }}
//           />

//           <TextField
//             fullWidth
//             error={errorEmail.length > 0}
//             helperText={errorEmail}
//             required
//             type="email"
//             label="Email"
//             placeholder="Nhập email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             onBlur={(e) => checkExistEmail(setErrorEmail, e.target.value)}
//             sx={{ mb: 2 }}
//           />

//           <TextField
//             fullWidth
//             error={errorPassword.length > 0}
//             helperText={errorPassword}
//             required
//             type="password"
//             label="Mật khẩu"
//             placeholder="Nhập mật khẩu"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             onBlur={(e) => checkPassword(setErrorPassword, e.target.value)}
//             sx={{ mb: 2 }}
//           />

//           <TextField
//             fullWidth
//             error={errorRepeatPassword.length > 0}
//             helperText={errorRepeatPassword}
//             required
//             type="password"
//             label="Xác nhận mật khẩu"
//             placeholder="Nhập lại mật khẩu"
//             value={repeatPassword}
//             onChange={(e) => setRepeatPassword(e.target.value)}
//             onBlur={(e) =>
//               checkRepeatPassword(setErrorRepeatPassword, e.target.value, password)
//             }
//             sx={{ mb: 2 }}
//           />

//           <FormControl component="fieldset" sx={{ mb: 3 }}>
//             <FormLabel component="legend">Giới tính</FormLabel>
//             <RadioGroup
//               row
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//             >
//               <FormControlLabel value="M" control={<Radio />} label="Nam" />
//               <FormControlLabel value="F" control={<Radio />} label="Nữ" />
//             </RadioGroup>
//           </FormControl>

//           <Box textAlign="center" mt={2}>
//             <LoadingButton
//               type="submit"
//               loading={statusBtn}
//               variant="contained"
//               sx={{ width: "70%", py: 1.5, fontSize: "1rem" }}
//             >
//               ĐĂNG KÝ
//             </LoadingButton>
//           </Box>
//         </form>

//         <Typography align="center" variant="body2" mt={3}>
//           Bạn đã có tài khoản?{" "}
//           <Link to="/dangnhap" style={{ textDecoration: "none", fontWeight: "bold" }}>
//             Đăng nhập
//           </Link>
//         </Typography>
//       </Paper>
//     </Box>
//   );
// };

// export default DangKyNguoiDung;
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

  // Hiện/ẩn mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  // Error state
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRepeatPassword, setErrorRepeatPassword] = useState("");

  // Button loading
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
              name,
              password,
              email,
              gender,
            }),
          }),
          { pending: "Đang trong quá trình xử lý ..." }
        );

        if (response.ok) {
          toast.success("Đăng ký tài khoản thành công.");
          navigation("/dangnhap");
        } else {
          const err = await response.json();
          toast.error(err.message || "Đăng ký tài khoản thất bại");
        }
      } catch (error) {
        console.log(error);
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
              label="Tên đăng nhập"
              placeholder="Nhập tên đăng nhập"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorName) setErrorName(""); // xoá báo đỏ khi nhập lại
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

            <TextField
              fullWidth
              error={errorPassword.length > 0}
              helperText={errorPassword}
              required
              type={showPassword ? "text" : "password"}
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorPassword) setErrorPassword("");
              }}
              onBlur={(e) => checkPassword(setErrorPassword, e.target.value)}
              sx={{ mb: 2 }}
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
