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

export function getIdUserByToken() {
   const token = localStorage.getItem('access_token');
   if (token) {
      const decodedToken = jwtDecode(token) as JwtPayload;
      return decodedToken.id;
   }
}

export function getRoleByToken() {
   const token = localStorage.getItem('access_token');
   if (token) {
      const decodedToken = jwtDecode(token) as JwtPayload;
      return decodedToken.roles;
   }
}

export function logout(navigate: any) {
   navigate("/dangnhap");
   localStorage.removeItem('access_token');
   localStorage.removeItem('refresh_token');
   localStorage.removeItem('cart');
}
