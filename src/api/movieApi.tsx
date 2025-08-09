import { Movie } from "../types/movie";
import { my_request } from "../utils/Request";
import { endpointBe } from "../utils/contant";

interface KetQuaInterface {
    ketQua: Movie[];
    tongSoTrang: number;
    tongSoPhim: number;
}

async function layDanhSachPhim(duongDan: string): Promise<KetQuaInterface> {
    const ketQua: Movie[] = [];
    
    const response = await my_request(duongDan);
    
    // NestJS trả về array trực tiếp, không có _embedded
    const responseData = Array.isArray(response) ? response : response.data;
    
    // Giả lập pagination (có thể thêm vào NestJS sau)
    const tongSoTrang = 1; // Default nếu không có pagination
    const tongSoPhim = responseData.length;
    
    for (const item of responseData) {
        ketQua.push({
            id: item.id,
            title: item.title,
            original_title: item.original_title,
            slug: item.slug,
            description: item.description,
            release_date: item.release_date ? new Date(item.release_date) : undefined,
            duration: item.duration,
            poster_url: item.poster_url,
            banner_url: item.banner_url,
            trailer_url: item.trailer_url,
            status: item.status,
            type: item.type,
            country: item.country,
            director: item.director,
            cast: item.cast,
            rating: item.rating,
            views: item.views || 0,
            created_at: item.created_at ? new Date(item.created_at) : new Date(),
            updated_at: item.updated_at ? new Date(item.updated_at) : new Date(),
            genres: item.genres || [],
            episodes: item.episodes || [],
            comments: item.comments || [],
            reviews: item.reviews || [],
            favorites: item.favorites || []
        });
    }
    
    return { ketQua: ketQua, tongSoTrang: tongSoTrang, tongSoPhim: tongSoPhim };
}

//Lấy tất cả phim với phân trang
export async function getAllMovies(page: number, size: number): Promise<KetQuaInterface> {
    const duongDan = endpointBe + `/movies?sort=id:DESC&page=${page}&size=${size}`;
    return layDanhSachPhim(duongDan);
}

// Lấy toàn bộ phim với phân trang mặc định
export async function layToanBoPhim(trangHienTai: number): Promise<KetQuaInterface> {
    const duongDan = endpointBe + `/movies?sort=id:DESC&size=8&page=${trangHienTai}`;
    return layDanhSachPhim(duongDan);
}

// Tìm kiếm phim theo từ khóa và thể loại
export async function timKiemPhim(tuKhoaTimKiem: string, idGenre: number): Promise<KetQuaInterface> {
    let duongDan = endpointBe + "/movies";
    
    if (tuKhoaTimKiem !== '' && idGenre === 0) {
        duongDan = endpointBe + `/movies/search?title=${tuKhoaTimKiem}`;
    } else if (tuKhoaTimKiem === '' && idGenre > 0) {
        duongDan = endpointBe + `/movies/genre/${idGenre}`;
    } else if (tuKhoaTimKiem !== '' && idGenre > 0) {
        duongDan = endpointBe + `/movies/search?title=${tuKhoaTimKiem}&genreId=${idGenre}`;
    }
    
    return layDanhSachPhim(duongDan);
}

// Tìm kiếm phim nâng cao với filter
export async function searchMovies(
    idGenre?: number, 
    keySearch?: string, 
    filter?: number, 
    page?: number, 
    size?: number
): Promise<KetQuaInterface> {
    // Xử lý keySearch
    if (keySearch) {
        keySearch = keySearch.trim();
    }

    // Tạo endpoint cho NestJS
    let endpoint: string = endpointBe + `/movies`;
    const params = new URLSearchParams();

    // Thêm pagination parameters
    if (page !== undefined) params.append('page', page.toString());
    if (size !== undefined) params.append('size', size.toString());

    // Xử lý filter (sort)
    if (filter === 1) {
        params.append('sort', 'title:ASC');
    } else if (filter === 2) {
        params.append('sort', 'title:DESC');
    } else if (filter === 3) {
        params.append('sort', 'release_date:ASC');
    } else if (filter === 4) {
        params.append('sort', 'release_date:DESC');
    } else if (filter === 5) {
        params.append('sort', 'rating:DESC');
    } else if (filter === 6) {
        params.append('sort', 'views:DESC');
    } else {
        params.append('sort', 'id:DESC'); // Default sort
    }

    // Xử lý search
    if (keySearch && keySearch !== '') {
        endpoint = endpointBe + `/movies/search`;
        params.append('title', keySearch);
    }

    // Xử lý genre filter
    if (idGenre !== undefined && idGenre > 0) {
        if (keySearch && keySearch !== '') {
            // Đã có search endpoint, thêm genre param
            params.append('genreId', idGenre.toString());
        } else {
            // Chỉ filter theo genre
            endpoint = endpointBe + `/movies/genre/${idGenre}`;
        }
    }

    // Tạo URL cuối cùng
    const finalUrl = params.toString() ? `${endpoint}?${params.toString()}` : endpoint;

    return layDanhSachPhim(finalUrl);
}

// Lấy 3 phim mới nhất
export async function get3PhimMoiNhat(): Promise<KetQuaInterface> {
    const duongDan = endpointBe + "/movies?sort=id:DESC&page=0&size=3";
    return layDanhSachPhim(duongDan);
}

