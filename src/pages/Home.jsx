import React from 'react';
// css
import '../styles_pages/Home_style.css';

// Cardbox
import CardBox from '../sections/CardBox'; // Adjust the path as needed
import cardDataHome from '../data/data-CardBox/cardDataHome.json'; // Import JSON data
// Banner
import Banner from '../sections/Banner'; // Import the Banner component

// Team Members
import teamMembersDataHome from '../data/data-TeamMembers/teamMembersDataHome.json';
import TeamMembers from '../sections/TeamMembers'; // Import the TeamMembers component
// Prices
import Plans from '../sections/Plans';
// Testimonials
import Testimonials from '../sections/Testimonials';
// subHero
import SubHero from '../sections/SubHero';
import SubHeroDataHome from '../data/data-SubHero/SubHeroDataHome.json';

const Home = () => {

  return (
    <div className='home'>
      <Banner /> {/* Render the Banner component without passing props */}
      <div className='cardboxSection cardboxSectionHome'>
        <CardBox data={cardDataHome} />
      </div>
      <div className='teamMembersSection teamMembersSectionHome'>
        <TeamMembers teamData={teamMembersDataHome} /> {/* Render the TeamMembers component */}
      </div>

        <div className='plansSection plansSectionHome'>
          <div className='plansTitle'>
            <h5 className='section-subtitle'>WHAT WE OFFER</h5>
            <h2 className='section-title'>Discover Your Ideal Plan</h2>
          </div>
          <Plans /> {/* Render the Plans component */}
        </div>

      <div className='testimonialsSection testimonialsSectionHome'>
        <Testimonials />
      </div>

      <div className='subHeroSection subHeroSectionHome'>
        <SubHero data={SubHeroDataHome} />      </div>

    </div>
  );
}

export default Home;
