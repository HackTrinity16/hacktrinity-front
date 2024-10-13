import React, { useState } from 'react';
import { Button } from '../components/button';
import { Divider } from '../components/divider';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

function Witnesses() {
    const [witnesses, setWitnesses] = useState([]);
    const [newWitness, setNewWitness] = useState({ name: '', testimony: '', party: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWitness({ ...newWitness, [name]: value });
    };

    const handleAddWitness = () => {
        if (newWitness.name && newWitness.testimony && newWitness.party) {
            setWitnesses([...witnesses, newWitness]);
            setNewWitness({ name: '', testimony: '', party: '' });
        }
    };

    const handleSubmitWitness = () => {
        const witness_name = prompt("Enter witness name:");
        const username = 'your_username'; // Replace with actual username
        const trial_id = 'your_trial_id'; // Replace with actual trial ID
        socket.emit('submit_action', {
            username,
            trial_id,
            action_type: 'call_witness',
            witness_name
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center mb-4">Manage Witnesses</h1>
                <p className="text-center text-gray-600 mb-8">Add and manage your witnesses here.</p>

                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700 mb-2">Witness Name</label>
                    <input
                        type="text"
                        name="name"
                        value={newWitness.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700 mb-2">Testimony</label>
                    <textarea
                        name="testimony"
                        value={newWitness.testimony}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        rows="4"
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700 mb-2">Witness For</label>
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            id="plaintiff"
                            name="party"
                            value="plaintiff"
                            checked={newWitness.party === 'plaintiff'}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        <label htmlFor="plaintiff" className="text-gray-700">Plaintiff/Claimant</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="defendant"
                            name="party"
                            value="defendant"
                            checked={newWitness.party === 'defendant'}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        <label htmlFor="defendant" className="text-gray-700">Defendant</label>
                    </div>
                </div>

                <Button onClick={handleAddWitness} className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer mb-4">
                    Add Witness
                </Button>

                <Button onClick={handleSubmitWitness} className="w-full bg-green-600 text-white hover:bg-green-700 cursor-pointer mb-4">
                    Submit Witness
                </Button>

                <Divider className="my-5 mt-2" />

                <h2 className="text-2xl font-semibold mb-4">Witness List</h2>
                <ul className="list-disc pl-5 space-y-2">
                    {witnesses.map((witness, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-sm">
                            <div>
                                <strong>{witness.name}</strong>: {witness.testimony} ({witness.party})
                            </div>
                            <Button color='red' onClick={() => handleRemoveWitness(index)} className="text-white hover: cursor-pointer p-1 rounded-lg">
                                Remove
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Witnesses;