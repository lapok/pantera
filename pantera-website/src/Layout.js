import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';
import Footer from './footerSection';

const Layout = ({ user, onProfileClick, onAuthClick, news, showAddNewsForm, setShowAddNewsForm, handleNewsAdded }) => {
    return (
        <>
            <Navbar
                user={user}
                onProfileClick={onProfileClick}
                onAuthClick={onAuthClick}
            />
            <Outlet />
            <Footer
                news={news}
                user={user}
                showAddNewsForm={showAddNewsForm}
                setShowAddNewsForm={setShowAddNewsForm}
                handleNewsAdded={handleNewsAdded}
            />
        </>
    );
};

export default Layout;