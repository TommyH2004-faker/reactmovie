import React from "react";
import {useParams} from "react-router-dom";

interface HomePageProps {
    tuKhoaTimKiem: string;

}

function HomePage({tuKhoaTimKiem}: HomePageProps) {
    const {idGenre} = useParams();
    let idGenreNumber = 0;
    try {
        idGenreNumber = parseInt(idGenre + '');

    }catch (error) {
        idGenreNumber = 0;
        console.error('Error :', error);
    }
    if (Number.isNaN(idGenreNumber)) {
        idGenreNumber = 0;
    }
    const images = [
        "/images/Plastics/banner1.jpg",
        "/images/Plastics/banner2.jpg",
        "/images/Plastics/banner3.jpg",
    ];
    return (
        <div>

        </div>

    );
}
export default HomePage;