# Hướng dẫn thêm Routes cho Authentication

## 1. Thêm routes vào App.tsx

```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './utils/useAuth';
import { Navbar } from './layout/header-footer/Navbar';
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage } from './page/auth';
import HomePage from './page/HomePage';

function App() {
    const { isLoggedIn, userInfo, logout } = useAuth();
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
    const [dangTimKiem, setDangTimKiem] = useState(false);

    return (
        <Router>
            <div className="App">
                <Navbar 
                    tuKhoaTimKiem={tuKhoaTimKiem}
                    setTuKhoaTimKiem={setTuKhoaTimKiem}
                    setDangTimKiem={setDangTimKiem}
                    isLoggedIn={isLoggedIn}
                    userInfo={userInfo}
                    onLogout={logout}
                />
                
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    
                    {/* Protected Routes */}
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    } />
                    <Route path="/favorites" element={
                        <ProtectedRoute>
                            <FavoritesPage />
                        </ProtectedRoute>
                    } />
                    
                    {/* Catch all route */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
```

## 2. Tạo ProtectedRoute component

```tsx
// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/useAuth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    
    return <>{children}</>;
};
```

## 3. API Integration trong các trang

### Backend API endpoints cần thiết:

```
POST /api/auth/login
Body: { email: string, password: string }
Response: { success: boolean, token: string, user: UserInfo, message?: string }

POST /api/auth/register  
Body: { name: string, email: string, password: string }
Response: { success: boolean, token: string, user: UserInfo, message?: string }

POST /api/auth/forgot-password
Body: { email: string }
Response: { success: boolean, message: string }

POST /api/auth/validate-reset-token
Body: { token: string }
Response: { valid: boolean }

POST /api/auth/reset-password
Body: { token: string, password: string }
Response: { success: boolean, message: string }
```

## 4. Environment Variables (.env)

```
REACT_APP_API_URL=http://localhost:8080/api
```

## 5. Mock API responses (để test)

Bạn có thể tạo mock responses trong development:

```tsx
// Mock login response
const mockLogin = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'test@example.com' && password === 'password') {
        return {
            success: true,
            token: 'mock-jwt-token',
            user: {
                id: 1,
                name: 'John Doe',
                email: 'test@example.com',
                avatar: 'https://via.placeholder.com/150'
            }
        };
    } else {
        throw new Error('Invalid credentials');
    }
};
```

## 6. Dependencies cần cài đặt

```bash
npm install react-router-dom
npm install @types/react-router-dom  # nếu dùng TypeScript
```

## 7. Features có sẵn

### ✅ Login Page:
- Form validation với email và password
- Show/hide password
- Remember me checkbox
- Social login buttons (Google, Facebook)
- Loading states và error handling

### ✅ Register Page:
- Form validation toàn diện
- Password strength requirements
- Confirm password matching
- Terms acceptance checkbox
- Social register options

### ✅ Forgot Password:
- Email validation
- Success state với instructions
- Resend email functionality

### ✅ Reset Password:
- Token validation
- Password requirements với visual feedback
- Confirm password matching
- Invalid token handling

### ✅ Responsive Design:
- Mobile-first approach
- Beautiful animations
- Dark theme phù hợp với movie website
- Professional UI/UX

## 8. Customization

Tất cả styling đều có thể customize trong `AuthPages.css`. Các màu chính:
- Primary: #ffc107 (vàng)
- Background: Dark gradients
- Success: #28a745
- Error: #dc3545
