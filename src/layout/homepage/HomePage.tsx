import React from "react";
import { useParams } from "react-router-dom";
import Carousel from "./componets/Carousel";
import PhimMoi from "../product/components/PhimMoi/PhimMoi";
import DanhSachPhim from "../product/DanhSachPhim";

interface HomePageProps {
    tuKhoaTimKiem: string;
}

function HomePage({ tuKhoaTimKiem }: HomePageProps) {
    const { idGenre } = useParams();
    let idGenreNumber = 0;
    try {
        idGenreNumber = parseInt(idGenre + '');
    } catch (error) {
        idGenreNumber = 0;
        console.error('Error :', error);
    }
    if (Number.isNaN(idGenreNumber)) {
        idGenreNumber = 0;
    }

    return (
        <div>
            <Carousel />
            <div className="container mt-4">
                <h2 className="text-center">PHIM MỚI</h2>
                <PhimMoi />
                <h2 className="text-center mt-4">PHIM THEO THỂ LOẠI</h2>
                <DanhSachPhim tuKhoaTimKiem={tuKhoaTimKiem} idGenre={idGenreNumber}/>

            </div>
        </div>
    );
}

export default HomePage;