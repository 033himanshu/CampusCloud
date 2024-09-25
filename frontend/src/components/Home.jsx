import React from 'react';
import { useSelector } from 'react-redux';
import {AdminHome, StudentHome,TeacherHome} from './';

const HomeScreen = () => {
    const user = useSelector((state) => state.auth.user); // Get user from Redux store

    if (!user) {
        return <div>Loading...</div>; // Or redirect to login
    }

    // Render different components based on user role
    switch (user.role) {
        case 'admin':
            return <AdminHome />;
        case 'student':
            return <StudentHome />;
        case 'teacher':
            return <TeacherHome />;
        default:
            return <div>Access Denied</div>;
    }
};

export default HomeScreen;
