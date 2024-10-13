import React, { useEffect } from 'react';
import { Button } from './button.jsx';
import {Divider} from "./divider.jsx";

function Modal({ isOpen, onClose, children }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
                {children}
                <Divider className="mt-4" />
                <Button color="gray" className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 mt-4 cursor-pointer" onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default Modal;