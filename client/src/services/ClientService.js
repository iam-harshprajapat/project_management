import axios from 'axios';

export const getClients = async () => {
    return axios.get('/api/clients');
};

export const addClient = (clientData) => {
    return axios.post('/api/clients', clientData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
