import React, { useState, useEffect } from 'react';
import { addProject, getProjects } from '../services/ProjectService';
import { addClient, getClients } from '../services/ClientService';
import { getContacts } from '../services/ContactService';
import { getSubscribers } from '../services/SubscribeService';

function AdminPanel() {
    // States for Project Management
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectImage, setProjectImage] = useState(null);
    const [projects, setProjects] = useState([]);

    // States for Client Management
    const [clientName, setClientName] = useState('');
    const [clientDescription, setClientDescription] = useState('');
    const [clientDesignation, setClientDesignation] = useState('');
    const [clientImage, setClientImage] = useState(null);
    const [clients, setClients] = useState([]);

    // States for Contact Form Details
    const [contacts, setContacts] = useState([]);

    // States for Subscribed Emails
    const [subscriber, setSubscriber] = useState([]);

    // State for popup visibility
    const [showPopup, setShowPopup] = useState(false);

    // Fetching data when component loads
    useEffect(() => {
        fetchProjects();
        fetchClients();
        fetchContacts();
        fetchSubscriber();
    }, []);

    const fetchProjects = async () => {
        const response = await getProjects();
        setProjects(response.data.projects || []);
    };

    const fetchClients = async () => {
        const response = await getClients();
        setClients(response.data.clients || []);
    };

    const fetchContacts = async () => {
        const response = await getContacts();
        setContacts(response.data.contacts || []);
    };

    const fetchSubscriber = async () => {
        const response = await getSubscribers();
        setSubscriber(response.data.emails || []);
    };

    // Handle Project Form Submission
    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', projectName);
        formData.append('description', projectDescription);
        formData.append('image', projectImage);

        await addProject(formData);
        fetchProjects();

        // Show popup
        setShowPopup(true);

        // Clear form fields
        setProjectName('');
        setProjectDescription('');
        setProjectImage(null);
    };

    // Handle Client Form Submission
    const handleClientSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', clientName);
        formData.append('description', clientDescription);
        formData.append('designation', clientDesignation);
        formData.append('image', clientImage);

        try {
            await addClient(formData);
            fetchClients(); // Refresh the client list after adding a new client

            // Show popup
            setShowPopup(true);

            // Clear form fields
            setClientName('');
            setClientDescription('');
            setClientDesignation('');
            setClientImage(null);
        } catch (error) {
            console.error('Error adding client:', error.response?.data || error.message);
            alert(`Error adding client: ${error.response?.data?.message || error.message}`);
        }
    };

    // Popup Component
    const Popup = ({ message, onClose }) => (
        <div className="popup">
            <div className="popup-content">
                <h3>{message}</h3>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );

    return (
        <>
            <section className='admin-section'>
                <h1>Admin Panel</h1>

                {/* Popup for success message */}
                {showPopup && <Popup message="Successfully added!" onClose={() => setShowPopup(false)} />}

                {/* Project Management */}
                <section className='admin-section-1'>
                    <h2>Project Management</h2>
                    <form onSubmit={handleProjectSubmit} className='project-form'>
                        <input
                            type="text"
                            placeholder="Project Name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Project Description"
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            required
                        />
                        <input
                            type="file"
                            onChange={(e) => setProjectImage(e.target.files[0])}
                            required
                        />
                        <button type="submit">Add Project</button>
                    </form>
                    <div className='a-display-project'>
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <div key={project._id} className='a-p-row'>
                                    <h5>{project.name}</h5>
                                    <h5>{project.description}</h5>
                                </div>
                            ))
                        ) : (
                            <p>No projects available</p>
                        )}
                    </div>
                </section>

                {/* Client Management */}
                <section className='admin-client-section'>
                    <h2>Client Management</h2>
                    <form onSubmit={handleClientSubmit} className='client-form'>
                        <input
                            type="text"
                            placeholder="Client Name"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Client Description"
                            value={clientDescription}
                            onChange={(e) => setClientDescription(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Client Designation"
                            value={clientDesignation}
                            onChange={(e) => setClientDesignation(e.target.value)}
                            required
                        />
                        <input
                            type="file"
                            onChange={(e) => setClientImage(e.target.files[0])}
                            required
                        />
                        <button type="submit">Add Client</button>
                    </form>
                    <div className='a-display-client'>
                        {clients.length > 0 ? (
                            clients.map((client) => (
                                <div key={client._id} className='a-p-row'>
                                    <h5>{client.name}</h5>
                                    <h5>{client.description}</h5>
                                    <h5>{client.designation}</h5>
                                </div>
                            ))
                        ) : (
                            <p>No clients available</p>
                        )}
                    </div>
                </section>

                {/* Contact Form Details */}
                <section>
                    <h2>Contact Form Details</h2>
                    {contacts.length > 0 ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact._id}>{contact.fullName} - {contact.email}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No contact form submissions available</p>
                    )}
                </section>

                {/* Subscribed Emails */}
                {/* <section>
                <h2>Subscribed Emails</h2>
                {subscriber.length > 0 ? (
                    <ul>
                        {subscriber.map((email, index) => (
                            <li key={index}>{email}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No subscribed emails available</p>
                )}
            </section> */}
            </section>
        </>
    );
}

export default AdminPanel;
