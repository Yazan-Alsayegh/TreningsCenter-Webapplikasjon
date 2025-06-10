// Import necessary functions from React and React Router
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ScrollToTop component
const ScrollToTop = () => {
  // Get the current pathname from the router's location object
  const { pathname } = useLocation();

  // useEffect hook to handle scrolling to the top when the pathname changes
  useEffect(() => {
    // Function to scroll the window to the top (x=0, y=0)
    const handleScroll = () => {
      window.scrollTo(0, 0);
    };
    
    // Set a timeout to ensure the scroll happens after the current call stack is cleared
    const timeoutId = setTimeout(handleScroll, 0);

    // Cleanup function to clear the timeout if the component unmounts or if pathname changes before timeout fires
    return () => clearTimeout(timeoutId);
  }, [pathname]);  // Dependency array, runs the effect whenever the pathname changes

  // This component does not render anything to the UI
  return null;
};

// Export the ScrollToTop component as the default export
export default ScrollToTop;