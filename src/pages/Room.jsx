import React from 'react';
import { Avatar } from '../components/avatar';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { Divider } from '../components/divider';
import { Heading } from '../components/heading';
import { Sidebar } from '../components/sidebar';
import { useNavigate } from 'react-router-dom';
import {Textarea} from "../components/MyTextArea.jsx";

import judgeImage from '../assets/people/judge.jpg';
import jury1Image from '../assets/people/jury1.jpg';
import jury2Image from '../assets/people/jury2.jpg';
import jury3Image from '../assets/people/jury3.jpg';
import jury4Image from '../assets/people/jury4.jpg';
import jury5Image from '../assets/people/jury5.jpg';
import opponentImage from '../assets/people/opponent.jpg';

function Room() {
    const navigate = useNavigate();
    const juryImages = [jury1Image, jury2Image, jury3Image, jury4Image, jury5Image];

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4">
            <div className="flex flex-row justify-between items-start">
                <Sidebar className="w-1/4 bg-gray-50 shadow-lg p-6 rounded-lg mr-4">
                    <h2 className="text-2xl font-semibold mb-6">Courtroom Actions</h2>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
                        placeholder="Type your text here..."
                        rows="15"
                    ></textarea>
                    <Button color="gray" className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 mb-4 cursor-pointer">Upload Document</Button>
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">Submit Defense</Button>
                    <Divider className="my-5 mt-2" />
                    <Button color="red" className="w-full cursor-pointer">Objection</Button>
                </Sidebar>

                <div className="w-1/3 p-8 bg-white rounded-lg shadow-lg">
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
                        <div className="flex justify-center space-x-6">
                            {juryImages.map((image, i) => (
                                <Avatar key={i} src={image} alt={`AI Jury Member ${i + 1}`} initials={`JY${i + 1}`}
                                        className="w-16 h-16 rounded-full shadow-sm"/>
                            ))}
                        </div>
                    </section>

                    <Divider className="border-t border-gray-200 my-4"/>

                    <section id="defendant-opponent" className="mb-4 text-center">
                        <Heading level={2} className="text-4xl font-bold text-gray-700 mb-4">Defendant and AI
                            Opponent</Heading>
                        <div className="flex justify-center space-x-12">
                            <div className="flex flex-col items-center">
                                <Avatar src="person.png" alt="Defendant" initials="P"
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

                <Sidebar className="w-2/5 bg-gray-50 shadow-lg p-6 rounded-lg ml-4">
                    <h2 className="text-2xl font-semibold mb-6">Case Transcription</h2>
                    <Textarea
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 overflow-y-auto"
                        placeholder="Transcription of the case will appear here..."
                        rows="21"
                        readOnly
                        value={`[JUDGE]: Welcome to the courtroom. The case of the People v. Smith is now in session. The defendant is charged with first...
[DEFENDER]: Your Honor, I would like to present evidence that the defendant was not present at the scene of the crime...`}
                    />
                </Sidebar>
            </div>
        </div>
    );
}

export default Room;