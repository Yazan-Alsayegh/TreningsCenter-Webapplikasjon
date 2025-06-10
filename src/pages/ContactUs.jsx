import React from 'react';
import logo from '../logo/zenmember.png'; // Import the image
import employeeLogo from '../logo/employee.svg'; // Import the SVG file for offer 3
import timeLogo from '../logo/time.svg'; // Import the SVG file for offer 1
import checkLogo from '../logo/check.svg'; // Import the SVG file for offer 2
import starLogo from '../logo/star.svg'; // Import the SVG file for offer 4
import waterLogo from '../logo/water.svg'; // Import the SVG file for offer 5
import lockLogo from '../logo/lock.svg'; // Import the SVG file for offer 6
import '../styles_pages/contactus.css'; // Import the CSS file with the corrected name
import TextResolver from '../components/Textresolver'; // Import the TextResolver component
import Prices from '../sections/Prices.js'; // Assuming Prices is the component for the pricing section
import pricesDataHome from '../data/data-Prices/pricesDataHome.json';


const Membership = () => {
    return (
        <div className='membership'>
            <div className="image-container">
                <img src={logo} alt="Zen Fitness Logo" className="membership-header-image" /> {/* Add the image with a class name */}
                <div className="text-resolver-container">
                    <TextResolver /> {/* Add the TextResolver component */}
                </div>
            </div>
            <section className='membership-section' style={{ backgroundColor: '#122620', minHeight: '300px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {/* Content for Section 1 */}
                <section className='membership-section' style={{ backgroundColor: '#122620', minHeight: '600px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {/* Content for Section 1 */}
                    <br></br>
                    <h2 style={{ textAlign: 'center', color: '#FFFFFF' }}>Elevate your body.</h2>
                    <p style={{ textAlign: 'center', color: '#FFFFFF' }}>Access exclusive gym benefits and clear your mind.</p>
                    <div style={{ backgroundColor: '#CCCCCC', height: '2px', width: 'calc(100% - 6cm)', margin: '20px 3cm' }}></div>

           {/* Boxes */}
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginTop: '20px' }}>
        <div className="box" style={{ textAlign: 'center' }}>
            <img src={timeLogo} alt="Offer 1" style={{ width: '50px', height: '50px' }} />
            <p style={{ color: '#FFFFFF' }}>Always Open</p>
        </div>
        <div className="box" style={{ textAlign: 'center' }}>
            <img src={checkLogo} alt="Offer 2" style={{ width: '50px', height: '50px' }} />
            <p style={{ color: '#FFFFFF' }}>Modern Premises</p>
        </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginTop: '3cm' }}>
        <div className="box" style={{ textAlign: 'center' }}>
            <img src={employeeLogo} alt="Offer 3" style={{ width: '50px', height: '50px' }} />
            <p style={{ color: '#FFFFFF' }}>Highly Competent Guidance</p>
        </div>
        <div className="box" style={{ textAlign: 'center' }}>
            <img src={starLogo} alt="Offer 4" style={{ width: '50px', height: '50px' }} />
            <p style={{ color: '#FFFFFF' }}>Only the best equipment</p>
        </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginTop: '3cm' }}>
        <div className="box" style={{ textAlign: 'center' }}>
            <img src={waterLogo} alt="Offer 5" style={{ width: '50px', height: '50px' }} />
            <p style={{ color: '#FFFFFF' }}>Access to swimming facility</p>
        </div>
        <div className="box" style={{ textAlign: 'center' }}>
            <img src={lockLogo} alt="Offer 6" style={{ width: '50px', height: '50px' }} />
            <p style={{ color: '#FFFFFF' }}>Dedicated locker rooms</p>
                        </div>
                    </div>
                </section>
            </section>
            <br></br>
            <section className='membership-section' style={{ backgroundColor: '#FFFFFF', minHeight: '200px' }}>
                {/* Content for Section 2 */}
                <br></br>
                <Prices /> {/* Rendering the Prices component */}
                {/* Include pricing cards or tables */}
            </section>
            <section className='membership-section' style={{ backgroundColor: '#122620', minHeight: '200px' }}>
                {/* Content for Section 3 */}
                <h2>Section 3</h2>
                <ul>
                    <li>State-of-the-art equipment</li>
                    <li>Personalized training programs</li>
                    {/* Add more features */}
                </ul>
            </section>
            <section className='membership-section' style={{ backgroundColor: '#FFFFFF', minHeight: '200px' }}>
                {/* Content for Section 5 */}
                <h2>Become a Member now!</h2>
                {/* Add contact form or contact information */}
            </section>
        </div>
    );
}

export default Membership;