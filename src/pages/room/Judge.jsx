import React from 'react';
import { Avatar } from '../../components/avatar.jsx';
import judgeImage from '../../assets/people/judge.jpg';

function Judge() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <Avatar src={judgeImage} alt="AI Judge" initials="J" className="w-28 h-28 border-4 border-blue-500 shadow-lg mb-4" />
                <h1 className="text-4xl font-bold text-gray-700 mb-4">AI Judge</h1>
                <p className="text-lg text-gray-600">
                    The AI Judge is an advanced artificial intelligence designed to preside over court cases with impartiality and fairness. It analyzes evidence, listens to arguments, and makes decisions based on the law and facts presented.
                </p>
            </div>
        </div>
    );
}

export default Judge;