// Lấy phim theo ID
export async function layPhimById(idPhim: number): Promise<Movie | null> {
    const duongDan = endpointBe + `/movies/${idPhim}`;

    try {
        const response = await fetch(duongDan);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data) {
            throw new Error("Không tìm thấy phim với ID: " + idPhim);
        }

        return {
            id: data.id,
            title: data.title,
            original_title: data.original_title,
            slug: data.slug,
            description: data.description,
            release_date: data.release_date ? new Date(data.release_date) : undefined,
            duration: data.duration,
            poster_url: data.poster_url,
            banner_url: data.banner_url,
            trailer_url: data.trailer_url,
            status: data.status,
            type: data.type,
            country: data.country,
            director: data.director,
            cast: data.cast,
            rating: data.rating,
            views: data.views || 0,
            created_at: data.created_at ? new Date(data.created_at) : new Date(),
            updated_at: data.updated_at ? new Date(data.updated_at) : new Date(),
            genres: data.genres || [],
            episodes: data.episodes || [],
            comments: data.comments || [],
            reviews: data.reviews || [],
            favorites: data.favorites || []
        };

    } catch (error) {
        console.error("Lỗi khi lấy phim:", error);
        return null;
    }
}

// Lấy phim theo slug
export async function layPhimBySlug(slug: string): Promise<Movie | null> {
    const duongDan = endpointBe + `/movies/slug/${slug}`; // Thay đổi endpoint cho NestJS

    try {
        const response = await my_request(duongDan);

        // NestJS trả về object trực tiếp, không có _embedded
        if (response) {
            const data = response;
            return {
                id: data.id,
                title: data.title,
                original_title: data.original_title,
                slug: data.slug,
                description: data.description,
                release_date: data.release_date ? new Date(data.release_date) : undefined,
                duration: data.duration,
                poster_url: data.poster_url,
                banner_url: data.banner_url,
                trailer_url: data.trailer_url,
                status: data.status,
                type: data.type,
                country: data.country,
                director: data.director,
                cast: data.cast,
                rating: data.rating,
                views: data.views || 0,
                created_at: data.created_at ? new Date(data.created_at) : new Date(),
                updated_at: data.updated_at ? new Date(data.updated_at) : new Date(),
                genres: data.genres || [],
                episodes: data.episodes || [],
                comments: data.comments || [],
                reviews: data.reviews || [],
                favorites: data.favorites || []
            };
        } else {
            throw new Error("Không tìm thấy phim với slug: " + slug);
        }

    } catch (error) {
        console.error("Lỗi khi lấy phim theo slug:", error);
        return null;
    }
}

// Lấy 3 phim được xem nhiều nhất
export async function get3PhimXemNhieu(): Promise<Movie[]> {
    const endpoint = endpointBe + "/movies?sort=views:DESC&page=0&size=3";
    let movieList = await layDanhSachPhim(endpoint);

    return movieList.ketQua;
}

// Lấy phim theo thể loại
export async function layPhimTheoTheLoai(idGenre: number, page: number = 0, size: number = 8): Promise<KetQuaInterface> {
    const duongDan = endpointBe + `/movies/genre/${idGenre}?page=${page}&size=${size}`;
    return layDanhSachPhim(duongDan);
}

// Lấy phim hot (rating cao)
export async function layPhimHot(page: number = 0, size: number = 8): Promise<KetQuaInterface> {
    const duongDan = endpointBe + `/movies?sort=rating:DESC&page=${page}&size=${size}`;
    return layDanhSachPhim(duongDan);
}

// Lấy phim mới cập nhật
export async function layPhimMoiCapNhat(page: number = 0, size: number = 8): Promise<KetQuaInterface> {
    const duongDan = endpointBe + `/movies?sort=updated_at:DESC&page=${page}&size=${size}`;
    return layDanhSachPhim(duongDan);
}

// Lấy phim theo quốc gia
export async function layPhimTheoQuocGia(country: string, page: number = 0, size: number = 8): Promise<KetQuaInterface> {
    const duongDan = endpointBe + `/movies/country/${country}?page=${page}&size=${size}`;
    return layDanhSachPhim(duongDan);
}

// Lấy phim theo năm phát hành
export async function layPhimTheoNam(year: number, page: number = 0, size: number = 8): Promise<KetQuaInterface> {
    const duongDan = endpointBe + `/movies/year/${year}?page=${page}&size=${size}`;
    return layDanhSachPhim(duongDan);
}

// Lấy tổng số phim
export async function getTotalOfMovies(): Promise<number> {
    const endpoint = endpointBe + "/movies/count";
    try {
        const response = await my_request(endpoint);
        if (response) {
            return response;
        }
    } catch (error) {
        throw new Error("Lỗi không gọi được endpoint lấy tổng số phim\n" + error);
    }
    return 0;
}

// Tăng lượt xem phim
export async function tangLuotXemPhim(idPhim: number): Promise<boolean> {
    const endpoint = endpointBe + `/movies/${idPhim}/view`;
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.ok;
    } catch (error) {
        console.error("Lỗi khi tăng lượt xem:", error);
        return false;
    }
}

// Lấy phim liên quan
export async function layPhimLienQuan(idPhim: number, size: number = 6): Promise<Movie[]> {
    const endpoint = endpointBe + `/movies/${idPhim}/related?size=${size}`;
    try {
        const response = await my_request(endpoint);
        // NestJS trả về array trực tiếp
        if (Array.isArray(response)) {
            return response;
        }
        return [];
    } catch (error) {
        console.error("Lỗi khi lấy phim liên quan:", error);
        return [];
    }
}