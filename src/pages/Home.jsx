import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { Divider } from '../components/divider.jsx';
import Modal from '../components/Modal';

function Home() {
    const [caseBackground, setCaseBackground] = useState('');
    const [role, setRole] = useState('defender');
    const [juryCount, setJuryCount] = useState(5); // Default number of jury members
    const [document, setDocument] = useState(null);
    const [newDocument, setNewDocument] = useState(null);
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const caseNumber = Math.floor(Math.random() * 1000);
        localStorage.setItem('caseNumber', caseNumber + '/2024');
        console.log('Case Background:', caseBackground);
        console.log('Selected Role:', role);
        console.log('Number of Jury Members:', juryCount);
        console.log('Uploaded Document:', document);
        navigate('/evidence', { state: { caseBackground, juryCount, role, document } });
    };

    const handleUseDocument = () => {
        setIsDocumentModalOpen(true);
    };

    const handleFileChange = (e) => {
        setNewDocument(e.target.files[0]);
    };

    const handleDocumentSubmit = (e) => {
        e.preventDefault();
        // Handle document submission logic here
        setDocument(newDocument);
        setIsDocumentModalOpen(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold text-center mb-8">Case Background</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg w-full">
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
                        min="3"
                        max="19"
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
                <div className="mb-1">
                    <Button color="gray" className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 mb-1 cursor-pointer" onClick={handleUseDocument}>
                        {role === 'defender' ? 'Submit here the evidence to open the proceeding' : 'Submit the document the defender created against you'}
                    </Button>
                </div>
                <Divider className="my-5" />
                <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer p-3 rounded-lg text-center">
                    Start Simulation
                </Button>
            </form>

            <Modal isOpen={isDocumentModalOpen} onClose={() => setIsDocumentModalOpen(false)}>
                <h2 className="text-2xl font-semibold mb-4">{role === 'defender' ? 'Submit here the evidence to open the proceeding' : 'Submit the document the defender created against you'}</h2>
                <form onSubmit={handleDocumentSubmit}>
                    <div className="mb-4">
                        <input
                            type="file"
                            id="newDocument"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <label htmlFor="newDocument"
                               className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer p-3 rounded-lg text-center">
                            {newDocument ? newDocument.name : 'Choose a file to upload'}
                        </label>
                    </div>
                    <Divider className="my-5" />
                    <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer p-2 rounded-lg">
                        Submit
                    </Button>
                </form>
            </Modal>
        </div>
    );
}

export default Home;