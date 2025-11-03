// import { jwtDecode } from "jwt-decode";
// import { JwtPayload } from "../admin/RequireAdmin";

// export function isTokenExpired(token: string) {
//    const decodedToken = jwtDecode(token) as { exp?: number };

//    if (!decodedToken.exp) {
//       return false; // Không có exp => coi như không hết hạn
//    }

//    const currentTime = Date.now() / 1000;
//    return currentTime > decodedToken.exp;
// }

// export function isToken() {
//    const token = localStorage.getItem('access_token');
//    return !!token;
// }

// export function isTokenValid() {
//    const token = localStorage.getItem('access_token');
//    if (!token) return false;
//    return !isTokenExpired(token);
// }

// export function getUserNameByToken() {
//    const token = localStorage.getItem('access_token');
//    if (token) {
//       const decodedToken = jwtDecode(token) as JwtPayload;
//       return decodedToken.name;
//    }
// }

// export function getSubByToken() {
//    const token = localStorage.getItem('access_token');
//    if (token) {
//       return (jwtDecode(token) as JwtPayload).sub;
//    }
// }

// export function getAvatarByToken() {
//    const token = localStorage.getItem('access_token');
//    if (token) {
//       const decodedToken = jwtDecode(token) as JwtPayload;
//       return decodedToken.avatar;
//    }
// }

// // export function getIdUserByToken() {
// //    const token = localStorage.getItem('access_token');
// //    if (token) {
// //       const decodedToken = jwtDecode(token) as JwtPayload;
// //       return decodedToken.sub;
// //    }
// // }
// export function getIdUserByToken(): number | null {
//     const token = localStorage.getItem('access_token');
//     if (!token) return null;

//     const decodedToken = jwtDecode<JwtPayload & { sub: number | string }>(token);
//     return Number(decodedToken.sub) || null;
// }


// export function getRoleByToken(): string | null {
//   const token = localStorage.getItem("access_token");
//   if (!token) return null;
//   const decodedToken = jwtDecode(token) as any;
//   // Nếu role là object
//   if (decodedToken.role && typeof decodedToken.role === "object") {
//     return decodedToken.role.name;
//   }
//   // Nếu role là string
//   if (typeof decodedToken.role === "string") {
//     return decodedToken.role;
//   }
//   // Nếu roles là mảng (trường hợp khác)
//   if (decodedToken.roles && Array.isArray(decodedToken.roles) && decodedToken.roles.length > 0) {
//     return decodedToken.roles[0].name;
//   }
//   return null;
// }
// export function logout(navigate: any) {
//    localStorage.removeItem('access_token');
//    localStorage.removeItem('refresh_token');
//    navigate("/");
// }

// import axios from "axios";
// import { NavigateFunction } from "react-router-dom";

// // ⚙️ Cấu hình axios gửi kèm cookie trong mọi request
// axios.defaults.withCredentials = true;

// const API_BASE = "http://localhost:3000";

// /**
//  * Kiểm tra nhanh phía client xem có cookie đăng nhập không
//  */
// export function hasAuthCookie(): boolean {
//   // ⚠️ Cookie HttpOnly không thể đọc từ JS — nên luôn giả định là có thể có cookie
//   return true;
// }


// export async function getProfileFromServer() {
//   if (!hasAuthCookie()) {
//     console.log("⏸️ Không có cookie -> bỏ qua gọi /auth/profile");
//     return null;
//   }

//   try {
//     const res = await axios.get(`${API_BASE}/auth/profile`, {
//       withCredentials: true,
//       validateStatus: () => true, // để tự xử lý lỗi
//     });

//     if (res.status === 401) {
//       console.log("⏸️ Server trả 401 -> chưa đăng nhập");
//       return null;
//     }

//     if (res.status === 200) {
//       console.log("📦 Profile response:", res.data);
//       return res.data;
//     }

//     console.warn("⚠️ Lỗi profile:", res.status, res.data);
//     return null;
//   } catch (err) {
//     console.warn("⚠️ Bỏ qua lỗi lấy profile:", err);
//     return null;
//   }
// }

