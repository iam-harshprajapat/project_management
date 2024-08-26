import axios from 'axios';

export const getSubscribers = async () => {
    return axios.get('/api/subscribers');
};

export const addSubscriber = (subscriberData) => {
    return axios.post('/api/subscriber', subscriberData);
};
