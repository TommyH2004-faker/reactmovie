
import { endpointBe } from "../utils/contant";
import { my_request } from "../utils/Request";
import {CommentMovie} from "../types/comment";
import {toast} from "react-toastify";

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



// Thêm comment mới
export async function addComment(data: { movieId: number; content: string }) {
    const token = localStorage.getItem("access_token");
    if (!token) {
        toast.error("Bạn cần đăng nhập để bình luận");
        return;
    }

    const url = `${endpointBe}/comments`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error adding comment:", error);
    return null;
  }
}

// Cập nhật comment
export async function updateComment(commentId: number, data: { content: string }) {
  const url = `${endpointBe}/comments/${commentId}`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error updating comment:", error);
    return null;
  }
}

// Xóa comment
export async function deleteCommentAdmin(commentId: number) {
  const url = `${endpointBe}/comments/comment/${commentId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting comment:", error);
    return false;
  }
}

export async function deleteComment(commentId: number) {
    const url = `${endpointBe}/comments/${commentId}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        return response.ok;
    } catch (error) {
        console.error("Error deleting comment:", error);
        return false;
    }
}

export const updateCommentAdmin = async (id: number, payload: any) => {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${endpointBe}/comments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
};