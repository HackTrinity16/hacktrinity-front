import React, { useState, useEffect } from 'react';
import { Button } from '../components/button';
import { Divider } from '../components/divider';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

function EvidenceLibrary() {
    const [documents, setDocuments] = useState([]);
    const [newDocument, setNewDocument] = useState(null);
    const [provider, setProvider] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchDocuments();
        socket.on('evidence_updated', fetchDocuments);
        return () => {
            socket.off('evidence_updated', fetchDocuments);
        };
    }, []);

    const fetchDocuments = async () => {
        const trial_id = localStorage.getItem('trial_id');
        const response = await fetch(`/case_library/${trial_id}`);
        const data = await response.json();
        setDocuments(data.evidence);
    };

    const handleFileChange = (e) => {
        setNewDocument(e.target.files[0]);
    };

    const handleUpload = () => {
        if (newDocument && provider) {
            setDocuments([...documents, { name: newDocument.name, provider }]);
            setNewDocument(null);
            setProvider('');
        }
    };

    const handleSubmitEvidence = () => {
        const trial_id = localStorage.getItem('trial_id');
        const username = provider === 'plaintiff' ? 'Plaintiff' : 'Defendant';
        socket.emit('submit_evidence', {
            username,
            trial_id,
            description
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center mb-4">Evidence Library</h1>
                <p className="text-center text-gray-600 mb-8">Upload and manage your case documents here.</p>

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

                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700 mb-2">Document Provided By</label>
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            id="plaintiff"
                            name="provider"
                            value="plaintiff"
                            checked={provider === 'plaintiff'}
                            onChange={(e) => setProvider(e.target.value)}
                            className="mr-2"
                        />
                        <label htmlFor="plaintiff" className="text-gray-700">Plaintiff</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="defendant"
                            name="provider"
                            value="defendant"
                            checked={provider === 'defendant'}
                            onChange={(e) => setProvider(e.target.value)}
                            className="mr-2"
                        />
                        <label htmlFor="defendant" className="text-gray-700">Defendant</label>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
                        Evidence Description
                    </label>
                    <textarea
                        id="description"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the evidence here..."
                        rows="5"
                    ></textarea>
                </div>

                <Button color='grey' onClick={handleUpload} className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer mb-4">
                    Upload Document
                </Button>

                <Button onClick={handleSubmitEvidence} className="w-full bg-green-600 text-white hover:bg-green-700 cursor-pointer mb-4">
                    Submit Evidence
                </Button>

                <Divider className="my-5 mt-2" />

                <h2 className="text-2xl font-semibold mb-4">Uploaded Documents</h2>
                <ul className="list-disc pl-5 space-y-2">
                    {documents.map((doc, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-sm">
                            <span>{doc.description} ({doc.provider})</span>
                            <Button color='red' className=" text-white hover:cursor-pointer p-1 rounded-lg">
                                Delete
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default EvidenceLibrary;