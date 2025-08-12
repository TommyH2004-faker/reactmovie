import { Review } from "../types/review";
import { endpointBe } from "../utils/contant";
import { my_request } from "../utils/Request";

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

// Add a new review
export async function addReview(rating: number, comment: string): Promise<Review | null> {
    const url = `${endpointBe}/reviews`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ rating, comment }),
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

// Delete a review by ID
export async function deleteReview(reviewId: number): Promise<boolean> {
    const url = `${endpointBe}/reviews/${reviewId}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
        });
        return response.ok;
    } catch (error) {
        console.error("Error deleting review:", error);
        return false;
    }
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