// /**
//  * Kiểm tra xem người dùng có đăng nhập không
//  */
// export async function isAuthenticated(): Promise<boolean> {
//   const profile = await getProfileFromServer();
//   return !!profile;
// }

// /**
//  * Các hàm phụ trợ lấy thông tin user (chỉ gọi server khi có cookie)
//  */
// export async function getUserNameByServer(): Promise<string | null> {
//   const profile = await getProfileFromServer();
//   return profile?.username || profile?.name || null;
// }

// export async function getRoleByServer(): Promise<string | null> {
//   const profile = await getProfileFromServer();
//   if (!profile) return null;
//   if (Array.isArray(profile.roles)) return profile.roles[0];
//   return profile.role || null;
// }

// export async function getAvatarByServer(): Promise<string | null> {
//   const profile = await getProfileFromServer();
//   return profile?.avatar || null;
// }

// export async function getIdUserByServer(): Promise<number | null> {
//   const profile = await getProfileFromServer();
//   return profile?.id || null;
// }

// /**
//  * Đăng xuất — gọi API xóa cookie và điều hướng về trang đăng nhập
//  */
// export async function logout(navigate?: NavigateFunction) {
//   try {
//     await axios.post(`${API_BASE}/auth/logout`, {}, { withCredentials: true });
//   } catch (err) {
//     console.error("❌ Lỗi khi đăng xuất:", err);
//   }

//   if (navigate) navigate("/dangnhap");
// }

// /**
//  * Lấy thông tin cơ bản của user (username + role)
//  */
// export async function getUserInfo(): Promise<{ username: string; role: string } | null> {
//   const profile = await getProfileFromServer();
//   if (!profile) return null;
//   return {
//     username: profile.username,
//     role: Array.isArray(profile.roles) ? profile.roles[0] : profile.role,
//   };
// }









// import axios from "axios";
// import { NavigateFunction } from "react-router-dom";
// import { endpointBe } from "./contant";

// // ⚙️ Cấu hình axios gửi kèm cookie trong mọi request
// axios.defaults.withCredentials = true;



// export function hasAuthCookie(): boolean {
//   // HttpOnly cookies cannot be reliably read from JavaScript (document.cookie).
//   // If the server sets HttpOnly cookies for auth, checking document.cookie will incorrectly
//   // report "no cookie" even when the browser sends the cookie on requests.
//   //
//   // Therefore, be optimistic here and let the server decide by calling /auth/profile.
//   // Returning true causes callers to attempt a server-side profile check which will
//   // return 200 (authenticated) or 401 (not authenticated).
//   return true;
// }


// export async function getProfileFromServer() {
//   if (!hasAuthCookie()) {
//     return null;
//   }

//   try {
//     const res = await axios.get(`${endpointBe}/auth/profile`, {
//       withCredentials: true,
//       validateStatus: () => true, 
//     });

//     if (res.status === 401) {
//       return null;
//     }
//     if (res.status === 200 && res.data) {
//       return res.data;
//     }

//     console.warn("⚠️ Không lấy được profile:", res.status, res.data);
//     return null;
//   } catch (err) {
//     console.error("❌ Lỗi khi lấy profile:", err);
//     return null;
//   }
// }


// export async function isAuthenticated(): Promise<boolean> {
//   const profile = await getProfileFromServer();
//   return !!profile;
// }

// /**
//  * Các hàm phụ trợ lấy thông tin user (chỉ gọi server khi có cookie)
//  */
// export async function getUserNameByServer(): Promise<string | null> {
//   const profile = await getProfileFromServer();
//   return profile?.username || profile?.name || null;
// }

// export async function getRoleByServer(): Promise<string | null> {
//   const profile = await getProfileFromServer();
//   if (!profile) return null;
//   if (Array.isArray(profile.roles)) return profile.roles[0];
//   return profile.role || null;
// }

// export async function getAvatarByServer(): Promise<string | null> {
//   const profile = await getProfileFromServer();
//   return profile?.avatar || null;
// }

