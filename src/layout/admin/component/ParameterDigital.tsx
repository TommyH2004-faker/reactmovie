import { Card, CardContent, Typography } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import MovieIcon from "@mui/icons-material/Movie";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import React from "react";

interface ParameterDigitalProps {
    numberOfAccount: number;
    numberOfMovie: number;
    numberOfGenre: number;
    numberOfComment: number;
}

export const ParameterDigital: React.FC<ParameterDigitalProps> = ({
    numberOfAccount,
    numberOfMovie,
    numberOfGenre,
    numberOfComment,
}: ParameterDigitalProps) => {
    return (
        <div className='container p-4'>
            <div className='shadow-4 rounded p-5 bg-light'>
                <div className='row'>
                    <div className='col-lg-3 col-md-6 col-sm-12 mb-3'>
                        <Card sx={{ minWidth: 200, borderRadius: 1, backgroundColor: "#1976d2a3" }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                    TỔNG SỐ TÀI KHOẢN
                                </Typography>
                                <div className='d-flex align-item-center justify-content-between'>
                                    <Typography sx={{ fontSize: 32, fontWeight: "bolder", marginTop: "10px" }} gutterBottom>
                                        {numberOfAccount.toLocaleString("vi")}
                                    </Typography>
                                    <span className='rounded-circle p-3' style={{ color: "black", fontWeight: "bold" }}>
                                        <PeopleAltOutlinedIcon fontSize='large' color='primary' />
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-12 mb-3'>
                        <Card sx={{ minWidth: 200, borderRadius: 1, backgroundColor: "#9c27b0a3" }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                    TỔNG SỐ PHIM
                                </Typography>
                                <div className='d-flex align-item-center justify-content-between'>
                                    <Typography sx={{ fontSize: 32, fontWeight: "bolder", marginTop: "10px" }} gutterBottom>
                                        {numberOfMovie}
                                    </Typography>
                                    <span className='rounded-circle p-3' style={{ color: "black", fontWeight: "bold" }}>
                                        <MovieIcon fontSize='large' color='secondary' />
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-12 mb-3'>
                        <Card sx={{ minWidth: 200, borderRadius: 1, backgroundColor: "#757575a3" }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                    TỔNG SỐ THỂ LOẠI
                                </Typography>
                                <div className='d-flex align-item-center justify-content-between'>
                                    <Typography sx={{ fontSize: 32, fontWeight: "bolder", marginTop: "10px" }} gutterBottom>
                                        {numberOfGenre}
                                    </Typography>
                                    <span className='rounded-circle p-3' style={{ color: "black", fontWeight: "bold" }}>
                                        <CategoryRoundedIcon fontSize='large' color='action' />
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-12 mb-3'>
                        <Card sx={{ minWidth: 200, borderRadius: 1, backgroundColor: "#ed6c02a1" }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                    TỔNG SỐ BÌNH LUẬN
                                </Typography>
                                <div className='d-flex align-item-center justify-content-between'>
                                    <Typography sx={{ fontSize: 32, fontWeight: "bolder", marginTop: "10px" }} gutterBottom>
                                        {numberOfComment}
                                    </Typography>
                                    <span className='rounded-circle p-3' style={{ color: "black", fontWeight: "bold" }}>
                                        <ChatOutlinedIcon fontSize='large' color='warning' />
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
