
// import axios from "axios";
// import { NavigateFunction } from "react-router-dom";
// import { endpointBe } from "./contant";

// axios.defaults.withCredentials = true;
// export function hasAuthCookie(): boolean {

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

// ⚙️ Cấu hình axios luôn gửi cookie
axios.defaults.withCredentials = true;

// 💡 Bộ nhớ cache tạm để tránh gọi lại liên tục
let cachedProfile: any | null = null;
let lastProfileCheckTime = 0;
const CACHE_DURATION = 10 * 1000; // cache 10 giây

/**
 * Kiểm tra nhanh phía client xem có token (localStorage) hay không
 * 👉 Nếu bạn dùng cookie HttpOnly thì chỉ trả về true, để server tự quyết định.
 */
export function hasAuthCookie(): boolean {
  // Nếu bạn vẫn dùng localStorage token thì bật dòng này:
  // return !!localStorage.getItem("access_token");

  // Nếu bạn chỉ dùng cookie HttpOnly:
  return true;
}

/**
 * ✅ Lấy thông tin profile từ server
 * - Không spam request liên tục
 * - Tự cache tạm 10 giây để UI không gọi lại
 */
export async function getProfileFromServer() {
  const now = Date.now();

  // Dùng cache tạm để tránh gọi lặp lại nhiều lần
  if (cachedProfile && now - lastProfileCheckTime < CACHE_DURATION) {
    return cachedProfile;
  }

  // Nếu không có auth cookie/token, bỏ qua luôn
  if (!hasAuthCookie()) return null;

  try {
    const res = await axios.get(`${endpointBe}/auth/profile`, {
      withCredentials: true,
      validateStatus: () => true,
    });

    if (res.status === 200 && res.data) {
      cachedProfile = res.data;
      lastProfileCheckTime = now;
      return res.data;
    }

    if (res.status === 401) {
      cachedProfile = null; // xóa cache nếu chưa login
      return null;
    }

    console.warn("⚠️ Không lấy được profile:", res.status, res.data);
    return null;
  } catch (err) {
    console.error("❌ Lỗi khi lấy profile:", err);
    return null;
  }
}

/**
 * Kiểm tra login
 */
export async function isAuthenticated(): Promise<boolean> {
  const profile = await getProfileFromServer();
  return !!profile;
}

/**
 * Các hàm phụ trợ
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
 * Đăng xuất — gọi API xóa cookie và điều hướng về trang đăng nhập
 */
export async function logout(navigate?: NavigateFunction) {
  try {
    await axios.post(`${endpointBe}/auth/logout`, {}, { withCredentials: true });
    cachedProfile = null; // xóa cache khi logout
  } catch (err) {
    console.error("❌ Lỗi khi đăng xuất:", err);
  }

  if (navigate) navigate("/dangnhap");
}

/**
 * Lấy thông tin cơ bản của user
 */
export async function getUserInfo(): Promise<{ username: string; role: string } | null> {
  const profile = await getProfileFromServer();
  if (!profile) return null;
  return {
    username: profile.username,
    role: Array.isArray(profile.roles) ? profile.roles[0] : profile.role || "USER",
  };
}
