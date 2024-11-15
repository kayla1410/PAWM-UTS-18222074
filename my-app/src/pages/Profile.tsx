import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Sidebar from '../components/Sidebar';
import ProfileForm from '../components/ProfileForm';
import profileImage from '../images/profile.png';
import './Profile.css';

interface User {
    email?: string | null;
}  

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null); 

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (!data.user) {
                navigate('/login'); 
            } else {
                setUser(data.user);
            }
        };

        checkUser();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login'); 
    };

    if (!user) return null; 

    return (
        <div className="profile-page">
            <Sidebar />
            <div className="main-content">
                <h2 className="profile-title">Profile</h2>
                
                <div className="outer-container">
                    <div className="profile-section">
                        <h3 className="profile-picture-name">Profile Picture</h3>
                        <div className="profile-picture">
                            <img src={profileImage} alt="Profile" />
                        </div>
                        <ProfileForm />
                    </div>
                
                    <p className="logout" onClick={handleLogout} style={{ cursor: 'pointer', color: 'blue' }}>
                        Log out
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
