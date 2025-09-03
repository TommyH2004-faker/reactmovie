import React, { useEffect, useLayoutEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Tooltip,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { EditOutlined, CloudUpload, Close, Check, Visibility, VisibilityOff } from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import { toast } from "react-toastify";

import { getIdUserByToken } from "../utils/JwtService";
import useScrollToTop from "../hooks/ScrollToTop";
import { useAuth } from "../utils/AuthContext";
import { User } from "../types/user";
import { endpointBe } from "../utils/contant";
import HiddenInputUpload from "../utils/HiddenInputUpload";

const ProfilePage: React.FC = () => {
  useScrollToTop();
  const { isLoggedIn } = useAuth();
  const navigation = useNavigate();

  useLayoutEffect(() => {
    if (!isLoggedIn) {
      navigation("/dangnhap");
    }
  });

  const [user, setUser] = useState<User | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [dataAvatar, setDataAvatar] = useState("");
  const [isUploadAvatar, setIsUploadAvatar] = useState(false);
  const [modifiedStatus, setModifiedStatus] = useState(false);
  const [value, setValue] = useState("1");

  // password states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const idUser = getIdUserByToken();
    fetch(`${endpointBe}/users/${idUser}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
        setPreviewAvatar(res.avatar_url || "");
      })
      .catch((err) => console.error(err));
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      setDataAvatar(e.target.result as string);
      setPreviewAvatar(URL.createObjectURL(file));
      setIsUploadAvatar(true);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!user) return;
    toast.promise(
      fetch(`${endpointBe}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(user),
      })
        .then(() => toast.success("Cập nhật thông tin thành công"))
        .catch(() => toast.error("Cập nhật thông tin thất bại")),
      { pending: "Đang xử lý..." }
    );
  };

  const handleSubmitAvatar = () => {
    if (!user) return;
    toast.promise(
      fetch(`${endpointBe}/users/${user.id}/avatar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ avatar: dataAvatar }),
      })
        .then(() => {
          toast.success("Cập nhật ảnh đại diện thành công");
          setIsUploadAvatar(false);
        })
        .catch(() => toast.error("Cập nhật ảnh đại diện thất bại")),
      { pending: "Đang xử lý..." }
    );
  };

  const handleChangePassword = (event: FormEvent) => {
    event.preventDefault();
    if (!user) return;
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp");
      return;
    }
    toast.promise(
      fetch(`${endpointBe}/users/${user.id}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      })
        .then(() => {
          toast.success("Đổi mật khẩu thành công");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        })
        .catch(() => toast.error("Đổi mật khẩu thất bại")),
      { pending: "Đang xử lý..." }
    );
  };

  if (!isLoggedIn || !user) return null;

  return (
    <div className="container my-5">
      <Grid container spacing={2}>
        {/* Left column */}
        <Grid size={{ xs: 12, md: 3 }}>
          <div className="bg-light rounded py-3 me-lg-2">
            <div className="d-flex align-items-center justify-content-center flex-column">
              <Avatar
                alt={user.name}
                src={previewAvatar}
                sx={{ width: 100, height: 100 }}
              />
              {!isUploadAvatar ? (
                <Button
                  className="mt-3"
                  size="small"
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUpload />}
                >
                  Upload avatar
                  <HiddenInputUpload handleImageUpload={handleImageUpload} />
                </Button>
              ) : (
                <div>
                  <Button
                    className="mt-4 me-2"
                    size="small"
                    variant="outlined"
                    startIcon={<Close />}
                    onClick={() => {
                      setPreviewAvatar(user.avatar_url || "");
                      setIsUploadAvatar(false);
                    }}
                    color="error"
                  >
                    Huỷ
                  </Button>
                  <Button
                    className="mt-4 ms-2"
                    size="small"
                    variant="outlined"
                    startIcon={<Check />}
                    color="success"
                    onClick={handleSubmitAvatar}
                  >
                    Thay đổi
                  </Button>
                </div>
              )}
            </div>
            <div className="text-center mt-3">
              <p>Email: {user.email}</p>
            </div>
          </div>
        </Grid>

        {/* Right column */}
        <Grid size={{ xs: 12, md: 9 }}>
          <div
            className="bg-light rounded px-2 ms-lg-2"
            style={{ minHeight: "300px" }}
          >
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={(_, newValue) => setValue(newValue)}>
                    <Tab label="Thông tin cá nhân" value="1" />
                    <Tab label="Đánh giá" value="2" />
                    <Tab label="Đổi mật khẩu" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  {/* Personal info */}
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="ID"
                      value={user.id}
                      disabled
                      className="input-field"
                    />
                    <TextField
                      fullWidth
                      label="Tên"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      disabled={!modifiedStatus}
                      className="input-field"
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      value={user.email}
                      disabled
                      className="input-field"
                    />
                    {modifiedStatus && (
                      <div className="text-center my-3">
                        <Button
                          fullWidth
                          variant="outlined"
                          type="submit"
                          sx={{ width: "50%", padding: "10px" }}
                        >
                          Lưu và thay đổi
                        </Button>
                      </div>
                    )}
                    {!modifiedStatus && (
                      <div className="text-end my-3">
                        <Tooltip title="Chỉnh sửa thông tin">
                          <Button
                            variant="contained"
                            type="button"
                            onClick={() => setModifiedStatus(true)}
                          >
                            <EditOutlined />
                          </Button>
                        </Tooltip>
                      </div>
                    )}
                  </form>
                </TabPanel>
                <TabPanel value="2">
                  {/* Reviews */}
                  <ul>
                    {user.reviews?.map((r) => (
                      <li key={r.id}>{r.comment}</li>
                    ))}
                  </ul>
                </TabPanel>
                <TabPanel value="3">
                  {/* Change password */}
                  <form onSubmit={handleChangePassword}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Mật khẩu cũ"
                      type={showPassword ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Mật khẩu mới"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Nhập lại mật khẩu"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div className="text-center my-3">
                      <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{ width: "50%", padding: "10px" }}
                      >
                        Đổi mật khẩu
                      </Button>
                    </div>
                  </form>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
