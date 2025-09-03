import { isTokenExpired } from "./JwtService";

export async function my_request(duongdan: string) {
    // truy cap duong dan
    const response = await fetch(duongdan);
    // neu tra ve loi
    if (!response.ok) {
        throw new Error("Không thể truy cập đường dẫn");
    }
    // neu tra ve ok
    return response.json();
}
export async function requestAdmin(endpoint: string) {
    const token = localStorage.getItem("access_token");

    if (!token) {
        return;
    }
    if (!isTokenExpired(token)) {
        return;
    }
    // Truy cập đến đường dẫn
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    // Thất bại
    if (!response.ok) {
        throw new Error(`Không thể truy cập ${endpoint}`);
    }

    // Thành công
    return response.json();
}
