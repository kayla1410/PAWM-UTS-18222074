import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Pastikan path ke supabaseClient sesuai dengan struktur project-mu
import './style.css';
import fizlabimage from '../images/Sign In.png';

const SignIn: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Register user with email and password
        const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        console.log("User sign-up data:", data); // Debugging output

        if (signUpError) {
            setError(signUpError.message);
            console.error("Error during sign-up:", signUpError.message); // Debugging output
        } else {
            // After successful signup, insert additional user data into the 'profiles' table
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([
                    {
                        id: data.user?.id, // This is the user's unique ID from Supabase
                        username: username,
                        fullName: fullName,
                        email: email,
                    },
                ]);

            if (profileError) {
                setError(profileError.message);
                console.error("Error inserting profile data:", profileError.message); // Debugging output
            } else {
                setSuccess('Registration successful! Please check your email to verify your account.');
                // Reset form input after successful registration
                setFullName('');
                setUsername('');
                setEmail('');
                setPassword('');
                console.log("Profile data inserted successfully!"); // Debugging output
            }
        }
    };

    return (
        <div className="container-auth">
            <img src={fizlabimage} alt="Fizlab" />

            <form id="signup-form" className="form" onSubmit={handleRegister}>
                {error && <p className="error-text">{error}</p>}
                {success && <p className="success-text">{success}</p>}
                
                <input
                    type="text"
                    placeholder="Enter Your Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter Your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
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
                <button type="submit" className="button">Register</button>
                <p className="footer-text">
                    Already have an account? <a href="/login" className="link">Sign In</a>
                </p>
            </form>
        </div>
    );
};

export default SignIn;
