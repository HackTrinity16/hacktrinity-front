import React, { useState } from 'react';
import { Button } from '../components/button';
import { Divider } from '../components/divider';

function EvidenceLibrary() {
    const [documents, setDocuments] = useState([]);
    const [newDocument, setNewDocument] = useState(null);

    const handleFileChange = (e) => {
        setNewDocument(e.target.files[0]);
    };

    const handleUpload = () => {
        if (newDocument) {
            setDocuments([...documents, newDocument]);
            setNewDocument(null);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold text-center mb-8">Evidence Library</h1>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-4">
                    <input
                        type="file"
                        id="newDocument"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <label htmlFor="newDocument"
                           className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer p-3 rounded-lg text-center">
                        {newDocument ? newDocument.name : 'Upload New Document'}
                    </label>
                </div>
                <Button onClick={handleUpload} className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer mb-4">
                    Upload
                </Button>
                <Divider className="my-5 mt-2" />
                <h2 className="text-2xl font-semibold mb-4">Uploaded Documents</h2>
                <ul className="list-disc pl-5">
                    {documents.map((doc, index) => (
                        <li key={index} className="mb-2">
                            {doc.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default EvidenceLibrary;