import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../admin/RequireAdmin";

export function isTokenExpired(token: string) {
   const decodedToken = jwtDecode(token) as { exp?: number };

   if (!decodedToken.exp) {
      return false; // Không có exp => coi như không hết hạn
   }

   const currentTime = Date.now() / 1000;
   return currentTime > decodedToken.exp;
}

export function isToken() {
   const token = localStorage.getItem('access_token');
   return !!token;
}

export function isTokenValid() {
   const token = localStorage.getItem('access_token');
   if (!token) return false;
   return !isTokenExpired(token);
}

export function getUserNameByToken() {
   const token = localStorage.getItem('access_token');
   if (token) {
      const decodedToken = jwtDecode(token) as JwtPayload;
      return decodedToken.name;
   }
}

export function getSubByToken() {
   const token = localStorage.getItem('access_token');
   if (token) {
      return (jwtDecode(token) as JwtPayload).sub;
   }
}

export function getAvatarByToken() {
   const token = localStorage.getItem('access_token');
   if (token) {
      const decodedToken = jwtDecode(token) as JwtPayload;
      return decodedToken.avatar;
   }
}

// export function getIdUserByToken() {
//    const token = localStorage.getItem('access_token');
//    if (token) {
//       const decodedToken = jwtDecode(token) as JwtPayload;
//       return decodedToken.sub;
//    }
// }
export function getIdUserByToken(): number | null {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    const decodedToken = jwtDecode<JwtPayload & { sub: number | string }>(token);
    return Number(decodedToken.sub) || null;
}


export function getRoleByToken(): string | null {
  const token = localStorage.getItem("access_token");
  if (!token) return null;
  const decodedToken = jwtDecode(token) as any;
  // Nếu role là object
  if (decodedToken.role && typeof decodedToken.role === "object") {
    return decodedToken.role.name;
  }
  // Nếu role là string
  if (typeof decodedToken.role === "string") {
    return decodedToken.role;
  }
  // Nếu roles là mảng (trường hợp khác)
  if (decodedToken.roles && Array.isArray(decodedToken.roles) && decodedToken.roles.length > 0) {
    return decodedToken.roles[0].name;
  }
  return null;
}
export function logout(navigate: any) {
   localStorage.removeItem('access_token');
   localStorage.removeItem('refresh_token');
   localStorage.removeItem('cart');
   navigate("/");
}
