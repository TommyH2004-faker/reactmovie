import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByMovie } from "../../../../api/commentApi";
import { CommentMovie } from "../../../../types/comment";
import "./CommentPage.css";

const CommentPage: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [comments, setComments] = useState<CommentMovie[]>([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<number | null>(1); // giả lập user login

    useEffect(() => {
        if (!movieId) return;

        const fetchComments = async () => {
            try {
                setLoading(true);
                const data = await getCommentsByMovie(Number(movieId));
                console.log("Comments data:", data);
                setComments(data);
            } catch (err) {
                console.error("Error loading comments:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [movieId]);

    const handleAddComment = async () => {
        if (!userId) {
            alert("You must be logged in to add a comment.");
            return;
        }
        // TODO: API thêm comment
    };

    const handleDeleteComment = async (commentId: number) => {
        // TODO: API xóa comment
    };

    if (loading) return <div>Loading comments...</div>;

    return (
        <div className="comment-page">
            <h2>Comments </h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id} className="comment-item">
                        <p><strong>{comment.user?.name || "Anonymous"}:</strong> {comment.content}</p>
                        <small>{new Date(comment.created_at).toLocaleString()}</small>
                        {userId === comment.user?.id && (
                            <div className="comment-actions">
                                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <div className="add-comment">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button onClick={handleAddComment}>Submit</button>
            </div>
        </div>
    );
};

export default CommentPage;
