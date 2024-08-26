import React, { useEffect, useState } from 'react';
import { getProjects } from '../services/ProjectService';
import { getClients } from '../services/ClientService';
import { HashLink as Link } from 'react-router-hash-link'
import { addContact } from '../services/ContactService';
import { addSubscriber } from '../services/SubscribeService'
function LandingPage() {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [city, setCity] = useState('');
    const [subscriberEmail, setSubscriberEmail] = useState('');
    useEffect(() => {
        // Fetch projects
        getProjects()
            .then(response => {
                setProjects(response.data.projects);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });

        // Fetch clients
        getClients()
            .then(response => {
                setClients(response.data.clients);
            })
            .catch(error => {
                console.error('Error fetching clients:', error);
            });
    }, []);
    // Handle subscriber form submission
    const handleSubscriberSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addSubscriber({ email: subscriberEmail });
            if (response.data.success) {
                alert('Subscribed successfully');
                setSubscriberEmail(''); // Clear the input field
            } else {
                alert('Failed to subscribe');
            }
        } catch (error) {
            console.error('Error subscribing:', error);
            alert('An error occurred while subscribing');
        }
    };

    return (
        <>
            <nav>
                <ul>
                    <div className='logo-box'>
                        <img src='./assets/images/logo.png' alt='logo' className='logo' />
                    </div>
                    <li><Link to={'/'} className='active'>Home</Link></li>
                    <li><Link to={''}>Services</Link></li>
                    <li><Link to={''}>About Projects</Link></li>
                    <button className='btn-contact'><Link to={''} >CONTACT</Link></button>
                    <button className='admin'><Link to={'/admin'}>Admin Panel</Link></button>
                </ul>
            </nav>

            <section className='section1'>
                <div className='name-box'>
                    <h3>Consultation, Design, & Marketing</h3>
                </div>

                <form onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                        const response = await addContact({ fullName, email, mobileNumber, city });
                        if (response.data.success) {
                            alert('Contact form submitted successfully');
                            window.location.reload();
                        } else {
                            alert('Failed to submit contact form');
                        }
                    } catch (error) {
                        console.error('Error submitting contact form:', error);
                        alert('An error occurred while submitting the form');
                    }
                }}
                >
                    <div className='contact-form'>
                        <h2>Get a Free Consultation</h2>
                        <input type='text' placeholder='Full Name' required onChange={(e) => { setFullName(e.target.value) }} />
                        <input type='email' placeholder='Email Address' required onChange={(e) => { setEmail(e.target.value) }} />
                        <input type='text' placeholder='Mobile Number' required onChange={(e) => { setMobileNumber(e.target.value) }} />
                        <input type='text' placeholder='City' required onChange={(e) => { setCity(e.target.value) }} />
                        <button type='submit'>submit</button>
                    </div>
                </form>
            </section>
            <section className='section2'>
                <div className='s2-text-box'>
                    <h2>Not Your Average Consultant</h2>
                    <p>We offer specialized consulting services tailored to your unique needs. Our team excels in creating innovative strategies that drive success. Whether you're looking to optimize operations, enhance your brand, or streamline processes, we're here to guide you every step of the way.</p>
                </div>
                <div className='s2-photos-box'>
                    <div className='bigimg'>
                        <img className='img1' src='./assets/images/Ellipse11.png' alt='img' />
                    </div>
                    <div className='smallimg'>
                        <img className='img2' src='./assets/images/Ellipse12.png' alt='img' />
                        <img className='img3' src='./assets/images/Ellipse13.png' alt='img' />
                    </div>
                </div>
            </section>

            <section className='section3'>
                <div className='s3-text-box'>
                    <h2>Why Choose Us?</h2>
                    <div className='border'></div>
                </div>
                <div className='s3-content-box'>
                    <div className='card'>
                        <div className='img'><img src='./assets/images/home.png' alt='img' /></div>
                        <h2>Potential ROI</h2>
                        <p>Whether you're looking to buy, sell, or renovate your current home for resale, we work with you to maximize your potential return on investment by providing expert guidance and effective strategy</p>
                    </div>
                    <div className='card'>
                        <div className='img'> <img src='./assets/images/paintbrush-2.png' alt='img' /></div>
                        <h2>Design</h2>
                        <p>Our team specializes in interior design that enhances the aesthetics of your property. We guide you through the design process, ensuring your space is both functional and visually appealing, resulting in a home that reflects your style.</p>
                    </div>
                    <div className='card'>
                        <div className='img'><img src='./assets/images/circle-dollar-sign.png' alt='img' /></div>
                        <h2>Marketing</h2>
                        <p>Our marketing strategies are designed to meet contemporary demands. We create comprehensive marketing plans that position your property effectively, using cutting-edge techniques to ensure it stands out in a competitive market.</p>
                    </div>
                </div>
            </section>
            <section className='section4'>
                <div className='s4-photos-box'>
                    <img src='./assets/images/sec4-1.png' alt='img' style={{ height: '200px' }} />
                    <img src='./assets/images/sec4-2.png' alt='img' style={{ height: '300px', alignSelf: 'end' }} />
                    <img className='img3' src='./assets/images/sec4-3.png' alt='img' style={{ height: '200px' }} />
                </div>
                <div className='s4-content-box'>
                    <div className='heading'>
                        <h2>About Us</h2>
                        <div className='border'></div>
                    </div>
                    <p>With over fifteen years of experience in the industry, we pride ourselves on delivering exceptional customer service. Our commitment to hard work, active listening, and thorough follow-through ensures that we provide top-quality services. We focus on building strong relationships with our clients and, more importantly, maintaining those relationships through effective communication.</p>
                    <button>LEARN MORE</button>
                </div>
            </section>
            <section className='section5'>
                <h2>Our Projects</h2>
                <p className='para'>We know what buyers are looking for and suggest projects that will bring clients top dollor for the sale of their homes.</p>
                <div className='s5-projects'>
                    {projects.map((project) => (
                        <div key={project._id} className='project-card'>
                            <div className='project-img'>
                                <img src={project.image} alt={project.name} />
                            </div>
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                            <button>READ MORE</button>
                        </div>
                    ))}
                </div>
            </section>


            <section className='section6'>
                <h2>Happy Clients</h2>
                <div className='s6-clients-wrapper'>
                    <div className='s6-clients'>
                        {clients.map((client) => (
                            <div key={client._id} className='client-card'>
                                <div className='client-img'>
                                    <img src={client.image} alt={client.name} />
                                </div>
                                <div className='client-content'>
                                    <p>{client.description}</p>
                                </div>
                                <div className='client-info'>
                                    <h3>{client.name}</h3>
                                    <h5>{client.designation}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className='section7'>
                <div className='s7-content'>
                    <div className='s7-box'>
                        <h2>Learn more about our listing process, as well as our additional staging and design work.</h2>
                        <button>LEARN MORE</button>
                    </div>
                </div>

                <div className='footer'>
                    <div className='footer-1'>
                        <ul>
                            <li>Home</li>
                            <li>Services</li>
                            <li>Projects</li>
                            <li>Testimonials</li>
                            <li>Contact</li>
                        </ul>
                        <div className='subscribe'>
                            <h5>Subscribe Us</h5>
                            <form className='sub-box' onSubmit={handleSubscriberSubmit}>
                                <input type='email' value={subscriberEmail} onChange={(e) => setSubscriberEmail(e.target.value)} required />
                                <button type='submit'>Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LandingPage;
