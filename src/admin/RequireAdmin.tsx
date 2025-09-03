import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
	sub: number;
	name: string;
	role?: { id: number; name: string };
	iat: number;
	exp: number;
	id: number;
	avatar: string;
	enabled: boolean;
}

const RequireAdmin = <P extends object>(
	WrappedComponent: React.ComponentType<P>
) => {
	const WithAdminCheck: React.FC<P> = (props) => {
		const navigate = useNavigate();

		useEffect(() => {
			const token = localStorage.getItem("access_token");

			if (!token) {
				navigate("/dangnhap");
				return;
			}

			const decodedToken = jwtDecode(token) as JwtPayload;

			// Lấy role từ decodedToken
			const role = decodedToken.role;
			if (!role || role.name !== "ADMIN") {
				navigate("/bao-loi-403");
			}
		}, [navigate]);

		return <WrappedComponent {...props} />;
	};
	return WithAdminCheck || null;
};

export default RequireAdmin;
