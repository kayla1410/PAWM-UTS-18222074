import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import BidangMiring from './pages/Bidangmiring';
import JungkatJungkit from './pages/Jungkatjungkit';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Simulator from './pages/Simulator';
import './App.css';
import SavedProgress from './pages/Savedprogress';

function App() {
    return (
        <Router>
            <div className="main-wrapper">
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<><Sidebar /><Home /></>} />
                    <Route path="/profile" element={<><Sidebar /><Profile /></>} />
                    <Route path="/simulator" element={<><Sidebar /><Simulator /></>} />
                    <Route path="/bidangmiring" element={<><Sidebar /><BidangMiring /></>} />
                    <Route path="/jungkatjungkit" element={<><Sidebar /><JungkatJungkit /></>} />
                    <Route path="/saved" element={<><Sidebar /><SavedProgress /></>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signin" element={<Signin />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
