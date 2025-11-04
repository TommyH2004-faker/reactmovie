import { endpointBe } from "../utils/contant";
import { my_request } from "../utils/Request";

// Fetch all favorite movies
export async function getFavorites(): Promise<any[]> {
    const url = `${endpointBe}/favorites`;
    try {
        const response = await my_request(url);
        return Array.isArray(response) ? response : [];
    } catch (error) {
        console.error("Error fetching favorites:", error);
        return [];
    }
}

// Add a movie to favorites
export async function addFavorite(movieId: number): Promise<any | null> {
    const url = `${endpointBe}/favorites/add`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // Gửi cookie authentication
            body: JSON.stringify({ movieId }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error adding favorite:", error);
        throw error; // Re-throw để component có thể handle
    }
}

// Remove a movie from favorites
export async function deleteFavorite(favoriteId: number): Promise<boolean> {
    const url = `${endpointBe}/favorites/${favoriteId}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include", // Gửi cookie authentication
        });
        return response.ok;
    } catch (error) {
        console.error("Error deleting favorite:", error);
        return false;
    }
}