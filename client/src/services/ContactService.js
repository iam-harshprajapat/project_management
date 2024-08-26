import axios from 'axios';

export const getContacts = async () => {
    return axios.get('/api/contacts');
};

export const addContact = async (contactData) => {
    try {

        return await axios.post('/api/contacts', contactData);
    }
    catch (error) {
        throw error;
    }
};
