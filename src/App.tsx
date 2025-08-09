import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter } from 'react-router';
import Navbar from './layout/header-footer/Navbar';
import { AuthProvider } from './utils/AuthContext';
import Footer from "./layout/header-footer/Footer";



const MyRoutes = () => {
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = React.useState('');
    return (
        <div className="app-container">
            <AuthProvider>
                <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />
                <Footer/>
            </AuthProvider>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <MyRoutes />
        </BrowserRouter>
    );
}

export default App;