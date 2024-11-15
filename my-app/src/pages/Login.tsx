import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './style.css';
import fizlabimage from '../images/Sign In.png';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);
        
        if (error) {
            setError(error.message);
        } else {
            window.location.href = '/home';
        }
    };

    return (
        <div className="container-auth">
            <img src={fizlabimage} alt="Fizlab" />

            <form id="login-form" className="form" onSubmit={handleLogin}>
                {error && <p className="error-text">{error}</p>}

                <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="button" disabled={loading}>
                    {loading ? 'Logging In...' : 'Log In'}
                </button>
                <p className="footer-text">
                    Don't have an account? <a href="/signin" className="link">Sign Up</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
