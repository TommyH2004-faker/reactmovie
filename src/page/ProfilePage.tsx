// import React, { useEffect, useLayoutEffect, useState, FormEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Avatar,
//   Box,
//   Button,
//   TextField,
//   Tooltip,
//   Grid,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";

// import { Trash, Pencil } from "react-bootstrap-icons";

// import { EditOutlined, CloudUpload, Close, Check, Visibility, VisibilityOff } from "@mui/icons-material";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
// import Tab from "@mui/material/Tab";
// import { toast } from "react-toastify";


// import useScrollToTop from "../hooks/ScrollToTop";
// import { useAuth } from "../utils/AuthContext";
// import { User } from "../types/user";
// import { endpointBe } from "../utils/contant";
// import HiddenInputUpload from "../utils/HiddenInputUpload";
// import renderRating from "../utils/SaoXepHang";
// import { getIdUserByServer } from "../utils/JwtService";

// const ProfilePage: React.FC = () => {
//   useScrollToTop();
//   const { isLoggedIn } = useAuth();
//   const navigation = useNavigate();

//   useLayoutEffect(() => {
//     if (!isLoggedIn) {
//       navigation("/dangnhap");
//     }
//   });

//   const [user, setUser] = useState<User | null>(null);
//   const [previewAvatar, setPreviewAvatar] = useState("");
//   const [dataAvatar, setDataAvatar] = useState("");
//   const [isUploadAvatar, setIsUploadAvatar] = useState(false);
//   const [modifiedStatus, setModifiedStatus] = useState(false);
//   const [value, setValue] = useState("1");

//   // password states
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);


