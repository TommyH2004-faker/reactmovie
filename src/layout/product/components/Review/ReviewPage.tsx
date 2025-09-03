import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getReviewsByMovie,
  addReview,
  deleteReview,
  updateReview,
} from "../../../../api/ReviewApi";
import { Review } from "../../../../types/review";
import "./ReviewPage.css";
import renderRating from "../../../../utils/SaoXepHang";
import { getIdUserByToken } from "../../../../utils/JwtService";
import { toast } from "react-toastify";

// Material UI Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCommentIcon from "@mui/icons-material/AddComment";

const ReviewPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const userId = getIdUserByToken();

  useEffect(() => {
    if (!movieId) return;
    fetchReviews();
  }, [movieId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviewsByMovie(Number(movieId));
      setReviews(data);
    } catch (err) {
      toast.error("Không thể tải danh sách đánh giá!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async () => {
    if (!userId) {
      toast.warning("Bạn cần đăng nhập để gửi đánh giá.");
      return;
    }
    if (newReview.rating === 0) {
      toast.warning("Vui lòng chọn số sao trước khi gửi!");
      return;
    }
    try {
      await addReview({
        movieId: Number(movieId),
        rating: newReview.rating,
        comment: newReview.comment,
      });
      await fetchReviews();
      setNewReview({ rating: 0, comment: "" });
      toast.success("Gửi đánh giá thành công!");
    } catch (err) {
      toast.error("Gửi đánh giá thất bại!");
      console.error(err);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteReview(reviewId);
      await fetchReviews();
      toast.success("Xóa đánh giá thành công!");
    } catch (err) {
      toast.error("Xóa đánh giá thất bại!");
      console.error(err);
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setNewReview({ rating: review.rating, comment: review.comment ?? "" });
  };

  const handleUpdateReview = async () => {
    if (!editingReview) return;
    try {
      await updateReview(editingReview.id, {
        rating: newReview.rating,
        comment: newReview.comment,
      });
      await fetchReviews();
      setEditingReview(null);
      setNewReview({ rating: 0, comment: "" });
      toast.success("Cập nhật đánh giá thành công!");
    } catch (err) {
      toast.error("Cập nhật review thất bại!");
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setNewReview({ rating: 0, comment: "" });
  };

  if (loading) return <div className="review-loading">Đang tải đánh giá...</div>;

  return (
    <div className="review-page">
      <h2>Đánh giá</h2>

      <ul className="review-list">
        {reviews.map((review) => (
          <li key={review.id} className="review-item">
            <p className="review-user">
              <strong>{review.user?.name || "Người dùng ẩn danh"}:</strong>
            </p>
            <div className="review-stars">{renderRating(review.rating)}</div>
            <p className="review-comment">{review.comment}</p>
            <small className="review-date">
              {new Date(review.created_at).toLocaleString()}
            </small>
            {userId === review.user?.id && (
              <div className="review-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleEditReview(review)}
                >
                  <EditIcon fontSize="small" /> Sửa
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  <DeleteIcon fontSize="small" /> Xóa
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Form thêm/sửa review */}
      <div className="review-form">
        <h3>{editingReview ? "Sửa đánh giá" : "Thêm đánh giá"}</h3>
        <label>Chọn số sao:</label>
        <div className="review-stars-input">
          {renderRating(newReview.rating, (value: number) =>
            setNewReview({ ...newReview, rating: value })
          )}
        </div>
        <textarea
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
          placeholder="Viết đánh giá..."
        />
        <div className="review-form-actions">
          {editingReview ? (
            <>
              <button className="btn-update" onClick={handleUpdateReview}>
                <SaveIcon fontSize="small" /> Lưu thay đổi
              </button>
              <button className="btn-cancel" onClick={handleCancelEdit}>
                <CancelIcon fontSize="small" /> Hủy
              </button>
            </>
          ) : (
            <button className="btn-add" onClick={handleAddReview}>
              <AddCommentIcon fontSize="small" /> Gửi đánh giá
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
