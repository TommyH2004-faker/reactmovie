// import React, { createContext, useContext, useState } from "react";
// import { isToken } from "./JwtService";

// interface AuthContextProps {
// 	children: React.ReactNode;
// }

// interface AuthContextType {
// 	isLoggedIn: boolean;
// 	setLoggedIn: any;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<AuthContextProps> = (props) => {
// 	const [isLoggedIn, setLoggedIn] = useState(isToken());
// 	return (
// 		<AuthContext.Provider value={{ isLoggedIn, setLoggedIn } }>
// 			{props.children}
// 		</AuthContext.Provider>
// 	);
// };

// export const useAuth = (): AuthContextType => {
// 	const context = useContext(AuthContext);
// 	if (!context) {
// 		throw new Error("Lỗi context");
// 	}
// 	return context;
// };
// src/utils/AuthContext.tsx
// src/utils/AuthContext.tsx
// src/utils/AuthContext.tsx
// import React, { createContext, useContext, useState, useEffect } from "react";

// // 🧩 Kiểu props cho Provider
// interface AuthContextProps {
//   children: React.ReactNode;
// }

// // 🧠 Kiểu thông tin người dùng
// interface UserInfo {
//   id?: number;
//   username: string;
//   email?: string;
//   role: string;
//   avatar?: string;
// }

// // 🧱 Kiểu cho context
// interface AuthContextType {
//   isLoggedIn: boolean;
//   userInfo: UserInfo | null;
//   setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
//   setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
//   isLoading: boolean;
//   logout: () => Promise<void>;
// }

// // Tạo context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // 🧰 Hàm kiểm tra cookie (tránh gọi API thừa)
// const hasAuthCookie = (): boolean => {
//   return (
//     document.cookie.includes("Authentication=") ||
//     document.cookie.includes("access_token=")
//   );
// };

// // ✅ Provider chính
// export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
//   const [isLoggedIn, setLoggedIn] = useState(false);
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // 🧭 Hàm lấy profile từ server
//   const fetchProfile = async () => {
//     // Nếu không có cookie, bỏ qua
//     if (!hasAuthCookie()) {
//       setLoggedIn(false);
//       setUserInfo(null);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:3000/auth/profile", {
//         credentials: "include", // gửi cookie HttpOnly
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setLoggedIn(true);
//         setUserInfo({
//           id: data.id,
//           username: data.username || data.email,
//           email: data.email,
//           role: data.roles?.[0] || data.role || "USER",
//           avatar: data.avatar,
//         });
//         console.log('User info : ', userInfo);
//       } else if (res.status === 401) {
//         console.log("⚠️ Chưa đăng nhập (401)");
//         setLoggedIn(false);
//         setUserInfo(null);
//       } else {
//         console.warn(" Lỗi không xác định khi lấy profile:", res.status);
//         setLoggedIn(false);
//         setUserInfo(null);
//       }
//     } catch (err) {
//       console.error("❌ Lỗi khi gọi /auth/profile:", err);
//       setLoggedIn(false);
//       setUserInfo(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 🧩 Gọi khi app khởi động
//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   // 🚪 Hàm đăng xuất
//   const logout = async () => {
//     try {
//       await fetch("http://localhost:3000/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       });
//     } catch (err) {
//       console.error("❌ Lỗi khi logout:", err);
//     } finally {
//       setLoggedIn(false);
//       setUserInfo(null);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn,
//         userInfo,
//         setLoggedIn,
//         setUserInfo,
//         isLoading,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // 🪄 Hook dùng để truy cập AuthContext
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error(" useAuth phải được dùng trong AuthProvider");
//   }
//   return context;
// };

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { endpointBe } from "./contant";

// // 🧩 Kiểu props cho Provider
// interface AuthContextProps {
//   children: React.ReactNode;
// }

// // 🧠 Kiểu thông tin người dùng
// interface UserInfo {
//   id?: number;
//   username: string;
//   email?: string;
//   role: string;
//   avatar?: string;
// }

// // 🧱 Kiểu cho context
// interface AuthContextType {
//   isLoggedIn: boolean;
//   userInfo: UserInfo | null;
//   setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
//   setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
//   isLoading: boolean;
//   logout: () => Promise<void>;
// }

// // Tạo context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // 🧰 Hàm kiểm tra cookie (tránh gọi API thừa)
// const hasAuthCookie = (): boolean => {
//   return (
//     document.cookie.includes("Authentication=") ||
//     document.cookie.includes("access_token=")
//   );
// };

