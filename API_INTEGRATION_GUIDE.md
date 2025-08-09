# Hướng dẫn tích hợp API cho Navbar

## 1. Tích hợp API lấy danh sách thể loại

### Bước 1: Tạo API service
Tạo file `src/services/genreService.ts`:

```typescript
import axios from 'axios';
import { Genre } from '../types/genre';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const genreService = {
  // Lấy tất cả thể loại
  getAllGenres: async (): Promise<Genre[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/genres`);
      return response.data.map((item: any) => 
        new Genre(item.id, item.name, item.slug, item.movies)
      );
    } catch (error) {
      console.error('Lỗi khi lấy danh sách thể loại:', error);
      throw error;
    }
  }
};
```

### Bước 2: Cập nhật Navbar component
Trong file `Navbar.tsx`, thay thế phần mock data bằng:

```typescript
// Import service
import { genreService } from '../../services/genreService';

// Trong useEffect:
useEffect(() => {
  const fetchGenres = async () => {
    setIsLoadingGenres(true);
    try {
      const genres = await genreService.getAllGenres();
      setGenreList(genres);
    } catch (error) {
      console.error('Lỗi khi tải thể loại:', error);
      // Có thể hiển thị toast notification hoặc set error state
    } finally {
      setIsLoadingGenres(false);
    }
  };

  fetchGenres();
}, []);
```

## 2. Cấu trúc API Backend cần thiết

### Endpoint: GET /api/genres
Response format:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Hành động",
      "slug": "hanh-dong",
      "movies": [] // optional
    },
    {
      "id": 2,
      "name": "Hài hước", 
      "slug": "hai-huoc",
      "movies": []
    }
  ]
}
```

## 3. Environment Variables
Tạo file `.env` trong root project:
```
REACT_APP_API_URL=http://localhost:8080/api
```

## 4. Cài đặt axios (nếu chưa có)
```bash
npm install axios
# hoặc
yarn add axios
```

## 5. Error Handling và Loading States

### Thêm error state:
```typescript
const [error, setError] = useState<string | null>(null);

// Trong try-catch:
catch (error) {
  setError('Không thể tải danh sách thể loại');
  setIsLoadingGenres(false);
}
```

### Hiển thị error trong UI:
```tsx
{error && (
  <li><span className='dropdown-item text-danger'>{error}</span></li>
)}
```

## 6. Caching và Optimization

### Sử dụng React Query (khuyến khích):
```bash
npm install @tanstack/react-query
```

```typescript
import { useQuery } from '@tanstack/react-query';

const { data: genreList, isLoading: isLoadingGenres, error } = useQuery({
  queryKey: ['genres'],
  queryFn: genreService.getAllGenres,
  staleTime: 5 * 60 * 1000, // Cache 5 phút
});
```

## 7. TypeScript Types

Đảm bảo `Genre` class trong `types/genre.ts` khớp với API response:

```typescript
export class Genre {
  id: number;
  name: string;
  slug: string;
  movies?: Movie[];

  constructor(id: number, name: string, slug: string, movies?: Movie[]) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.movies = movies;
  }
}
```
