import axios from 'axios';

export const getProjects = async () => {
    return axios.get('/api/projects');
};

export const addProject = (projectData) => {
    return axios.post('/api/projects', projectData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

};
