import { Review } from "../types/review";
import { endpointBe } from "../utils/contant";
import { my_request } from "../utils/Request";
import {Movie} from "../types/movie";

// Fetch all reviews
export async function getReviews(): Promise<Review[]> {
    const url = `${endpointBe}/reviews`;
    try {
        const response = await my_request(url);
        return Array.isArray(response) ? response : [];
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return [];
    }
}

// Xóa review
export async function deleteReview(reviewId: number) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Chưa đăng nhập!");

  const res = await fetch(`${endpointBe}/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return true;
}

// Cập nhật review
export async function updateReview(reviewId: number, data: { rating: number; comment: string }) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Chưa đăng nhập!");

  const res = await fetch(`${endpointBe}/reviews/${reviewId}`, {
    method: "PATCH", // 🔥 sửa lại từ PUT → PATCH cho khớp backend
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return await res.json();
}


export async function getReviewsByMovie(movieId: number): Promise<Review[]> {
    const url = `${endpointBe}/movies/feedback/${movieId}`;
    try {
        const response = await my_request(url);
        return Array.isArray(response?.reviews) ? response.reviews : [];
    } catch (error) {
        console.error("Error fetching reviews by movie:", error);
        return [];
    }
}

/*export async function getMovieBySlugGenre(slug: string): Promise<any> {
    const url = `${endpointBe}/genres/slug/${slug}`;
    try {
        const response = await my_request(url);
        return response;
    } catch (error) {
        console.error("Error fetching movie by slug:", error);
        return null;
    }
}*/
// ReviewApi.tsx
interface MovieApiResponse {
    id: number;
    name: string;
    slug: string;
    movies: Movie[];
    created_at: string;
    updated_at: string;
}

export async function getMovieBySlugGenre(slug: string): Promise<MovieApiResponse[]> {
    const duongDan = `${endpointBe}/genres/slug/${slug}`;
    try {
        const response = await my_request(duongDan);
        console.log('API Response:', response);
        return response;
    } catch (error) {
        console.error("Error fetching movies by genre slug:", error);
        throw error;
    }
}


interface AddReviewDto {
  movieId: number;
  rating: number;
  comment: string;
}


// Add a new review
export async function addReview(review: AddReviewDto): Promise<Review | null> {
  const url = `${endpointBe}/reviews`;
  try {
    const token = localStorage.getItem("access_token"); // nhớ dùng đúng key mà bạn lưu token

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(review), // không gửi userId ở đây
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding review:", error);
    return null;
  }
}





