import { DeleteOutlineOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";

import { Genre } from "../../../../types/genre";
import { endpointBe } from "../../../../utils/contant";

import { getAllGenres } from "../../../../api/genreApi";
import { DataTable } from "../../../../utils/DataTable";


interface GenreTableProps {
  setOption: (option: 'add' | 'update' | 'view') => void;
  handleOpenModal: () => void;
  setId: (id: number) => void;
  setKeyCountReload?: (key: number) => void;
  keyCountReload?: number;
}

export const GenreTable: React.FC<GenreTableProps> = ({
  setOption,
  handleOpenModal,
  setId,
  setKeyCountReload,
  keyCountReload
}) => {
  const [loading, setLoading] = useState(true);
  const confirm = useConfirm();
  const [data, setData] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genres = await getAllGenres();
        setData(genres);
        setLoading(false);
      } catch (error) {
        toast.error("Lỗi khi tải danh sách thể loại");
        setLoading(false);
      }
    };
    fetchGenres();
  }, [keyCountReload]);

  // const handleDeleteGenre = async (id: number) => {
  //   const result = await confirm({
  //     title: "Xoá thể loại",
  //     description: "Bạn chắc chắn xoá thể loại này chứ?",
  //     confirmationText: "Xoá",
  //     cancellationText: "Huỷ"
  //   });

  //   if (!result.confirmed) {
  //     toast.info("Đã huỷ xoá thể loại");
  //     return;
  //   }

  //   try {
  //     const token = localStorage.getItem("access_token");
  //     if (!token) {
  //       toast.error("Bạn chưa đăng nhập!");
  //       return;
  //     }

  //     const response = await fetch(`${endpointBe}/genres/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error('Delete request failed');
  //     }

  //     toast.success("Xoá thể loại thành công");
  //     setKeyCountReload?.(Math.random());
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       toast.error("Lỗi khi xoá thể loại");
  //       console.error(error);
  //     }
  //   }
  // };
const handleDeleteGenre = async (id: number) => {
  const result = await confirm({
    title: "Xoá thể loại",
    description: "Bạn chắc chắn xoá thể loại này chứ?",
    confirmationText: "Xoá",
    cancellationText: "Huỷ"
  });

  if (!result.confirmed) {
    toast.info("Đã huỷ xoá thể loại");
    return;
  }

  try {
    const response = await fetch(`${endpointBe}/genres/${id}`, {
      method: "DELETE",
    });

    if (response.status === 401) {
      toast.error("Phiên đăng nhập đã hết hạn hoặc chưa đăng nhập!");
      return;
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Delete failed:", errorData);
      toast.error(errorData.message || "Không thể xoá thể loại");
      return;
    }

    toast.success("Xoá thể loại thành công");
    setKeyCountReload?.(Math.random());
  } catch (error) {
    console.error("Lỗi khi xoá thể loại:", error);
    toast.error("Không thể xoá thể loại");
  }
};

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "TÊN THỂ LOẠI", width: 300 },
    {
      field: "action",
      headerName: "HÀNH ĐỘNG",
      width: 300,
      type: "actions",
      renderCell: (params) => {
        return (
          <div>
            <Tooltip title="Chỉnh sửa">
              <IconButton
                color="primary"
                onClick={() => {
                  setOption("update");
                  setId(params.row.id);
                  handleOpenModal();
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xoá">
              <IconButton
                color="error"
                onClick={() => handleDeleteGenre(params.row.id)}
              >
                <DeleteOutlineOutlined />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <DataTable columns={columns} rows={data} />;
};
