import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
	sub: number;
	name: string;
	roles: string;
	iat: number;
	exp: number;
	id: number;
	avatar: string;
}

const RequireAdmin = <P extends object>(
	WrappedComponent: React.ComponentType<P>
) => {
	const WithAdminCheck: React.FC<P> = (props) => {
		const navigate = useNavigate();

		useEffect(() => {
			const token = localStorage.getItem("token");

			if (!token) {
				navigate("/dangnhap");
				return;
			}

			const decodedToken = jwtDecode(token) as JwtPayload;

			// Lấy role từ decodedToken
			const roles = decodedToken.roles;

			if (!roles.includes("ADMIN")) {
				navigate("/bao-loi-403");
			}
		}, [navigate]);

		return <WrappedComponent {...props} />;
	};
	return WithAdminCheck || null;
};

export default RequireAdmin;
