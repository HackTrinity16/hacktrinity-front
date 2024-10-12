import React, { useState } from 'react';
import { Button } from '../components/button';
import { Divider } from '../components/divider';

function Witnesses() {
    const [witnesses, setWitnesses] = useState([]);
    const [newWitness, setNewWitness] = useState({ name: '', testimony: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWitness({ ...newWitness, [name]: value });
    };

    const handleAddWitness = () => {
        if (newWitness.name && newWitness.testimony) {
            setWitnesses([...witnesses, newWitness]);
            setNewWitness({ name: '', testimony: '' });
        }
    };

    const handleRemoveWitness = (index) => {
        setWitnesses(witnesses.filter((_, i) => i !== index));
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

                <Button onClick={handleAddWitness} className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer mb-4">
                    Add Witness
                </Button>

                <Divider className="my-5 mt-2" />

                <h2 className="text-2xl font-semibold mb-4">Witness List</h2>
                <ul className="list-disc pl-5 space-y-2">
                    {witnesses.map((witness, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg shadow-sm">
                            <div>
                                <strong>{witness.name}</strong>: {witness.testimony}
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