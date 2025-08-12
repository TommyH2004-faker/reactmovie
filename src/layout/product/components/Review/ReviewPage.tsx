import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsByMovie } from "../../../../api/ReviewApi";
import { Review } from "../../../../types/review";
import "./ReviewPage.css";
import renderRating from "../../../../utils/SaoXepHang";

const ReviewPage: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<number | null>(1); // giả lập user login

    useEffect(() => {
        if (!movieId) return;

        const fetchReviews = async () => {
            try {
                setLoading(true);
                const data = await getReviewsByMovie(Number(movieId));
                console.log("Reviews data:", data);
                setReviews(data);
            } catch (err) {
                console.error("Error loading reviews:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [movieId]);

    const handleAddReview = async () => {
        if (!userId) {
            alert("You must be logged in to add a review.");
            return;
        }
        // TODO: API thêm review
    };

    const handleDeleteReview = async (reviewId: number) => {
        // TODO: API xóa review
    };

    if (loading) return <div>Loading reviews...</div>;

    return (
        <div className="review-page">
            <h2>Reviews</h2>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id} className="review-item">
                        <p><strong>{review.user?.name || "Anonymous"}:</strong></p>
                        <div>{renderRating(review.rating)}</div> {/* ✅ hiển thị sao */}
                        <p>{review.comment}</p>
                        <small>{new Date(review.created_at).toLocaleString()}</small>
                        {userId === review.user?.id && (
                            <div className="review-actions">
                                <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <div className="add-review">
                <input
                    type="number"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: +e.target.value })}
                    placeholder="Rating (1-5)"
                    min={1}
                    max={5}
                />
                <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Add a review..."
                />
                <button onClick={handleAddReview}>Submit</button>
            </div>
        </div>
    );
};

export default ReviewPage;
