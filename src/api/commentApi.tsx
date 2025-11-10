
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

export async function addComment(data: { movieId: number; content: string }) {
  const url = `${endpointBe}/comments`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // 🔥 QUAN TRỌNG: gửi cookie
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error adding comment:", error);
    return null;
  }
}
export async function updateComment(commentId: number, data: { content: string }) {
  const url = `${endpointBe}/comments/${commentId}`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // 🔥 thêm dòng này
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error updating comment:", error);
    return null;
  }
}
export async function deleteComment(commentId: number) {
  const url = `${endpointBe}/comments/${commentId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      credentials: "include", // 🔥 thêm dòng này
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting comment:", error);
    return false;
  }
}