// export async function getIdUserByServer(): Promise<number | null> {
//   const profile = await getProfileFromServer();
//   return profile?.id || null;
// }

// /**
//  * Đăng xuất — gọi API xóa cookie và điều hướng về trang đăng nhập
//  */
// export async function logout(navigate?: NavigateFunction) {
//   try {
//     await axios.post(`${endpointBe}/auth/logout`, {}, { withCredentials: true });
//   } catch (err) {
//     console.error(" Lỗi khi đăng xuất:", err);
//   }

//   if (navigate) navigate("/dangnhap");
// }

// /**
//  * Lấy thông tin cơ bản của user (username + role)
//  */
// export async function getUserInfo(): Promise<{ username: string; role: string } | null> {
//   const profile = await getProfileFromServer();
//   if (!profile) return null;
//   return {
//     username: profile.username,
//     role: Array.isArray(profile.roles) ? profile.roles[0] : profile.role || "USER",
//   };
// }


import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { endpointBe } from "./contant";

// ⚙️ Cấu hình axios gửi kèm cookie trong mọi request
axios.defaults.withCredentials = true;

// 🌟 Cache profile và promise để tránh spam
let cachedProfile: any | null | undefined = undefined;
let profilePromise: Promise<any> | null = null;

/**
 * Kiểm tra cookie auth — với HttpOnly cookie, luôn optimistic
 */
export function hasAuthCookie(): boolean {
  // Nếu bạn có cookie không HttpOnly, có thể check document.cookie
  return true; 
}

/**
 * Lấy profile từ server, cache để tránh spam
 */
export async function getProfileFromServer() {
  if (cachedProfile !== undefined) {
    return cachedProfile;
  }
  if (profilePromise) {
    return profilePromise;
  }

  profilePromise = axios
    .get(`${endpointBe}/auth/profile`, {
      withCredentials: true,
      validateStatus: () => true,
    })
    .then((res) => {
      if (res.status === 200 && res.data) {
        cachedProfile = res.data;
      } else {
        cachedProfile = null;
      }
      profilePromise = null;
      return cachedProfile;
    })
    .catch((err) => {
      console.error("❌ Lỗi khi lấy profile:", err);
      cachedProfile = null;
      profilePromise = null;
      return null;
    });

  return profilePromise;
}

/**
 * Kiểm tra đã login chưa
 */
export async function isAuthenticated(): Promise<boolean> {
  const profile = await getProfileFromServer();
  return !!profile;
}

/**
 * Các hàm phụ trợ lấy thông tin user
 */
export async function getUserNameByServer(): Promise<string | null> {
  const profile = await getProfileFromServer();
  return profile?.username || profile?.name || null;
}

export async function getRoleByServer(): Promise<string | null> {
  const profile = await getProfileFromServer();
  if (!profile) return null;
  if (Array.isArray(profile.roles)) return profile.roles[0];
  return profile.role || null;
}

export async function getAvatarByServer(): Promise<string | null> {
  const profile = await getProfileFromServer();
  return profile?.avatar || null;
}

export async function getIdUserByServer(): Promise<number | null> {
  const profile = await getProfileFromServer();
  return profile?.id || null;
}

/**
 * Đăng xuất — xóa cookie và điều hướng
 */
export async function logout(navigate?: NavigateFunction) {
  try {
    await axios.post(`${endpointBe}/auth/logout`, {}, { withCredentials: true });
    cachedProfile = null; // reset cache khi logout
  } catch (err) {
    console.error("❌ Lỗi khi đăng xuất:", err);
  }

  if (navigate) navigate("/dangnhap");
}

/**
 * Lấy thông tin cơ bản của user (username + role)
 */
export async function getUserInfo(): Promise<{ username: string; role: string } | null> {
  const profile = await getProfileFromServer();
  if (!profile) return null;
  return {
    username: profile.username,
    role: Array.isArray(profile.roles) ? profile.roles[0] : profile.role || "USER",
  };
}
