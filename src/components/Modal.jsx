import React, { useEffect } from 'react';
import {Button} from "./button.jsx";

function Modal({ isOpen, onClose, children }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
                {children}
                <Button
                    color='gray'
                    onClick={onClose}
                    className="mt-4 w-full bg-gray-200 text-gray-800 hover:bg-gray-300 p-2 rounded-lg cursor-pointer">
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default Modal;