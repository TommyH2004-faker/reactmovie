// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   CircularProgress,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import { toast } from "react-toastify";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// import { getComments, deleteCommentAdmin } from "../../../../api/commentApi";
// import { DataTable } from "../../../../utils/DataTable";
// import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

// export const CommentTable: React.FC = () => {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<any[]>([]);

//   useEffect(() => {
//   getComments().then((comments) => {
//     // Chuẩn hoá dữ liệu cho DataTable
//     const rows = comments.map((comment: any) => ({
//       id: comment.id,
//       content: comment.content,
//       userName: comment.user ? comment.user.name : "Ẩn danh",
//       movieTitle: comment.movie ? comment.movie.title : "Không xác định",
//       dateCreated: new Date(comment.created_at).toLocaleDateString("vi-VN"),
//     }));
//     setData(rows);
//     setLoading(false);
//   });
// }, []);


//   const handleEdit = (comment: any) => {
//     // Tuỳ chỉnh: mở modal hoặc chuyển trang sửa comment
//     toast.info("Chức năng sửa comment chưa được triển khai");
//   };

//   const handleDelete = (id: number) => {
//     toast.promise(
//       deleteCommentAdmin(id)
//         .then(() => {
//           setData((prev) => prev.filter((c) => c.id !== id));
//           toast.success("Xoá comment thành công");
//         })
//         .catch(() => toast.error("Xoá comment thất bại")),
//       { pending: "Đang xoá comment..." }
//     );
//   };

//   const columns: GridColDef[] = [
//   { field: "id", headerName: "ID", width: 60 },
//   { field: "content", headerName: "Nội dung", flex: 1, minWidth: 250 },
//   { field: "userName", headerName: "Người dùng", width: 150 },
//   { field: "movieTitle", headerName: "Phim", width: 200 },
//   { field: "dateCreated", headerName: "Ngày tạo", width: 120 },
//   {
//     field: "action",
//     headerName: "Hành động",
//     width: 120,
//     type: "actions",
//     renderCell: (params: GridRenderCellParams) => (
//       <div>
//         <Tooltip title="Sửa">
//           <IconButton color="primary" onClick={() => handleEdit(params.row)}>
//             <EditIcon />
//           </IconButton>
//         </Tooltip>
//         <Tooltip title="Xoá">
//           <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       </div>
//     ),
//   },
// ];


//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return <DataTable columns={columns} rows={data} />;
// };


import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getComments,
  deleteCommentAdmin,
  updateCommentAdmin,
} from "../../../../api/commentApi";
import { DataTable } from "../../../../utils/DataTable";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { CommentForm } from "./CommentForm";


export const CommentTable: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState<any | null>(null);

  useEffect(() => {
    getComments().then((comments) => {
      const rows = comments.map((comment: any) => ({
        id: comment.id,
        content: comment.content,
        userName: comment.user ? comment.user.name : "Ẩn danh",
        movieTitle: comment.movie ? comment.movie.title : "Không xác định",
        dateCreated: new Date(comment.created_at).toLocaleDateString("vi-VN"),
      }));
      setData(rows);
      setLoading(false);
    });
  }, []);

  const handleEdit = (comment: any) => {
    setSelectedComment(comment);
    setOpenModal(true);
  };

  const handleDelete = (id: number) => {
    toast.promise(
      deleteCommentAdmin(id)
        .then(() => {
          setData((prev) => prev.filter((c) => c.id !== id));
          toast.success("Xoá comment thành công");
        })
        .catch(() => toast.error("Xoá comment thất bại")),
      { pending: "Đang xoá comment..." }
    );
  };

  const handleSave = async (updated: any) => {
    try {
      const result = await updateCommentAdmin(updated.id, {
        content: updated.content,
      });
      setData((prev) =>
        prev.map((c) => (c.id === result.id ? { ...c, content: result.content } : c))
      );
      toast.success("Cập nhật comment thành công");
      setOpenModal(false);
    } catch {
      toast.error("Cập nhật thất bại");
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "content", headerName: "Nội dung", flex: 1, minWidth: 250 },
    { field: "userName", headerName: "Người dùng", width: 150 },
    { field: "movieTitle", headerName: "Phim", width: 200 },
    { field: "dateCreated", headerName: "Ngày tạo", width: 120 },
    {
      field: "action",
      headerName: "Hành động",
      width: 120,
      type: "actions",
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <Tooltip title="Sửa">
            <IconButton color="primary" onClick={() => handleEdit(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá">
            <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <DataTable columns={columns} rows={data} />
      <CommentForm
        open={openModal}
        comment={selectedComment}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
      />
    </>
  );
};
