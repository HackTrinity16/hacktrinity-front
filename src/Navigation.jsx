import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, NavbarItem, NavbarSection, NavbarDivider } from './components/navbar.jsx';

function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [caseNumber, setCaseNumber] = useState(null);

    useEffect(() => {
        const storedCaseNumber = localStorage.getItem('caseNumber');
        console.log('Retrieved case number from localStorage:', storedCaseNumber); // Debug log
        if (storedCaseNumber) {
            setCaseNumber(storedCaseNumber);
        }
    }, [location]);

    return (
        <header className="bg-white shadow-md">
            <Navbar className="max-w-screen-lg mx-auto flex justify-between items-center p-4">
                {/* Title aligned to the left */}
                <NavbarSection className="flex items-center">
                    <button onClick={() => navigate('/')}>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Atrio Causa
                        </h1>
                    </button>
                    {caseNumber && (
                        <button onClick={() => navigate('/room')}>
                            <h2 className="text-gray-500 ml-4">Case: {caseNumber}</h2>
                        </button>
                    )}
                </NavbarSection>

                {/* Navigation items aligned to the right */}
                <NavbarSection className="flex items-center gap-6">
                    <NavbarItem onClick={() => navigate('/evidence')}>
                        <h2 className="text-gray-800 hover:text-blue-600 cursor-pointer">Evidence Library</h2>
                    </NavbarItem>
                    <NavbarDivider />
                    <NavbarItem onClick={() => navigate('/witnesses')}>
                        <h2 className="text-gray-800 hover:text-blue-600 cursor-pointer">Witnesses</h2>
                    </NavbarItem>
                </NavbarSection>
            </Navbar>
        </header>
    );
}

export default Navigation;