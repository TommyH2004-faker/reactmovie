

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { endpointBe } from "../../utils/contant";

// export default function KichHoatTaiKhoan() {
//   const { code } = useParams<{ code: string }>();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const kichHoat = async () => {
//       try {
//         const res = await axios.get(`${endpointBe}/auth/activate/${code}`);
//         console.log("Phản hồi kích hoạt:", res.data);

//         if (res.data.success) {
//           toast.success(res.data.message);
//           navigate("/dangnhap"); // điều hướng tới trang đăng nhập
//         } else {
//           toast.error(res.data.message || "Mã kích hoạt không hợp lệ hoặc đã hết hạn.");
//         }
//       } catch (error: any) {
//         console.error("Kích hoạt lỗi:", error.response?.data || error.message);
//         toast.error(error.response?.data?.message || "Kích hoạt thất bại, vui lòng thử lại.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (code) {
//       kichHoat();
//     }
//   }, [code, navigate]);

//   return (
//     <div className="flex justify-center items-center h-screen">
//       {loading ? (
//         <p className="text-lg font-medium">Đang kích hoạt tài khoản...</p>
//       ) : (
//         <p className="text-lg font-medium">Xử lý xong, vui lòng kiểm tra thông báo.</p>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { endpointBe } from "../../utils/contant";

export default function KichHoatTaiKhoan() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const calledOnce = useRef(false); // ✅ biến flag

  useEffect(() => {
    if (!code || calledOnce.current) return;
    calledOnce.current = true; // ✅ đảm bảo chỉ gọi 1 lần

    const kichHoat = async () => {
      try {
        const res = await axios.get(`${endpointBe}/auth/activate/${code}`);
        console.log("Phản hồi kích hoạt:", res.data);

        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/dangnhap");
        } else {
          toast.error(res.data.message || "Mã kích hoạt không hợp lệ hoặc đã hết hạn.");
        }
      } catch (error: any) {
        console.error("Kích hoạt lỗi:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Kích hoạt thất bại, vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    kichHoat();
  }, [code, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <p className="text-lg font-medium">Đang kích hoạt tài khoản...</p>
      ) : (
        <p className="text-lg font-medium">Xử lý xong, vui lòng kiểm tra thông báo.</p>
      )}
    </div>
  );
}
