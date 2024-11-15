import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Home.css';
import profileImage from '../images/profile.png';
import bidangMiringImage from '../images/bidangmiring.png';
import jungkatJungkitImage from '../images/jungkatjungkit.jpeg';
import Sidebar from '../components/Sidebar';

interface User {
    email?: string | null;
    // Tambahkan properti lain dari objek User jika diperlukan dan buat opsional
} 

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null); // Ubah tipe state menjadi User | null

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (!data.user) {
                navigate('/login'); // Redirect to login if not authenticated
            } else {
                setUser(data.user);
            }
        };

        checkUser();
    }, [navigate]);

    if (!user) return null; // Prevent rendering if no user is logged in

    return (
        <div className="app-container">
            <div className="main-content">
                <nav className="topbar">
                    <div className="search-container">
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="Search Simulator" 
                        />
                        <button className="search-button">
                            <img 
                                src="https://img.icons8.com/ios-glyphs/30/search--v1.png" 
                                alt="Search Icon" 
                            />
                        </button>
                    </div>
                    <a href="/profile">
                        <button className="profile-button">
                            <img src={profileImage} alt="Profile" />
                        </button>
                    </a>
                </nav>
                
                <h2>Welcome, {user?.email || 'User'}!</h2>
                <h3>Available Simulator:</h3>
                
                <div className="simulator-container">
                    <div className="simulator-card">
                        <div className="image-placeholder">
                            <img src={bidangMiringImage} alt="Hukum Newton pada Bidang Miring" />
                        </div>
                        <p>Hukum Newton pada Bidang Miring</p>
                        <a href="/bidangmiring">
                            <button>Open</button>
                        </a>
                    </div>
                    <div className="simulator-card">
                        <div className="image-placeholder">
                            <img src={jungkatJungkitImage} alt="Jungkat Jungkit Sederhana" />
                        </div>
                        <p>Jungkat Jungkit Sederhana</p>
                        <a href="/jungkatjungkit">
                            <button>Open</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
