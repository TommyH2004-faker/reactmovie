import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const RequireAdmin = <P extends object>(
	WrappedComponent: React.ComponentType<P>
) => {
	const WithAdminCheck: React.FC<P> = (props) => {
		const navigate = useNavigate();
		const { isLoggedIn, userInfo, isLoading } = useAuth();

		useEffect(() => {
			if (!isLoading) {  // Chỉ kiểm tra sau khi đã load xong
				if (!isLoggedIn || !userInfo) {
					navigate("/dangnhap");
					return;
				}

				if (userInfo.role !== "ADMIN") {
					navigate("/bao-loi-403");
					return;
				}
			}
		}, [navigate, isLoggedIn, userInfo, isLoading]);

		// Hiển thị component chỉ khi đã load xong và người dùng là admin
		if (isLoading || !isLoggedIn || !userInfo || userInfo.role !== "ADMIN") {
			return null;
		}

		return <WrappedComponent {...props} />;
	};
	return WithAdminCheck;
};

export default RequireAdmin;
