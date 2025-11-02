import React, { FormEvent, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { CloudUpload, Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { User } from "../../../../types/user";
import { endpointBe } from "../../../../utils/contant";

interface UserFormProps {
  id: number;
  option: string;
  setKeyCountReload?: (key: number) => void;
  handleCloseModal: () => void;
}

export const UserForm: React.FC<UserFormProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    password: "",
    gender: "",
    enabled: true,
    avatar: "",
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [statusBtn, setStatusBtn] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");

  // Load dữ liệu user khi update
  useEffect(() => {
    if (props.option === "update" && props.id) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`${endpointBe}/users/${props.id}`);
          if (!response.ok) throw new Error("Không thể tải thông tin người dùng");
          const data = await response.json();
        setUser({
  ...data,
  gender: data.gender || "other", // giữ nguyên male/female/other
});


          if (data.avatar_url) {
            setPreviewAvatar(data.avatar_url);
          }
        } catch {
          toast.error("Lỗi khi tải thông tin người dùng");
        }
      };
      fetchUser();
    }
  }, [props.id, props.option]);

  // Submit form
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusBtn(true);
    const token = localStorage.getItem("access_token");

    try {
      if (avatar) {
        const formData = new FormData();
        formData.append("avatar", avatar);

        const uploadRes = await fetch(`${endpointBe}/users/upload-avatar`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("Upload avatar thất bại");
        const uploadData = await uploadRes.json();
        user.avatar = uploadData.avatar;
      }

      const endpoint =
        props.option === "add"
          ? `${endpointBe}/auth/register`
          : `${endpointBe}/users/${user.id}`;

      const method = props.option === "add" ? "POST" : "PUT";

    const payload = { ...user };

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Lỗi khi lưu thông tin người dùng");

      toast.success(
        props.option === "add"
          ? "Thêm người dùng thành công"
          : "Cập nhật người dùng thành công"
      );

      props.setKeyCountReload?.(Math.random());
      props.handleCloseModal();
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + (error as Error).message);
    } finally {
      setStatusBtn(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <Typography className="text-center" variant="h4" component="h2">
        {props.option === "add" ? "THÊM NGƯỜI DÙNG" : "CẬP NHẬT NGƯỜI DÙNG"}
      </Typography>
      <hr />
      <div className="container px-5">
        <form onSubmit={handleSubmit} className="form">
          <div className="row">
            <div className="col-6">
              <Box sx={{ "& .MuiTextField-root": { mb: 3 } }}>
                <TextField
                  required
                  label="Tên người dùng"
                  fullWidth
                  value={user.name}
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                    setErrorName("");
                  }}
                  error={!!errorName}
                  helperText={errorName}
                  size="small"
                />

                <TextField
                  required
                  label="Email"
                  type="email"
                  fullWidth
                  value={user.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                    setErrorEmail("");
                  }}
                  error={!!errorEmail}
                  helperText={errorEmail}
                  size="small"
                />

                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                  <InputLabel>Giới tính</InputLabel>
                 <Select
                value={user.gender || ""}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
                >
                <MenuItem value="male">Nam</MenuItem>
                <MenuItem value="female">Nữ</MenuItem>
                <MenuItem value="other">Khác</MenuItem>
                </Select>

                </FormControl>

                <InputLabel htmlFor="password">Mật khẩu</InputLabel>
                <TextField
                  id="password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                  <InputLabel>Trạng thái</InputLabel>
                  <Select
                    value={user.enabled ? "true" : "false"}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        enabled: e.target.value === "true",
                      })
                    }
                  >
                    <MenuItem value="true">Đang hoạt động</MenuItem>
                    <MenuItem value="false">Bị khóa</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>

            <div className="col-6">
              <div className="d-flex align-items-center mt-3">
                <Button
                  size="small"
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUpload />}
                >
                  Tải ảnh đại diện
                  <input
                    style={{ opacity: 0, width: "10px" }}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Button>
                {previewAvatar && (
                  <img
                    src={previewAvatar}
                    alt="Avatar Preview"
                    width={100}
                    className="ms-3"
                  />
                )}
              </div>
            </div>
          </div>

          <LoadingButton
            className="w-100 my-3"
            type="submit"
            loading={statusBtn}
            variant="outlined"
            sx={{ width: "25%", padding: "10px" }}
          >
            {props.option === "add" ? "Thêm người dùng" : "Lưu thay đổi"}
          </LoadingButton>
        </form>
      </div>
    </div>
  );
};
