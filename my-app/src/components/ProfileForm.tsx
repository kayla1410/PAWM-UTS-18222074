import React from 'react';
import '../pages/Profile.css';

const ProfileForm: React.FC = () => {

    return (
        <form className="profile-form">
            <label>Profile Name</label>

            <input type="text" placeholder="Enter profile name" />

            <label>Username</label>
            <input type="text" placeholder="Enter username" />

            <label>Email</label>
            <input type="email" placeholder="Enter email" />

            <div className="button-group">
                <button type="button" className="change-button">Change</button>
                <button type="button" className="cancel-button">Cancel</button>
            </div>
        </form>
    );
};

export default ProfileForm;
