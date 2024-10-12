import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer, NavbarDivider } from './components/navbar.jsx';
import { motion } from 'framer-motion';

function Navigation() {
    const navigate = useNavigate();

    return (
        <header className="bg-white shadow-md">
            <Navbar className="max-w-screen-lg mx-auto flex justify-between items-center p-4">
                {/* Title aligned to the left */}
                <NavbarSection className="flex items-center">
                    <button
                        onClick={() => navigate('/')}>
                        <h1 className="text-2xl font-bold text-gray-800">Atrio Causa</h1>
                    </button>
                </NavbarSection>

                {/* Navigation items aligned to the right */}
                <NavbarSection className="flex items-center gap-6">
                    <NavbarItem
                                onClick={() => navigate('/evidence')}>
                        <h2 className="text-gray-800 hover:text-blue-600 cursor-pointer">Evidence Library</h2>
                    </NavbarItem>
                    <NavbarDivider />
                    <NavbarItem href="#jury">
                        <h2 className="text-gray-800">Other</h2>
                    </NavbarItem>
                </NavbarSection>
            </Navbar>
        </header>
    );
}

export default Navigation;