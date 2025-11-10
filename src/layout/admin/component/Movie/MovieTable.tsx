import { DeleteOutlineOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";

import { endpointBe } from "../../../../utils/contant";
import { Movie } from "../../../../types/movie";
import { getAllMovies } from "../../../../api/movieApi";
import { DataTable } from "../../../../utils/DataTable";
interface MovieTableProps {
    setOption: (option: string) => void;
    handleOpenModal: () => void;
    setKeyCountReload?: (key: number) => void;
    keyCountReload?: number;
    setId: (id: number) => void;
}

export const MovieTable: React.FC<MovieTableProps> = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Movie[]>([]);
    const confirm = useConfirm();

    // Lấy danh sách phim
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const movieResponse = await getAllMovies(0, 1000);
                console.log('Movie response:', movieResponse); // Thêm log để debug
                if (movieResponse && movieResponse.ketQua) {
                    setData(movieResponse.ketQua);
                } else {
                    toast.error("Dữ liệu phim không đúng định dạng");
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách phim:", error);
                toast.error("Không thể tải danh sách phim: " + (error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [props.keyCountReload]);


    const handleDeleteMovie = async (id: number) => {
  const result = await confirm({
    title: "Xóa phim",
    description: "Bạn chắc chắn muốn xóa phim này?",
    confirmationText: "Xóa",
    cancellationText: "Hủy",
  });

  if (!result.confirmed) {
    toast.info("Đã huỷ xóa phim");
    return;
  }

  try {
    const response = await fetch(`${endpointBe}/movies/${id}`, {
      method: "DELETE",
      credentials: "include", // ✅ gửi cookie HttpOnly
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Nếu chưa đăng nhập hoặc cookie hết hạn
    if (response.status === 401) {
      toast.error("Phiên đăng nhập đã hết hạn hoặc chưa đăng nhập!");
      return;
    }

    // Nếu backend trả về lỗi khác
    if (!response.ok) {
      const text = await response.text();
      console.error("Delete failed:", response.status, text);
      toast.error("Không thể xóa phim");
      return;
    }

    // ✅ Đọc phản hồi JSON từ backend
    const data = await response.json();
    toast.success(data.message || "Xóa phim thành công");

    // Reload lại bảng
    props.setKeyCountReload?.(Math.random());
  } catch (error) {
    console.error("Lỗi khi xóa phim:", error);
    toast.error("Không thể xóa phim");
  }
};

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "poster_url",
            headerName: "POSTER",
            width: 100,
            renderCell: (params) => {
                return params.value ? (
                    <img 
                        src={params.value} 
                        alt={params.row.title} 
                        style={{ 
                            width: '70px', 
                            height: '100px', 
                            objectFit: 'cover' 
                        }} 
                    />
                ) : null;
            },
        },
        { 
            field: "title", 
            headerName: "TÊN PHIM", 
            width: 250 
        },
        {
            field: "original_title",
            headerName: "TÊN GỐC",
            width: 200,
        },
   {
    field: "release_date",
    headerName: "NĂM PHÁT HÀNH",
    width: 150,
    renderCell: (params) => {
        return params.value && params.value.toString().trim() !== ""
            ? params.value.toString()
            : "Chưa cập nhật";
    },
},
        {
            field: "duration",
            headerName: "THỜI LƯỢNG",
            width: 120,
            renderCell: (params) => {
                return typeof params.value === 'number' 
                    ? `${params.value} phút` 
                    : "Chưa cập nhật";
            },
        },
        {
            field: "views",
            headerName: "LƯỢT XEM",
            width: 100,
            renderCell: (params) => {
                return typeof params.value === 'number' 
                    ? params.value.toLocaleString("vi-VN") 
                    : "0";
            },
        },
        {
            field: "action",
            headerName: "THAO TÁC",
            width: 150,
            renderCell: (params) => {
                return (
                    <Box>
                        <Tooltip title="Chỉnh sửa">
                            <IconButton
                                color="primary"
                                onClick={() => {
                                    props.setOption("update");
                                    props.setId(params.row.id);
                                    props.handleOpenModal();
                                }}
                            >
                                <EditOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <IconButton
                                color="error"
                                onClick={() => handleDeleteMovie(params.row.id)}
                            >
                                <DeleteOutlineOutlined />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            },
        },
    ];

    if (loading) {
        return (
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "400px"
            }}>
                <CircularProgress />
            </Box>
        );
    }

    return <DataTable columns={columns} rows={data} />;
};
