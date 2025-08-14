import { endpointBe } from "../utils/contant";

export async function getProfile(): Promise<any> {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No access token found");

    const res = await fetch(`${endpointBe}/auth/profile`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch profile");
    }

    return await res.json();
}
