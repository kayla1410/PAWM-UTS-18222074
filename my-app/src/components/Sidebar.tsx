import React from 'react';
import './Sidebar.css';
import fizlabimage from '../images/Sign In.png';

function Sidebar() {
    return (
        <div className="container">
            <aside className="sidebar">
                <img src={fizlabimage} alt="Fizlab" />
                <nav>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/profile">Profil</a></li>
                        <li><a href="/simulator">Simulator</a></li>
                        <ul className="submenu">
                            <li><a href="/bidangmiring">Hukum Newton pada Bidang Miring</a></li>
                            <li><a href="/jungkatjungkit">Jungkat Jungkit Sederhana</a></li>
                        </ul>
                        <li><a href="/saved">Save Progress</a></li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;
