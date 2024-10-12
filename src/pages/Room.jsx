import React, { useState } from 'react';
import { Avatar } from '../components/avatar';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { Divider } from '../components/divider';
import { Heading } from '../components/heading';
import { Sidebar } from '../components/sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { Textarea } from "../components/MyTextArea.jsx";
import Modal from '../components/Modal';

import judgeImage from '../assets/people/judge.jpg';
import jury1Image from '../assets/people/jury1.jpg';
import jury2Image from '../assets/people/jury2.jpg';
import jury3Image from '../assets/people/jury3.jpg';
import jury4Image from '../assets/people/jury4.jpg';
import jury5Image from '../assets/people/jury5.jpg';
import opponentImage from '../assets/people/opponent.jpg';
import personImage from '../assets/people/person.jpg';

function Room() {
    const location = useLocation();
    const navigate = useNavigate();
    const { juryCount, role } = location.state || { juryCount: 5, role: 'defender' }; // Default values

    const juryImages = [jury1Image, jury2Image, jury3Image, jury4Image, jury5Image];

    const [isWitnessModalOpen, setIsWitnessModalOpen] = useState(false);
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
    const [selectedWitness, setSelectedWitness] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null);

    const witnesses = [
        { name: 'Witness 1', testimony: 'Testimony 1' },
        { name: 'Witness 2', testimony: 'Testimony 2' },
        { name: 'Witness 3', testimony: 'Testimony 3' },
    ];

    const documents = [
        { name: 'Document 1', content: 'Content 1' },
        { name: 'Document 2', content: 'Content 2' },
        { name: 'Document 3', content: 'Content 3' },
    ];

    const handleCallWitness = () => {
        setIsWitnessModalOpen(true);
    };

    const handleSelectWitness = (witness) => {
        setSelectedWitness(witness);
        setIsWitnessModalOpen(false);
    };

    const handleUseDocument = () => {
        setIsDocumentModalOpen(true);
    };

    const handleSelectDocument = (document) => {
        setSelectedDocument(document);
        setIsDocumentModalOpen(false);
    };

    // Dynamically create jury members with different avatar sizes
    const juryMembers = Array.from({ length: juryCount }, (_, i) => {
        // Adjust avatar size based on jury count
        let avatarSize;
        if (juryCount <= 5) {
            avatarSize = "w-24 h-24"; // Larger size for fewer jurors
        } else if (juryCount <= 10) {
            avatarSize = "w-20 h-20"; // Medium size
        } else {
            avatarSize = "w-16 h-16"; // Smaller size for more jurors
        }

        return (
            <Avatar
                key={i}
                src={juryImages[i % juryImages.length]} // Use available images, cycling if necessary
                alt={`AI Jury Member ${i + 1}`}
                initials={`JY${i + 1}`}
                className={`${avatarSize} rounded-full shadow-sm`} // Apply dynamic size
            />
        );
    });

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4">
            <div className="flex flex-col lg:flex-row justify-between items-start">
                <Sidebar className="w-full lg:w-1/4 bg-gray-50 shadow-lg p-6 rounded-lg mb-4 lg:mb-0 lg:mr-4">
                    <h2 className="text-2xl font-semibold mb-6">Courtroom Actions</h2>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
                        placeholder="Type your text here..."
                        rows="15"
                    ></textarea>
                    <Button color="gray" className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 mb-4 cursor-pointer" onClick={handleUseDocument}>Use a Document</Button>
                    <Button className="w-full text-white hover: cursor-pointer">Submit Defense</Button>
                    <Divider className="my-5 mt-2" />
                    <Button color="red" className="w-full cursor-pointer">Objection</Button>
                </Sidebar>

                <div className="w-full lg:w-1/3 p-8 bg-white rounded-lg shadow-lg mb-4 lg:mb-0">
                    <section id="judge" className="mb-4 text-center">
                        <Heading level={2} className="text-4xl font-bold text-gray-700 mb-4">Judge</Heading>
                        <div className="flex items-center justify-center">
                            <div className="flex flex-col items-center" onClick={() => navigate('/room/judge')}>
                                <Avatar src={judgeImage} alt="AI Judge" initials="J"
                                        className="w-28 h-28 border-4 border-blue-500 shadow-lg cursor-pointer"/>
                                <p className="text-lg text-gray-600">Judge</p>
                            </div>
                        </div>
                    </section>

                    <Divider className="border-t border-gray-200 my-4"/>

                    <section id="jury" className="mb-4 text-center">
                        <Heading level={2} className="text-4xl font-bold text-gray-700 mb-4">Jury</Heading>
                        <div className="flex flex-wrap justify-center gap-4">
                            {juryMembers}
                        </div>
                    </section>

                    <Divider className="border-t border-gray-200 my-4"/>

                    <section id="defendant-opponent" className="mb-4 text-center">
                        <Heading level={2} className="text-4xl font-bold text-gray-700 mb-4">Litigants</Heading>
                        <div className="flex justify-center space-x-12">
                            <div className="flex flex-col items-center">
                                <Avatar src={personImage} alt="Defendant" initials="P"
                                        className="w-28 h-28 mb-4 border-4 border-green-500 shadow-lg"/>
                                <p className="text-lg text-gray-600">Defendant (You)</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Avatar src={opponentImage} alt="Defender" initials="O"
                                        className="w-28 h-28 mb-4 border-4 border-red-500 shadow-lg"/>
                                <p className="text-lg text-gray-600">Defender</p>
                            </div>
                        </div>
                    </section>
                </div>

                <Sidebar className="w-full lg:w-2/5 bg-gray-50 shadow-lg p-6 rounded-lg ml-0 lg:ml-4">
                    <h2 className="text-2xl font-semibold mb-6">Case Transcription</h2>
                    <Textarea
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 overflow-y-auto"
                        placeholder="Transcription of the case will appear here..."
                        rows="21"
                        readOnly
                        value={`[JUDGE]: Welcome to the courtroom. The case of the People v. Smith is now in session. The defendant is charged with first...
                                        [DEFENDER]: Your Honor, I would like to present evidence that the defendant was not present at the scene of the crime...
                                        [DEFENDANT]: The evidence presented by the defender is inadmissible...`}
                    />
                    <Button color="gray" className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 mb-4 cursor-pointer" onClick={handleCallWitness}>Call witness</Button>
                </Sidebar>
            </div>

            <Modal isOpen={isWitnessModalOpen} onClose={() => setIsWitnessModalOpen(false)}>
                <h2 className="text-2xl font-semibold mb-4">Select a Witness</h2>
                <ul className="list-disc pl-5 space-y-2">
                    {witnesses.map((witness, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-sm">
                            <span>{witness.name}</span>
                            <Button onClick={() => handleSelectWitness(witness)} className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer p-1 rounded-lg">
                                Select
                            </Button>
                        </li>
                    ))}
                </ul>
            </Modal>

            <Modal isOpen={isDocumentModalOpen} onClose={() => setIsDocumentModalOpen(false)}>
                <h2 className="text-2xl font-semibold mb-4">Select a Document</h2>
                <ul className="list-disc pl-5 space-y-2">
                    {documents.map((document, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-sm">
                            <span>{document.name}</span>
                            <Button onClick={() => handleSelectDocument(document)} className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer p-1 rounded-lg">
                                Select
                            </Button>
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
}

export default Room;