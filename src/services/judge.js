const API_BASE_URL = 'http://localhost:8080';

// Function to handle GET requests
export const getData = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const postData = async (endpoint, payload) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

export const createTrial = async (description) => {
    const payload = {
        "username1": "Plaintiff",
        "username2": "Defendant",
        description
    };
    try {
        const data = await postData('create_trial', payload);
        return data;
    } catch (error) {
        console.error('Error creating trial:', error);
        throw error;
    }
};

export const openTrialPage = (trialId, username) => {
    const url = `${API_BASE_URL}/trial?trial_id=${trialId}&username=${username}`;
    window.open(url, '_blank');
};