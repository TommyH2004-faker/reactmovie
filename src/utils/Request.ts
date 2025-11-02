// import { isTokenExpired } from "./JwtService";

// export async function my_request(duongdan: string) {
//     // truy cap duong dan
//     const response = await fetch(duongdan);
//     // neu tra ve loi
//     if (!response.ok) {
//         throw new Error("Không thể truy cập đường dẫn");
//     }
//     // neu tra ve ok
//     return response.json();
// }


// export async function requestAdmin(endpoint: string) {
//     const token = localStorage.getItem("access_token");

//     if (!token) {
//         return;
//     }
//     if (!isTokenExpired(token)) {
//         return;
//     }
//     // Truy cập đến đường dẫn
//     const response = await fetch(endpoint, {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });

//     // Thất bại
//     if (!response.ok) {
//         throw new Error(`Không thể truy cập ${endpoint}`);
//     }

//     // Thành công
//     return response.json();
// }

// src/utils/my_request.ts



/**
 * Gửi request GET kèm cookie
 * @param duongdan endpoint đầy đủ (vd: `${API_BASE}/genres`)
 */
export async function my_request(duongdan: string) {
  try {
    const response = await fetch(duongdan, {
      method: "GET",
      credentials: "include", //  gửi cookie HTTP-only
    });

    if (response.status === 401) {
      // Cookie hết hạn hoặc chưa đăng nhập
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      throw new Error(`Không thể truy cập ${duongdan}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Lỗi request:", error);
    throw error;
  }
}

/**
 * Chỉ dành cho admin — tự động kiểm tra quyền bằng cookie
 * @param endpoint endpoint cần gọi
 */
export async function requestAdmin(endpoint: string) {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      credentials: "include", // gửi cookie
    });

    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    if (response.status === 403) {
      throw new Error("Forbidden - Không có quyền admin");
    }

    if (!response.ok) {
      throw new Error(`Không thể truy cập ${endpoint}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Lỗi khi gọi API admin:", error);
    throw error;
  }
}
