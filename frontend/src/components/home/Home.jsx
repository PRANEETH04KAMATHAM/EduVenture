
import React from "react";
import { Link } from "react-router-dom";
import { FaRegLightbulb, FaDonate, FaCheckCircle, FaUsers, FaHandshake, FaGlobe } from "react-icons/fa";
import Header from '../header/Header';
import "./Home.css";
import Footer from "../footer/Footer";

const Home = () => {
  return (
    <>
      <Header />

  
      <div className="hero-section">
        <h1>Empowering Students to Bring Their Events to Life!</h1>
        <p>Submit your event for approval and start receiving donations instantly.</p>
        <div className="buttons">
          <Link to="/submit-event" className="btn primary">🎉 Start an Event</Link>
          <Link to="/events" className="btn secondary">💰 Donate Now</Link>
        </div>
      </div>

    
      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <FaRegLightbulb className="icon" />
            <h3>Submit Event</h3>
            <p>Students provide event details and required documents.</p>
          </div>
          <div className="step">
            <FaCheckCircle className="icon" />
            <h3>Get Approval</h3>
            <p>Admins review and approve event requests.</p>
          </div>
          <div className="step">
            <FaDonate className="icon" />
            <h3>Receive Donations</h3>
            <p>QR codes allow donors to easily contribute.</p>
          </div>
        </div>
      </div>

    
      <div className="statistics">
        <h2>EduVenture in Numbers</h2>
        <div className="stats-grid">
          <div className="stat">
            <FaUsers className="stat-icon" />
            <h3>500+</h3>
            <p>Students Participating</p>
          </div>
          <div className="stat">
            <FaHandshake className="stat-icon" />
            <h3>₹1,00,000+</h3>
            <p>Funds Raised</p>
          </div>
          <div className="stat">
            <FaGlobe className="stat-icon" />
            <h3>100+</h3>
            <p>Successful Events</p>
          </div>
        </div>
      </div>

 
      <div className="featured-events">
        <h2>Top Funded Events</h2>
        <div className="event-list">
          <div className="event">
            <img src="null" alt="Event 1" />
            <h3>Charity Run 2025</h3>
            <p>Raised: ₹50,000</p>
            <Link to="/events/1">View Event</Link>
          </div>
          <div className="event">
            <img src="null" alt="Event 2" />
            <h3>Tech Fest 2025</h3>
            <p>Raised: ₹75,000</p>
            <Link to="/events/2">View Event</Link>
          </div>
          <div className="event">
            <img src="null" alt="Event 3" />
            <h3>Food Drive Initiative</h3>
            <p>Raised: ₹30,000</p>
            <Link to="/events/3">View Event</Link>
          </div>
        </div>
      </div>

      
      <div className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>"EduVenture made fundraising so easy for our event. We raised ₹30,000 in just a week!"</p>
          <h4>- Ramesh, Student</h4>
        </div>
        <div className="testimonial">
          <p>"A simple and effective platform for students to manage events and receive donations securely."</p>
          <h4>- Priya, Event Organizer</h4>
        </div>
      </div>

      
            <div className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <details>
            <summary>How can I create an event?</summary>
            <p>You need to register, submit event details, and wait for admin approval.</p>
          </details>
        </div>
        <div className="faq-item">
          <details>
            <summary>Is my donation secure?</summary>
            <p>Yes! We use encrypted QR codes for safe transactions.</p>
          </details>
        </div>
        <div className="faq-item">
          <details>
            <summary>Can I track donations for my event?</summary>
            <p>Yes, each event has a dashboard to view donations received.</p>
          </details>
        </div>
      </div>

     
      <div className="newsletter">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for updates on new events.</p>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </div>

      <Footer />
    </>
  );
};

export default Home;
