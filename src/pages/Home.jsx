import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { Divider } from '../components/divider.jsx';

function Home() {
    const [caseBackground, setCaseBackground] = useState('');
    const [role, setRole] = useState('defender');
    const [juryCount, setJuryCount] = useState(5); // Default number of jury members
    const [document, setDocument] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Case Background:', caseBackground);
        console.log('Selected Role:', role);
        console.log('Number of Jury Members:', juryCount);
        console.log('Uploaded Document:', document);
        navigate('/room');
    };

    const handleFileChange = (e) => {
        setDocument(e.target.files[0]);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold text-center mb-8">Case Background</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg min-w-[500px] min-h-[400px]">
                <div className="mb-4">
                    <label htmlFor="caseBackground" className="block text-lg font-medium text-gray-700 mb-2">
                        Background of the Case
                    </label>
                    <textarea
                        id="caseBackground"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={caseBackground}
                        onChange={(e) => setCaseBackground(e.target.value)}
                        placeholder="Describe the background of the case here..."
                        rows="5"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="juryCount" className="block text-lg font-medium text-gray-700 mb-2">
                        Number of Jury Members: {juryCount}
                    </label>
                    <input
                        id="juryCount"
                        type="range"
                        min="1"
                        max="15"
                        value={juryCount}
                        onChange={(e) => setJuryCount(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700 mb-2">Select Your Role</label>
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            id="defender"
                            name="role"
                            value="defender"
                            checked={role === 'defender'}
                            onChange={(e) => setRole(e.target.value)}
                            className="mr-2"
                        />
                        <label htmlFor="defender" className="text-gray-700">Defender</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="defendant"
                            name="role"
                            value="defendant"
                            checked={role === 'defendant'}
                            onChange={(e) => setRole(e.target.value)}
                            className="mr-2"
                        />
                        <label htmlFor="defendant" className="text-gray-700">Defendant</label>
                    </div>
                </div>
                <div className="my-5">
                    <div>
                        <input
                            type="file"
                            id="document"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <label htmlFor="document"
                               className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer p-3 rounded-lg text-center">
                            {role === 'defender' ? 'Submit evidence to open the proceeding' : 'Document the defender submitted against you'}
                        </label>
                    </div>
                </div>
                <Divider className="my-5 mt-2" />
                <Button type="submit"
                        className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer p-3 rounded-lg text-center">
                    Start Simulation
                </Button>
            </form>
        </div>
    );
}

export default Home;