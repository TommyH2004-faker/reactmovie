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

export async function getRoleByServer(): Promise<string | null> {
  try {
    const res = await fetch(`${endpointBe}/auth/profile`, {
      method: "GET",
      credentials: "include", // gửi cookie HTTP-only lên
    });

    if (!res.ok) return null;

    const user = await res.json();
    if (user.roles && Array.isArray(user.roles) && user.roles.length > 0) {
      // Nếu roles là mảng ['ADMIN', 'USER'] v.v.
      return typeof user.roles[0] === "string"
        ? user.roles[0]
        : user.roles[0].name || null;
    }

    return null;
  } catch (err) {
    console.error("Lỗi khi lấy role từ server:", err);
    return null;
  }
}