//   useEffect(() => {
//     const idUser =getIdUserByServer;
//     fetch(`${endpointBe}/users/${idUser}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         setUser(res);
//         setPreviewAvatar(res.avatar_url || "");
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (e: any) => {
//       setDataAvatar(e.target.result as string);
//       setPreviewAvatar(URL.createObjectURL(file));
//       setIsUploadAvatar(true);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = (event: FormEvent) => {
//     event.preventDefault();
//     if (!user) return;
//     toast.promise(
//       fetch(`${endpointBe}/users/${user.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         },
//         body: JSON.stringify(user),
//       })
//         .then(() => toast.success("Cập nhật thông tin thành công"))
//         .catch(() => toast.error("Cập nhật thông tin thất bại")),
//       { pending: "Đang xử lý..." }
//     );
//   };

//   const handleSubmitAvatar = () => {
//     if (!user) return;
//     toast.promise(
//       fetch(`${endpointBe}/users/${user.id}/avatar`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         },
//         body: JSON.stringify({ avatar: dataAvatar }),
//       })
//         .then(() => {
//           toast.success("Cập nhật ảnh đại diện thành công");
//           setIsUploadAvatar(false);
//         })
//         .catch(() => toast.error("Cập nhật ảnh đại diện thất bại")),
//       { pending: "Đang xử lý..." }
//     );
//   };

//   const handleChangePassword = (event: FormEvent) => {
//     event.preventDefault();
//     if (!user) return;
//     if (newPassword !== confirmPassword) {
//       toast.error("Mật khẩu nhập lại không khớp");
//       return;
//     }
//     toast.promise(
//       fetch(`${endpointBe}/users/${user.id}/password`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         },
//         body: JSON.stringify({ oldPassword, newPassword }),
//       })
//         .then(() => {
//           toast.success("Đổi mật khẩu thành công");
//           setOldPassword("");
//           setNewPassword("");
//           setConfirmPassword("");
//         })
//         .catch(() => toast.error("Đổi mật khẩu thất bại")),
//       { pending: "Đang xử lý..." }
//     );
//   };

//   if (!isLoggedIn || !user) return null;

//   return (
//     <div className="container my-5">
//       <Grid container spacing={2}>
//         {/* Left column */}
//         <Grid size={{ xs: 12, md: 3 }}>
//           <div className="bg-light rounded py-3 me-lg-2">
//             <div className="d-flex align-items-center justify-content-center flex-column">
//               <Avatar
//                 alt={user.name}
//                 src={previewAvatar}
//                 sx={{ width: 100, height: 100 }}
//               />
//               {!isUploadAvatar ? (
//                 <Button
//                   className="mt-3"
//                   size="small"
//                   component="label"
//                   variant="outlined"
//                   startIcon={<CloudUpload />}
//                 >
//                   Upload avatar
//                   <HiddenInputUpload handleImageUpload={handleImageUpload} />
//                 </Button>
//               ) : (
//                 <div>
//                   <Button
//                     className="mt-4 me-2"
//                     size="small"
//                     variant="outlined"
//                     startIcon={<Close />}
//                     onClick={() => {
//                       setPreviewAvatar(user.avatar_url || "");
//                       setIsUploadAvatar(false);
//                     }}
//                     color="error"
//                   >
//                     Huỷ
//                   </Button>
//                   <Button
//                     className="mt-4 ms-2"
//                     size="small"
//                     variant="outlined"
//                     startIcon={<Check />}
//                     color="success"
//                     onClick={handleSubmitAvatar}
//                   >
//                     Thay đổi
//                   </Button>
//                 </div>
//               )}
//             </div>
//             <div className="text-center mt-3">
//               <p>Email: {user.email}</p>
//             </div>
//           </div>
//         </Grid>

//         {/* Right column */}
//         <Grid size={{ xs: 12, md: 9 }}>
//           <div
//             className="bg-light rounded px-2 ms-lg-2"
//             style={{ minHeight: "300px" }}
//           >
//             <Box sx={{ width: "100%", typography: "body1" }}>
//               <TabContext value={value}>
//                 <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//                   <TabList onChange={(_, newValue) => setValue(newValue)}>
//                     <Tab label="Thông tin cá nhân" value="1" />
//                     <Tab label="Đánh giá" value="2" />
//                     <Tab label="Đổi mật khẩu" value="3" />
//                   </TabList>
//                 </Box>
//                 <TabPanel value="1">
//                   {/* Personal info */}
//                   <form onSubmit={handleSubmit}>
//                     <TextField
//                       fullWidth
//                       label="ID"
//                       value={user.id}
//                       disabled
//                       className="input-field"
//                     />
//                     <TextField
//                       fullWidth
//                       label="Tên"
//                       value={user.name}
//                       onChange={(e) =>
//                         setUser({ ...user, name: e.target.value })
//                       }
//                       disabled={!modifiedStatus}
//                       className="input-field"
//                     />
//                     <TextField
//                       fullWidth
//                       label="Email"
//                       value={user.email}
//                       disabled
//                       className="input-field"
//                     />
//                     {modifiedStatus && (
//                       <div className="text-center my-3">
//                         <Button
//                           fullWidth
//                           variant="outlined"
//                           type="submit"
//                           sx={{ width: "50%", padding: "10px" }}
//                         >
//                           Lưu và thay đổi
//                         </Button>
//                       </div>
//                     )}
//                     {!modifiedStatus && (
//                       <div className="text-end my-3">
//                         <Tooltip title="Chỉnh sửa thông tin">
//                           <Button
//                             variant="contained"
//                             type="button"
//                             onClick={() => setModifiedStatus(true)}
//                           >
//                             <EditOutlined />
//                           </Button>
//                         </Tooltip>
//                       </div>
//                     )}
//                   </form>
//                 </TabPanel>
//                 <TabPanel value="2">
//                   {/* Reviews */}
//                   <ul>
//                     {user.reviews?.map((r) => (
//                       <li key={r.id}>{r.comment}</li>
//                     ))}
//                   </ul>
//                 </TabPanel>


//                 <TabPanel value="3">
//                   {/* Change password */}
//                   <form onSubmit={handleChangePassword}>
//                     <TextField
//                       fullWidth
//                       margin="normal"
//                       label="Mật khẩu cũ"
//                       type={showPassword ? "text" : "password"}
//                       value={oldPassword}
//                       onChange={(e) => setOldPassword(e.target.value)}
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <IconButton onClick={() => setShowPassword(!showPassword)}>
//                               {showPassword ? <VisibilityOff /> : <Visibility />}
//                             </IconButton>
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                     <TextField
//                       fullWidth
//                       margin="normal"
//                       label="Mật khẩu mới"
//                       type={showPassword ? "text" : "password"}
//                       value={newPassword}
//                       onChange={(e) => setNewPassword(e.target.value)}
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <IconButton onClick={() => setShowPassword(!showPassword)}>
//                               {showPassword ? <VisibilityOff /> : <Visibility />}
//                             </IconButton>
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                     <TextField
//                       fullWidth
//                       margin="normal"
//                       label="Nhập lại mật khẩu"
//                       type={showPassword ? "text" : "password"}
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <IconButton onClick={() => setShowPassword(!showPassword)}>
//                               {showPassword ? <VisibilityOff /> : <Visibility />}
//                             </IconButton>
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                     <div className="text-center my-3">
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         type="submit"
//                         sx={{ width: "50%", padding: "10px" }}
//                       >
//                         Đổi mật khẩu
//                       </Button>
//                     </div>
//                   </form>
//                 </TabPanel>
//               </TabContext>
//             </Box>
//           </div>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default ProfilePage;
import React, { useEffect, useLayoutEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Tooltip,
  IconButton,
  InputAdornment,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  TableHead,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from "@mui/material";
import {
  EditOutlined,
  CloudUpload,
  Close,
  Check,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { toast } from "react-toastify";

import useScrollToTop from "../hooks/ScrollToTop";
import { useAuth } from "../utils/AuthContext";
import { User } from "../types/user";
import { endpointBe } from "../utils/contant";
import HiddenInputUpload from "../utils/HiddenInputUpload";
import { getIdUserByServer } from "../utils/JwtService";
import { deleteReview, updateReview } from "../api/ReviewApi";

const ProfilePage: React.FC = () => {
  useScrollToTop();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isLoggedIn) navigate("/dangnhap");
  }, [isLoggedIn, navigate]);

  const [user, setUser] = useState<User | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [isUploadAvatar, setIsUploadAvatar] = useState(false);
  const [modified, setModified] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { userInfo, setUserInfo } = useAuth();
 useEffect(() => {
  const fetchUser = async () => {
    try {
      const idUser = await getIdUserByServer(); // cần await
      if (!idUser) return;

      const res = await fetch(`${endpointBe}/users/${idUser}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Lỗi tải dữ liệu người dùng");

      const data = await res.json();
      setUser(data);
      setPreviewAvatar(data.avatar|| "");
    } catch (err) {
      toast.error("Không tải được dữ liệu người dùng");
      console.error(err);
    }
  };

  fetchUser();
}, []);

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  setSelectedFile(file);

  setPreviewAvatar(URL.createObjectURL(file));
  setIsUploadAvatar(true);
};

  const handleSubmitInfo = (event: FormEvent) => {
    event.preventDefault();
    if (!user) return;

    toast.promise(
      fetch(`${endpointBe}/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user),
      })
        .then(() => {
          toast.success("Cập nhật thông tin thành công");
          setModified(false);
        })
        .catch(() => toast.error("Cập nhật thất bại")),
      { pending: "Đang xử lý..." }
    );
  };
// const handleSubmitAvatar = async () => {
//   if (!user || !selectedFile) return;

//   const formData = new FormData();
//   formData.append("file", selectedFile);

//   toast.promise(
//     fetch(`${endpointBe}/users/${user.id}/avatar`, {
//       method: "PUT",
//       body: formData,
//       credentials: "include",
//     })
//       .then(async (res) => {
//         if (!res.ok) throw new Error("Upload failed");
//         const data = await res.json();

//         toast.success("Cập nhật ảnh đại diện thành công!");

//         // ✅ Lấy đúng key backend trả về
//         const newAvatarUrl = data.avatar;

//         // ✅ Cập nhật lại user và preview
//         setUser((prev) =>
//           prev ? { ...prev, avatar: newAvatarUrl } : prev
//         );
//         setPreviewAvatar(newAvatarUrl);

//         // ✅ Reset
//         setIsUploadAvatar(false);
//         setSelectedFile(null);
//       })
//       .catch((err) => {
//         console.error(err);
//         toast.error("Cập nhật ảnh đại diện thất bại");
//       }),
//     { pending: "Đang xử lý..." }
//   );
// };
const handleSubmitAvatar = async () => {
  if (!user || !selectedFile) return;

  const formData = new FormData();
  formData.append("file", selectedFile);

  toast.promise(
    fetch(`${endpointBe}/users/${user.id}/avatar`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();

        // Lấy URL avatar từ response
        const newAvatarUrl = data.avatar_url || data.avatar;
        if (!newAvatarUrl) throw new Error("Không nhận được URL avatar");

        // Cập nhật state local
        setUser((prev) => prev ? { ...prev, avatar: newAvatarUrl } : prev);
        setPreviewAvatar(newAvatarUrl);

        // Cập nhật AuthContext
        setUserInfo((prev) => prev ? { 
          ...prev,
          avatar: newAvatarUrl 
        } : prev);

        console.log('Đã cập nhật avatar URL:', newAvatarUrl);
        toast.success("Cập nhật ảnh đại diện thành công!");

        // Reset states
        setIsUploadAvatar(false);
        setSelectedFile(null);
      })
      .catch((err) => {
        console.error("Lỗi cập nhật avatar:", err);
        toast.error("Cập nhật ảnh đại diện thất bại");
      }),
    { pending: "Đang xử lý..." }
  );
};