// // ✅ Provider chính
// export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
//   const [isLoggedIn, setLoggedIn] = useState(false);
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // 🧭 Hàm lấy profile từ server
//   const fetchProfile = async () => {
//     // Nếu không có cookie thì không cần gọi API
//     if (!hasAuthCookie()) {
//       setLoggedIn(false);
//       setUserInfo(null);
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch(`${endpointBe}/auth/profile`, {
//         credentials: "include",
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setLoggedIn(true);
//         setUserInfo({
//           id: data.id,
//           username: data.username || data.email,
//           email: data.email,
//           role: data.roles?.[0] || data.role || "USER",
//           avatar: data.avatar,
//         });
//       } else if (res.status === 401) {
//         // ⚠️ Không cần log mỗi lần 401 nữa
//         setLoggedIn(false);
//         setUserInfo(null);
//       } else {
//         console.warn("⚠️ Không lấy được profile:", res.status);
//         setLoggedIn(false);
//         setUserInfo(null);
//       }
//     } catch (err) {
//       console.error("❌ Lỗi khi gọi /auth/profile:", err);
//       setLoggedIn(false);
//       setUserInfo(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 🧩 Gọi khi app khởi động
//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   // 🚪 Hàm đăng xuất
//   const logout = async () => {
//     try {
//       await fetch(`${endpointBe}/auth/logout`, {
//         method: "POST",
//         credentials: "include",
//       });
//     } catch (err) {
//       console.error("❌ Lỗi khi logout:", err);
//     } finally {
//       setLoggedIn(false);
//       setUserInfo(null);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn,
//         userInfo,
//         setLoggedIn,
//         setUserInfo,
//         isLoading,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // 🪄 Hook dùng để truy cập AuthContext
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth phải được dùng trong AuthProvider");
//   }
//   return context;
// };
import React, { createContext, useContext, useState, useEffect } from "react";
import { endpointBe } from "./contant";

/** 🧩 Kiểu props cho Provider */
interface AuthContextProps {
  children: React.ReactNode;
}

/** 🧠 Kiểu thông tin người dùng */
interface UserInfo {
  id?: number;
  username: string;
  email?: string;
  role: string;
  avatar?: string;
}

/** 🧱 Kiểu cho context */
interface AuthContextType {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  isLoading: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>; // 👈 Thêm hàm để component khác có thể reload profile
}

/** 🧰 Hàm kiểm tra cookie (tránh gọi API thừa) */
const hasAuthCookie = (): boolean => {
  return (
    document.cookie.includes("Authentication=") ||
    document.cookie.includes("access_token=")
  );
};

/** 🧱 Tạo context */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** ✅ Provider chính */
export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false); // 👈 đảm bảo không fetch lặp

  /** 🧭 Hàm lấy profile từ server */
  const fetchProfile = async () => {
    if (!hasAuthCookie()) {
      setLoggedIn(false);
      setUserInfo(null);
      setIsLoading(false);
      setHasFetched(true);
      return;
    }

    try {
      const res = await fetch(`${endpointBe}/auth/profile`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setLoggedIn(true);
        setUserInfo({
          id: data.id,
          username: data.username || data.email,
          email: data.email,
          role: data.roles?.[0] || data.role || "USER",
          avatar: data.avatar,
        });
      } else if (res.status === 401) {
        setLoggedIn(false);
        setUserInfo(null);
      } else {
        console.warn("⚠️ Không lấy được profile:", res.status);
        setLoggedIn(false);
        setUserInfo(null);
      }
    } catch (err) {
      console.error("❌ Lỗi khi gọi /auth/profile:", err);
      setLoggedIn(false);
      setUserInfo(null);
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  };

  /** 🧩 Gọi khi app khởi động */
  useEffect(() => {
    if (!hasFetched) fetchProfile();
  }, [hasFetched]);

  /** 🚪 Hàm đăng xuất */
  const logout = async () => {
    try {
      await fetch(`${endpointBe}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("❌ Lỗi khi logout:", err);
    } finally {
      setLoggedIn(false);
      setUserInfo(null);
    }
  };

  /** 🔁 Cho phép component khác gọi lại nếu cần */
  const refreshProfile = async () => {
    setIsLoading(true);
    await fetchProfile();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userInfo,
        setLoggedIn,
        setUserInfo,
        isLoading,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/** 🪄 Hook dùng để truy cập AuthContext */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được dùng trong AuthProvider");
  }
  return context;
};
