import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="footer-container">
            <div className="footer-sections">
                <div className="footer-section">
                    <img
                        src="https://res.cloudinary.com/duhi7od89/image/upload/v1754714395/d15629_cjyuei.jpg"
                        alt="Logo"
                        className="footer-logo"
                    />
                    <p>© {new Date().getFullYear()} MovieSite. All rights reserved.</p>
                </div>

                <div className="footer-section">
                    <h4>Trang</h4>
                    <Link to="/">Trang chủ</Link>
                    <Link to="genre/phim-moi">Phim Mới</Link>
                    <Link to="genre/phim-bo">Phim Bộ</Link>
                    <Link to="genre/phim-le">Phim Lẻ</Link>
                </div>

                <div className="footer-section">
                    <h4>Hỗ trợ</h4>
                    <Link to="/chinh-sach">Chính sách</Link>
                    <Link to="/lien-he">Liên hệ</Link>
                    <Link to="/faq">FAQ</Link>
                </div>

                <div className="footer-section">
                    <h4>Kết nối</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            {React.createElement(FaFacebookF as any)}
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            {React.createElement(FaTwitter as any)}
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            {React.createElement(FaInstagram as any)}
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            {React.createElement(FaYoutube as any)}
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>Privacy Policy | Terms of Service</p>
            </div>
        </footer>
    );
};

export default Footer;
