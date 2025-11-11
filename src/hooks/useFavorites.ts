import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../utils/AuthContext';
import { endpointBe } from '../utils/contant';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';


interface UseFavoritesReturn {
  favoriteMovies: Set<number>;
  isFavorite: (movieId: number) => boolean;
  toggleFavorite: (movieId: number) => Promise<void>;
  loading: boolean;
  refreshFavorites: () => Promise<void>;
}

export const useFavorites = (): UseFavoritesReturn => {
  const { userInfo, isLoggedIn } = useAuth();
  const [favoriteMovies, setFavoriteMovies] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Fetch danh sách phim yêu thích từ server
  const refreshFavorites = useCallback(async () => {
    if (!isLoggedIn || !userInfo?.id) {
      setFavoriteMovies(new Set());
      return;
    }

    try {
      const res = await fetch(`${endpointBe}/favorites/get-favorite-movie/${userInfo.id}`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const favoriteIds: number[] = await res.json();
      
      setFavoriteMovies(new Set(favoriteIds));
    } catch (err) {
      console.error('❌ Lỗi khi lấy danh sách phim yêu thích:', err);
      setFavoriteMovies(new Set());
    }
  }, [isLoggedIn, userInfo?.id]);

  // Load favorites khi đăng nhập
  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  // Kiểm tra phim có trong danh sách yêu thích không
  const isFavorite = useCallback((movieId: number): boolean => {
    return favoriteMovies.has(movieId);
  }, [favoriteMovies]);

  // Toggle trạng thái yêu thích
//   const toggleFavorite = useCallback(async (movieId: number): Promise<void> => {
//     if (!isLoggedIn || !userInfo?.id) {
//       toast.info("Bạn phải đăng nhập để sử dụng chức năng này");
//       navigate("/dangnhap");
//       return;
//     }

//     setLoading(true);
//     const isCurrentlyFavorite = favoriteMovies.has(movieId);

//     try {
//       const url = isCurrentlyFavorite
//         ? `${endpointBe}/favorites/remove/${movieId}`
//         : `${endpointBe}/favorites/add`;

//       const response = await fetch(url, {
//         method: isCurrentlyFavorite ? "DELETE" : "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: isCurrentlyFavorite 
//           ? undefined 
//           : JSON.stringify({ userId: userInfo.id, movieId }),
//       });

//       const result = await response.json();
//       if (!response.ok) throw new Error(result?.message || "Thao tác thất bại");

//       // Cập nhật state local ngay lập tức
//       setFavoriteMovies(prev => {
//         const newSet = new Set(prev);
//         if (isCurrentlyFavorite) {
//           newSet.delete(movieId);
//         } else {
//           newSet.add(movieId);
//         }
//         return newSet;
//       });

//       toast.success(
//         isCurrentlyFavorite
//           ? "Đã xóa khỏi danh sách yêu thích"
//           : "Đã thêm vào danh sách yêu thích"
//       );
//     } catch (err: any) {
//       console.error("❌ Không thể cập nhật danh sách yêu thích:", err);
//       toast.error(err.message || "Không thể cập nhật danh sách yêu thích");
//     } finally {
//       setLoading(false);
//     }
//   }, [isLoggedIn, userInfo?.id, favoriteMovies, navigate]);
const toggleFavorite = useCallback(async (movieId: number): Promise<void> => {
  if (!isLoggedIn || !userInfo?.id) {
    toast.info("Bạn phải đăng nhập để sử dụng chức năng này");
    navigate("/dangnhap");
    return;
  }

  if (loading) return; // ✅ Chặn spam click nhanh
  setLoading(true);

  try {
    const isCurrentlyFavorite = favoriteMovies.has(movieId);
    const url = isCurrentlyFavorite
      ? `${endpointBe}/favorites/remove/${movieId}`
      : `${endpointBe}/favorites/add`;

    const options: RequestInit = {
      method: isCurrentlyFavorite ? "DELETE" : "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };

    if (!isCurrentlyFavorite) {
      options.body = JSON.stringify({ userId: userInfo.id, movieId });
    }

    const response = await fetch(url, options);
    const result = response.status !== 204 ? await response.json() : {};
    if (!response.ok) throw new Error(result?.message || "Thao tác thất bại");

    // ✅ Luôn dùng prev => để tránh closure state cũ
    setFavoriteMovies(prev => {
      const newSet = new Set(prev);
      if (isCurrentlyFavorite) newSet.delete(movieId);
      else newSet.add(movieId);
      return newSet;
    });

    toast.success(
      isCurrentlyFavorite
        ? "Đã xóa khỏi danh sách yêu thích"
        : "Đã thêm vào danh sách yêu thích"
    );
  } catch (err: any) {
    console.error("❌ Không thể cập nhật danh sách yêu thích:", err);
    toast.error(err.message || "Không thể cập nhật danh sách yêu thích");
  } finally {
    setLoading(false);
  }
}, [isLoggedIn, userInfo?.id, favoriteMovies, loading, navigate]);

  return {
    favoriteMovies,
    isFavorite,
    toggleFavorite,
    loading,
    refreshFavorites,
  };
};