const handleChangePassword = async (e: FormEvent) => {
  e.preventDefault();
  if (!user) return;

  if (newPassword !== confirmPassword) {
    toast.error("Mật khẩu nhập lại không khớp");
    return;
  }

  toast.promise(
    fetch(`${endpointBe}/users/${user.id}/password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ oldPassword, newPassword }),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok || data.message?.includes("incorrect")) {
          throw new Error(data.message || "Đổi mật khẩu thất bại");
        }

        toast.success("Đổi mật khẩu thành công");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        toast.error(err.message || "Đổi mật khẩu thất bại");
      }),
    {
      pending: "Đang xử lý...",
    }
  );
};
const [editReviewDialog, setEditReviewDialog] = useState(false);
const [editingReview, setEditingReview] = useState<{
  id: number;
  comment: string;
  rating: number;
} | null>(null);

const handleEditReview = (reviewId: number, oldComment: string, oldRating: number) => {
  setEditingReview({ id: reviewId, comment: oldComment, rating: oldRating });
  setEditReviewDialog(true);
};

const handleSaveReview = async () => {
  if (!editingReview) return;

  toast.promise(
    updateReview(editingReview.id, {
      comment: editingReview.comment,
      rating: editingReview.rating,
    })
      .then(() => {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                reviews: prev.reviews?.map((r) =>
                  r.id === editingReview.id
                    ? { ...r, comment: editingReview.comment, rating: editingReview.rating }
                    : r
                ),
              }
            : prev
        );
        setEditReviewDialog(false);
        setEditingReview(null);
      }),
    {
      pending: "Đang cập nhật đánh giá...",
      success: "Cập nhật đánh giá thành công",
      error: "Sửa đánh giá thất bại",
    }
  );
};

const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);

const handleDeleteReview = (reviewId: number) => {
  setReviewToDelete(reviewId);
  setDeleteDialogOpen(true);
};

const confirmDelete = async () => {
  if (!reviewToDelete) return;

  toast.promise(
    deleteReview(reviewToDelete)
      .then(() => {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                reviews: prev.reviews?.filter((r) => r.id !== reviewToDelete) || [],
              }
            : prev
        );
        setDeleteDialogOpen(false);
        setReviewToDelete(null);
      }),
    {
      pending: "Đang xóa...",
      success: "Đã xóa đánh giá",
      error: "Xóa đánh giá thất bại",
    }
  );
};


  if (!isLoggedIn || !user) return null;

  return (
    <div className="container my-5">
      <Paper elevation={2} sx={{ p: 3 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ width: "30%", verticalAlign: "top" }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar
                    alt={user.name}
                    src={previewAvatar || user.avatar || ""}
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                  {!isUploadAvatar ? (
                    <Button
                      variant="outlined"
                      startIcon={<CloudUpload />}
                      component="label"
                      size="small"
                    >
                      Upload Avatar
                      <HiddenInputUpload handleImageUpload={handleImageUpload} />
                    </Button>
                  ) : (
                    <Box display="flex" gap={1}>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Close />}
                        onClick={() => {
                          setPreviewAvatar(user.avatar || "");
                          setIsUploadAvatar(false);
                        }}
                      >
                        Huỷ
                      </Button>
                      <Button
                        variant="outlined"
                        color="success"
                        startIcon={<Check />}
                        onClick={handleSubmitAvatar}
                      >
                        Lưu
                      </Button>
                    </Box>
                  )}
                  <Box mt={2}>
                    <p>Email: {user.email}</p>
                  </Box>
                </Box>
              </TableCell>

              <TableCell sx={{ width: "70%" }}>
                <Tabs
                  value={tabValue}
                  onChange={(_, newVal) => setTabValue(newVal)}
                >
                  <Tab label="Thông tin cá nhân" />
                  <Tab label="Đánh giá" />
                  <Tab label="Đổi mật khẩu" />
                </Tabs>

                {tabValue === 0 && (
                  <Box mt={2}>
                    <form onSubmit={handleSubmitInfo}>
                      <TextField
                        fullWidth
                        label="ID"
                        value={user.id}
                        disabled
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Tên"
                        value={user.name}
                        onChange={(e) =>
                          setUser({ ...user, name: e.target.value })
                        }
                        disabled={!modified}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Email"
                        value={user.email}
                        disabled
                        margin="normal"
                      />
                      {modified ? (
                        <Box textAlign="center" mt={2}>
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: "50%" }}
                          >
                            Lưu thay đổi
                          </Button>
                        </Box>
                      ) : (
                        <Box textAlign="end" mt={2}>
                          <Tooltip title="Chỉnh sửa thông tin">
                            <IconButton onClick={() => setModified(true)}>
                              <EditOutlined />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                    </form>
                  </Box>
                )}
              

{tabValue === 1 && (
  <Box mt={3}>
    <Typography variant="h6" fontWeight="bold" gutterBottom>
      ✨ Danh sách đánh giá của bạn
    </Typography>

    {user.reviews?.length ? (
      <Table
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <TableHead sx={{ background: "#f0f0f0" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", width: "50%" }}>
              Bình luận
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", width: "20%" }}
            >
              Đánh giá
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", width: "30%" }}
            >
              Thao tác
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {user.reviews.map((r) => (
            <TableRow
              key={r.id}
              sx={{
                "&:hover": { background: "#fafafa" },
                transition: "0.2s",
              }}
            >
              <TableCell sx={{ fontSize: "0.9rem" }}>
                {r.comment?.trim() || <i>Không có nội dung</i>}
              </TableCell>

              <TableCell>
                <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                  <Rating 
                    value={r.rating} 
                    readOnly 
                    size="small"
                    sx={{ color: 'primary.main' }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    ({r.rating}/5)
                  </Typography>
                </Box>
              </TableCell>

              <TableCell>
                <Box display="flex" justifyContent="center" gap={1}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEditReview(r.id, r.comment || "", r.rating)}
                  >
                    <EditOutlined fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteReview(r.id)}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ) : (
      // eslint-disable-next-line react/jsx-no-undef
      <Typography
        mt={2}
        textAlign="center"
        color="text.secondary"
        fontStyle="italic"
      >
        Chưa có đánh giá nào.
      </Typography>
    )}
  </Box>
)}




                {tabValue === 2 && (
                  <Box mt={2}>
                    <form onSubmit={handleChangePassword}>
                      <TextField
                        fullWidth
                        label="Mật khẩu cũ"
                        margin="normal"
                        type={showPassword ? "text" : "password"}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Mật khẩu mới"
                        margin="normal"
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Nhập lại mật khẩu"
                        margin="normal"
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Box textAlign="center" mt={2}>
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ width: "50%" }}
                        >
                          Đổi mật khẩu
                        </Button>
                      </Box>
                    </form>
                  </Box>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      {/* Edit Review Dialog */}
      <Dialog 
        open={editReviewDialog} 
        onClose={() => {
          setEditReviewDialog(false);
          setEditingReview(null);
        }}
      >
        <DialogTitle>
          <Typography variant="h6" component="div">
            Chỉnh sửa đánh giá
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ width: 400, pt: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Nội dung đánh giá"
            value={editingReview?.comment || ""}
            onChange={(e) =>
              setEditingReview(prev =>
                prev ? { ...prev, comment: e.target.value } : null
              )
            }
            sx={{ mb: 2 }}
          />
          <Box>
            <Typography component="legend" mb={1}>
              Đánh giá của bạn
            </Typography>
            <Rating
              value={editingReview?.rating || 0}
              onChange={(_, value) =>
                setEditingReview(prev =>
                  prev ? { ...prev, rating: value || prev.rating } : null
                )
              }
              size="large"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              setEditReviewDialog(false);
              setEditingReview(null);
            }} 
            color="inherit"
          >
            Hủy
          </Button>
          <Button onClick={handleSaveReview} variant="contained" color="primary">
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setReviewToDelete(null);
        }}
      >
        <DialogTitle>
          <Typography variant="h6" component="div">
            Xác nhận xóa
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa đánh giá này không? 
            Hành động này không thể hoàn tác.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              setDeleteDialogOpen(false);
              setReviewToDelete(null);
            }} 
            color="inherit"
          >
            Hủy
          </Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
