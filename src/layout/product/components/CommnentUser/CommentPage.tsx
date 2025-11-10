// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import { toast } from "react-toastify";
// import "./CommentPage.css";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Cancel";
// import AddCommentIcon from "@mui/icons-material/AddComment";
// import {CommentMovie} from "../../../../types/comment";

// import {
//     addComment,
//     deleteComment,
//     deleteCommentAdmin,
//     getCommentsByMovie,
//     updateComment
// } from "../../../../api/commentApi";
// import { getIdUserByServer } from "../../../../utils/JwtService";

// const CommentPage: React.FC = () => {
//     const { movieId } = useParams<{ movieId: string }>();
//     const [comments, setComments] = useState<CommentMovie[]>([]);
//     const [newComment, setNewComment] = useState("");
//     const [editingComment, setEditingComment] = useState<CommentMovie | null>(
//         null
//     );
//     const [loading, setLoading] = useState(true);
//     const userId = getIdUserByServer();

//     // Load comments khi đổi movieId
//     useEffect(() => {
//         if (!movieId) return;
//         fetchComments();
//     }, [movieId]);

//     const fetchComments = async () => {
//         try {
//             setLoading(true);
//             const data = await getCommentsByMovie(Number(movieId));
//             setComments(data);
//         } catch (err) {
//             toast.error("Không thể tải danh sách bình luận!");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleAddComment = async () => {
//         if (!userId) {
//             toast.warning("Bạn cần đăng nhập để bình luận.");
//             return;
//         }
//         if (!newComment.trim()) {
//             toast.warning("Vui lòng nhập nội dung bình luận!");
//             return;
//         }
//         try {
//             await addComment({ movieId: Number(movieId), content: newComment });
//             await fetchComments();
//             setNewComment("");
//             toast.success("Bình luận thành công!");
//         } catch (err) {
//             toast.error("Không thể gửi bình luận!");
//             console.error(err);
//         }
//     };

//     const handleEditComment = (comment: CommentMovie) => {
//         setEditingComment(comment);
//         setNewComment(comment.content);
//     };

//     const handleUpdateComment = async () => {
//         if (!editingComment) return;
//         try {
//             await updateComment(editingComment.id, { content: newComment });
//             await fetchComments();
//             setEditingComment(null);
//             setNewComment("");
//             toast.success("Cập nhật bình luận thành công!");
//         } catch (err) {
//             toast.error("Cập nhật thất bại!");
//             console.error(err);
//         }
//     };

//     const handleDeleteComment = async (commentId: number) => {
//         try {
//             await deleteComment(commentId);
//             await fetchComments();
//             toast.success("Xóa bình luận thành công!");
//         } catch (err) {
//             toast.error("Xóa bình luận thất bại!");
//             console.error(err);
//         }
//     };

//     const handleCancelEdit = () => {
//         setEditingComment(null);
//         setNewComment("");
//     };

//     if (loading) return <div>Đang tải bình luận...</div>;

//     return (
//         <div className="comment-page">
//             <h2>Bình luận</h2>

//             {/* Danh sách bình luận */}
//             <ul className="comment-list">
//                 {comments.map(async (c) => (
//                     <li key={c.id} className="comment-item">
//                         <div className="comment-header">
//                             <div className="user-info">
//                                 <strong>{c.user?.name || "Ẩn danh"}:</strong>
//                             </div>
//                             <small className="comment-timestamp">
//                                 {new Date(c.created_at).toLocaleString()}
//                             </small>
//                         </div>
//                         <p className="comment-content">{c.content}</p>
//                         {await userId === c.user?.id && (
//                             <div className="comment-actions">
//                                 <button onClick={() => handleEditComment(c)}>
//                                     <EditIcon fontSize="small" /> Sửa
//                                 </button>
//                                 <button onClick={() => handleDeleteComment(c.id)}>
//                                     <DeleteIcon fontSize="small" /> Xóa
//                                 </button>
//                             </div>
//                         )}
//                     </li>
//                 ))}
//             </ul>

//             <div className="comment-form">
//                 <h3>{editingComment ? "Sửa bình luận" : "Thêm bình luận"}</h3>
//                 <textarea
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     placeholder="Nhập bình luận..."
//                 />
//                 <div className="comment-form-actions">
//                     {editingComment ? (
//                         <>
//                             <button onClick={handleUpdateComment}>
//                                 <SaveIcon fontSize="small" /> Lưu
//                             </button>
//                             <button onClick={handleCancelEdit}>
//                                 <CancelIcon fontSize="small" /> Hủy
//                             </button>
//                         </>
//                     ) : (
//                         <button onClick={handleAddComment}>
//                             <AddCommentIcon fontSize="small" /> Gửi bình luận
//                         </button>
//                     )}
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default CommentPage;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./CommentPage.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { CommentMovie } from "../../../../types/comment";

