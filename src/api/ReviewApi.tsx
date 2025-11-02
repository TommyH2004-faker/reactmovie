import { Review } from "../types/review";
import { endpointBe } from "../utils/contant";
import { my_request } from "../utils/Request";
import {Movie} from "../types/movie";


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


export async function updateReview(reviewId: number, data: { rating: number; comment: string }) {
  const res = await fetch(`${endpointBe}/reviews/${reviewId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include", // ✅
  });

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
}

export async function deleteReview(reviewId: number) {
  const res = await fetch(`${endpointBe}/reviews/${reviewId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return true;
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


export async function addReview(review: AddReviewDto): Promise<Review | null> {
  const url = `${endpointBe}/reviews`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
      credentials: "include", // ✅ Cho phép gửi cookie JWT tới backend
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

export const getReviewsByUser = async (userId: number) => {
    const res = await fetch(endpointBe+`/reviews/byUser/${userId}`);
    if (!res.ok) {
        throw new Error("Không thể tải đánh giá");
    }
    return res.json();
};





