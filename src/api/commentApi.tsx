
import { endpointBe } from "../utils/contant";
import { my_request } from "../utils/Request";
import {CommentMovie} from "../types/comment";

// Fetch all comments
export async function getComments(): Promise<CommentMovie[]> {
    const url = `${endpointBe}/comments`;
    try {
        const response = await my_request(url);
        return Array.isArray(response) ? response : [];
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
}
export async function getCommentsByMovie(movieId: number): Promise<CommentMovie[]> {
    const url = `${endpointBe}/movies/feedback/${movieId}`;
    try {
        const response = await my_request(url);
        return Array.isArray(response?.comments) ? response.comments : [];
    } catch (error) {
        console.error("Error fetching comments by movie:", error);
        return [];
    }
}

// Add a new comment
export async function addComment(content: string): Promise<CommentMovie | null> {
    const url = `${endpointBe}/comments`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error adding comment:", error);
        return null;
    }
}

// Delete a comment by ID
export async function deleteComment(commentId: number): Promise<boolean> {
    const url = `${endpointBe}/comments/${commentId}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
        });
        return response.ok;
    } catch (error) {
        console.error("Error deleting comment:", error);
        return false;
    }
}