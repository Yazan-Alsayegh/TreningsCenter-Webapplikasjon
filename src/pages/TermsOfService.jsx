import React from 'react';
import '../styles_pages/TermsOfService.css'; // Import the CSS file

const TermsOfService = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms of Service</h1>
      <p className="terms-text">
        Welcome to our gym website! These terms of service outline the rules and regulations for the use of our website.
      </p>
      <p className="terms-text">
        By accessing this website we assume you accept these terms of service in full. Do not continue to use our website if you do not accept all of the terms of service stated on this page.
      </p>
      <p className="terms-text">
        The following terminology applies to these terms of service, privacy statement and disclaimer notice and any or all agreements: “Client”, “You” and “Your” refers to you, the person accessing this website and accepting the company’s terms of service. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves, or either the Client or ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner, whether by formal meetings of a fixed duration, or any other means, for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services/products, in accordance with and subject to, prevailing law of United States. Any use of the above terminology or other words in the singular, plural, capitalisation and/or he/she or they, are taken as interchangeable and therefore as referring to same.
      </p>
      {/* Add more terms and conditions here */}
    </div>
  );
};

export default TermsOfService;