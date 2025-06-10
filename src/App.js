import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Initialize firebase connection from webapp start
import { app } from "./config-fb/firebase";

// Import Bootstrap 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactForm from './sections/ContactForm';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import PlansPage from './pages/PlansPage';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ'; 
import MyMembership from './pages/MyMembership'; 
import TOS from './pages/TermsOfService';

// Login and Signup
import SignupForm from './login-signup/Signup'; 

import './App.css';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/plans-page" element={<PlansPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/my-membership" element={<MyMembership />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/tos" element={<TOS />} />
          </Routes>
        </main>
        <Footer />
        <ContactForm /> 
      </div>
    </Router>
  );
}

export default App;