import {
  addComment,
  deleteComment,
  getCommentsByMovie,
  updateComment,
} from "../../../../api/commentApi";
import { useAuth } from "../../../../utils/AuthContext";

const CommentPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [comments, setComments] = useState<CommentMovie[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState<CommentMovie | null>(null);
  const [loading, setLoading] = useState(true);
  const { userInfo, isLoggedIn } = useAuth();

  /** ✅ Lấy userId từ cookie (httpOnly) */
  // useEffect(() => {
  //   const fetchUserId = async () => {
  //     try {
  //       const id = await getIdUserByServer();
  //       setUserId(id);
  //     } catch (err) {
  //       console.error("Không thể lấy userId:", err);
  //     }
  //   };
  //   fetchUserId();
  // }, []);

  /** ✅ Load comments khi đổi movie */
  useEffect(() => {
    if (!movieId) return;
    fetchComments();
  }, [movieId]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await getCommentsByMovie(Number(movieId));
      setComments(data);
    } catch (err) {
      toast.error("Không thể tải danh sách bình luận!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // const handleAddComment = async () => {
  //   if (!userId) {
  //     toast.warning("Bạn cần đăng nhập để bình luận.");
  //     return;
  //   }
  //   if (!newComment.trim()) {
  //     toast.warning("Vui lòng nhập nội dung bình luận!");
  //     return;
  //   }
  //   try {
  //     await addComment({ movieId: Number(movieId), content: newComment });
  //     await fetchComments();
  //     setNewComment("");
  //     toast.success("Bình luận thành công!");
  //   } catch (err) {
  //     toast.error("Không thể gửi bình luận!");
  //     console.error(err);
  //   }
  // };
const handleAddComment = async () => {
  if (!isLoggedIn || !userInfo?.id) {
    toast.warning("Bạn cần đăng nhập để bình luận.");
    return;
  }
  if (!newComment.trim()) {
    toast.warning("Vui lòng nhập nội dung bình luận!");
    return;
  }
  try {
    await addComment({ movieId: Number(movieId), content: newComment });
    await fetchComments();
    setNewComment("");
    toast.success("Bình luận thành công!");
  } catch (err) {
    toast.error("Không thể gửi bình luận!");
    console.error(err);
  }
};

  const handleEditComment = (comment: CommentMovie) => {
    setEditingComment(comment);
    setNewComment(comment.content);
  };

  const handleUpdateComment = async () => {
    if (!editingComment) return;
    try {
      await updateComment(editingComment.id, { content: newComment });
      await fetchComments();
      setEditingComment(null);
      setNewComment("");
      toast.success("Cập nhật bình luận thành công!");
    } catch (err) {
      toast.error("Cập nhật thất bại!");
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      await fetchComments();
      toast.success("Xóa bình luận thành công!");
    } catch (err) {
      toast.error("Xóa bình luận thất bại!");
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setNewComment("");
  };

  if (loading) return <div>Đang tải bình luận...</div>;

  return (
    <div className="comment-page">
      <h2>Bình luận</h2>

      {/* ✅ Không dùng async trong map */}
      <ul className="comment-list">
        {comments.map((c) => (
          <li key={c.id} className="comment-item">
            <div className="comment-header">
              <div className="user-info">
                <strong>{c.user?.name || "Ẩn danh"}:</strong>
              </div>
              <small className="comment-timestamp">
                {new Date(c.created_at).toLocaleString()}
              </small>
            </div>

            <p className="comment-content">{c.content}</p>

            {/* ✅ Kiểm tra userId bình thường, không await */}
            {/* {userId === c.user?.id && (
              <div className="comment-actions">
                <button onClick={() => handleEditComment(c)}>
                  <EditIcon fontSize="small" /> Sửa
                </button>
                <button onClick={() => handleDeleteComment(c.id)}>
                  <DeleteIcon fontSize="small" /> Xóa
                </button>
              </div>
            )} */}
            {userInfo?.id === c.user?.id && (
  <div className="comment-actions">
    <button onClick={() => handleEditComment(c)}>
      <EditIcon fontSize="small" /> Sửa
    </button>
    <button onClick={() => handleDeleteComment(c.id)}>
      <DeleteIcon fontSize="small" /> Xóa
    </button>
  </div>
)}

          </li>
        ))}
      </ul>

      <div className="comment-form">
        <h3>{editingComment ? "Sửa bình luận" : "Thêm bình luận"}</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Nhập bình luận..."
        />
        <div className="comment-form-actions">
          {editingComment ? (
            <>
              <button onClick={handleUpdateComment}>
                <SaveIcon fontSize="small" /> Lưu
              </button>
              <button onClick={handleCancelEdit}>
                <CancelIcon fontSize="small" /> Hủy
              </button>
            </>
          ) : (
            <button onClick={handleAddComment}>
              <AddCommentIcon fontSize="small" /> Gửi bình luận
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentPage;
