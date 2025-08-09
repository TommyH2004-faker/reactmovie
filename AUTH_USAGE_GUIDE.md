# Hướng dẫn sử dụng Authentication trong Navbar

## 1. Import useAuth hook trong App.tsx

```tsx
import { useAuth } from './utils/useAuth';
import { Navbar } from './layout/header-footer/Navbar';

function App() {
    const { isLoggedIn, userInfo, logout } = useAuth();
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
    const [dangTimKiem, setDangTimKiem] = useState(false);

    return (
        <div className="App">
            <Navbar 
                tuKhoaTimKiem={tuKhoaTimKiem}
                setTuKhoaTimKiem={setTuKhoaTimKiem}
                setDangTimKiem={setDangTimKiem}
                isLoggedIn={isLoggedIn}
                userInfo={userInfo}
                onLogout={logout}
            />
            {/* Các component khác */}
        </div>
    );
}
```

## 2. Sử dụng trong Login component

```tsx
import { useAuth } from '../utils/useAuth';

function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        try {
            // Gọi API đăng nhập
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Lưu thông tin đăng nhập
                login(data.token, data.user);
                
                // Chuyển hướng về trang chủ
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };
}
```

## 3. Cách navbar hoạt động:

### Khi chưa đăng nhập:
- Hiển thị 2 nút: "Đăng nhập" và "Đăng ký"
- Nút "Đăng nhập" dẫn đến `/login`
- Nút "Đăng ký" dẫn đến `/register`

### Khi đã đăng nhập:
- Hiển thị dropdown với tên người dùng
- Menu bao gồm:
  - Thông tin user (tên + email)
  - Hồ sơ
  - Yêu thích
  - Danh sách xem
  - Lịch sử xem
  - Cài đặt
  - Đăng xuất

## 4. Protected Routes

```tsx
import { isAuthenticated } from '../utils/useAuth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
}

// Sử dụng:
<Route path="/profile" element={
    <ProtectedRoute>
        <ProfilePage />
    </ProtectedRoute>
} />
```

## 5. API calls với token

```tsx
import { getAuthToken } from '../utils/useAuth';

const apiCall = async () => {
    const token = getAuthToken();
    
    const response = await fetch('/api/protected-endpoint', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    
    return response.json();
};
```
