
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
import {useConfirm} from "material-ui-confirm";

export const CommentTable: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState<any | null>(null);

  const confirm = useConfirm();

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
//   const handleDelete = (id: number) => {
//     confirm({
//       title: "Xoá bình luận",
//       description: "Bạn có chắc chắn muốn xoá bình luận này không?",
//       confirmationText: "Xoá",
//       cancellationText: "Huỷ",
//     })
//        .then(async () => {
//   console.log("Đã xác nhận xoá:", id);
//   await deleteCommentAdmin(id);
//   setData((prev) => prev.filter((c) => c.id !== id));
//   toast.success("Xoá bình luận thành công ✅");
// })
// .catch(() => {
//   console.log("Đã huỷ xoá:", id);
//   toast.info("Đã huỷ xoá bình luận");
// });
//   };

  const handleDelete = async (id: number) => {
    console.log("handleDelete gọi với id:", id);
    const result = await confirm({
      title: "Xoá bình luận",
      description: "Bạn có chắc chắn muốn xoá bình luận này không?",
      confirmationText: "Xóa",
      cancellationText: "Hủy",
    });

    if (result.confirmed) {
      console.log("Người dùng nhấn Xóa");
      await deleteCommentAdmin(id);
      setData((prev) => prev.filter((c) => c.id !== id));
      toast.success("Xóa bình luận thành công ");
    } else {
      console.log("Người dùng nhấn Hủy");
      toast.info("Đã huỷ xoá bình luận");
    }
  };








  const handleSave = async (updated: any) => {
    try {
      const result = await updateCommentAdmin(updated.id, {
        content: updated.content,
      });
      setData((prev) =>
          prev.map((c) => (c.id === result.id ? { ...c, content: result.content } : c))
      );
      toast.success("Cập nhật bình luận thành công");
      setOpenModal(false);
    } catch {
      toast.error("Cập nhật bình luận thất bại");
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
