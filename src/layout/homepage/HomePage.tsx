
import React from "react";
import { useParams } from "react-router-dom";
import Carousel from "./componets/Carousel";
import DanhSachPhim from "../product/DanhSachPhim";
import PhimTopView from "../product/components/TopViewPhim/PhimTopView";
import PhimTheoSlug from "../product/components/PhimTheoSlug";
import WhatshotIcon from "@mui/icons-material/Whatshot";

interface HomePageProps {
  tuKhoaTimKiem: string;
}

function HomePage({ tuKhoaTimKiem }: HomePageProps) {
  const { idGenre } = useParams();
  let idGenreNumber = 0;
  try {
    idGenreNumber = parseInt(idGenre + "");
  } catch (error) {
    idGenreNumber = 0;
    console.error("Error :", error);
  }
  if (Number.isNaN(idGenreNumber)) {
    idGenreNumber = 0;
  }

  return (
    <main>
      {/* Carousel riêng */}
      <section>
        <Carousel />
      </section>

      {/* Container chính */}
      <section className="container mt-4">
        <div className="row">
          {/* Cột bên trái - Nội dung chính */}
          <div className="col-md-8">
            <h2 className="text-center">DANH SÁCH PHIM</h2>
            <DanhSachPhim
              tuKhoaTimKiem={tuKhoaTimKiem}
              idGenre={idGenreNumber}
            />

            <h2 className="text-center mt-4">PHIM </h2>
              {/* Preview phim mới dựa theo slug */}
            <PhimTheoSlug slug="phim-moi" title="Phim Mới" limit={4} />
            <PhimTheoSlug slug="phim-le" title="Phim Lẻ" limit={4} />
            <PhimTheoSlug slug="phim-bo" title="Phim Bộ" limit={4} />
            <PhimTheoSlug slug="phim-tron-bo" title="Phim Trọn Bộ" limit={4} />
            <PhimTheoSlug slug="phim-chieu-rap" title="Phim Chiếu Rạp" limit={4} />

            {/* Sau này bạn có thể thêm: Phim chiếu rạp, Phim hot,... */}
            {/* <PhimChieuRap /> */}
          </div>

          {/* Cột bên phải - Sidebar */}
          <div className="col-md-4">
            <h2 className="text-center"><WhatshotIcon style={{ color: "#ff5722" }} />Top View</h2>
            <PhimTopView />
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
