import { DeleteOutlineOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";

import { User } from "../../../../types/user";
import { endpointBe } from "../../../../utils/contant";
import { DataTable } from "../../../../utils/DataTable";


interface UserTableProps {
    setOption: (option: string) => void;
    handleOpenModal: () => void;
    setKeyCountReload?: (key: number) => void;
    keyCountReload?: number;
    setId: (id: number) => void;
}

export const UserTable: React.FC<UserTableProps> = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<User[]>([]);
    const confirm = useConfirm();

    // Load danh sách users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${endpointBe}/users/user`);
                if (!response.ok) throw new Error('Không thể tải danh sách người dùng');
                const users = await response.json();
                setData(users);
            } catch (error) {
                toast.error("Lỗi khi tải danh sách người dùng");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [props.keyCountReload]);

    // Xử lý xóa user
    const handleDeleteUser = async (id: number) => {
        const token = localStorage.getItem("access_token");

        try {
            await confirm({
                title: "Xóa người dùng",
                description: "Bạn có chắc chắn muốn xóa người dùng này không?",
                confirmationText: "Xóa",
                cancellationText: "Hủy"
            });

            const response = await fetch(`${endpointBe}/users/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Không thể xóa người dùng");

            toast.success("Xóa người dùng thành công");
            props.setKeyCountReload?.(Math.random());

        } catch (error) {
            if (error instanceof Error) {
                toast.error("Lỗi: " + error.message);
            }
        }
    };
    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 70
    },
    { 
        field: "name", 
        headerName: "TÊN", 
        width: 200 
    },
    { 
        field: "email", 
        headerName: "EMAIL", 
        width: 250 
    },
    {
        field: "gender",
        headerName: "GIỚI TÍNH",
        width: 120,
        renderCell: (params) => {
        return params.value === "male"
            ? "Nam"
            : params.value === "female"
            ? "Nữ"
            : "Khác";
        }

    },
    {
        field: "enabled",
        headerName: "KÍCH HOẠT",
        width: 120,
        renderCell: (params) => {
            return params.value ? "Đang hoạt động" : "Bị khóa";
        }
    },
    {
        field: "actions",
        headerName: "THAO TÁC",
        width: 120,
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
                            onClick={() => handleDeleteUser(params.row.id)}
                        >
                            <DeleteOutlineOutlined />
                        </IconButton>
                    </Tooltip>
                </Box>
            );
        }
    }
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
