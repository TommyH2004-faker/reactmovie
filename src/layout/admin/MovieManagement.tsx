import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

import RequireAdmin from "../../admin/RequireAdmin";
import Modal from '@mui/material/Modal';
import { MovieForm } from "./component/Movie/MovieForm";
import { MovieTable } from "./component/Movie/MovieTable";

const MovieManagementS: React.FC = () => {
    // State để reload table sau khi thực hiện các thao tác CRUD
    const [keyCountReload, setKeyCountReload] = useState(0);

    // State quản lý chế độ của form (thêm, sửa, xem)
    const [option, setOption] = useState("");
    
    // State quản lý modal
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // State lưu ID của phim đang được thao tác
    const [id, setId] = useState<number>(0);

    return (
        <div className='container p-5'>
            <div className='shadow-4-strong rounded p-5'>
                <div className='mb-3'>
                    <Button
                        variant='contained'
                        color='success'
                        onClick={() => {
                            handleOpenModal();
                            setOption("add");
                        }}
                        startIcon={<AddIcon />}
                    >
                        Thêm phim mới
                    </Button>
                </div>
                <div>
                    <MovieTable
                        keyCountReload={keyCountReload}
                        setOption={setOption}
                        setId={setId}
                        handleOpenModal={handleOpenModal}
                        setKeyCountReload={setKeyCountReload}
                    />
                </div>
            </div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="movie-modal-title"
                aria-describedby="movie-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    maxWidth: '90%',
                    maxHeight: '90vh',
                    overflowY: 'auto'
                }}>
                    <MovieForm
                        id={id}
                        handleCloseModal={handleCloseModal}
                        option={option}
                        setKeyCountReload={setKeyCountReload}
                    />
                </div>
            </Modal>
        </div>
    );
};

// Bọc component với RequireAdmin để bảo vệ route
const MovieManagementPage = RequireAdmin(MovieManagementS);
export default MovieManagementPage;
