import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../admin/RequireAdmin";

export function isTokenExpired(token: string) {
   const decodedToken = jwtDecode(token);

   if (!decodedToken.exp) {
      return false;
   }

   const currentTime = Date.now() / 1000; 

   return currentTime > decodedToken.exp;
}

export function isToken() {
   const token = localStorage.getItem('token');
   if (token) {
      return true;
   }
   return false;
}

export function getUserNameByToken() {
   const token = localStorage.getItem('token');
   if (token) {
      const decodedToken = jwtDecode(token) as JwtPayload;
      return decodedToken.name;
   }
}

export function getSubByToken() {
   const token = localStorage.getItem('token');
   if (token) {
      return jwtDecode(token).sub;
   }
}
export function getAvatarByToken() {
   const token = localStorage.getItem('token');
   if(token){
      const decodedToken = jwtDecode(token) as JwtPayload;
      return decodedToken.avatar;
   }
}
export function getIdUserByToken() {
   const token = localStorage.getItem('token');
   if (token) {
      const decodedToken = jwtDecode(token) as JwtPayload;
      return decodedToken.id;
   }
}

export function getRoleByToken() {
   const token = localStorage.getItem('token');
   if (token) {
      const decodedToken = jwtDecode(token) as JwtPayload;
      return decodedToken.roles;
   }
}

export function logout(navigate: any) {
   navigate("/dangnhap");
   localStorage.removeItem('token');
   localStorage.removeItem('cart');
}