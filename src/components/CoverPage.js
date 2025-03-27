import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CoverPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url('/assets/images/bg.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  transition: transform 1s ease-in-out;
  transform: ${props => props.slideUp ? 'translateY(-100%)' : 'translateY(0)'};
  padding: 2rem;
  color: white;
  padding-bottom: 10vh;
`;

const Title = styled.h1`
  font-size: 5rem;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'NoeDisplay-RegularItalic', serif;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: 0.3s;
  
  @media (max-width: 768px) {
    font-size: 8rem;
  }
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2.3rem;
  text-align: center;
  max-width: 80rem;
  font-family: 'ESKlarheitKurrent-Rg', sans-serif;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: 0.8s;
  
  .klarheit {
    font-family: 'ESKlarheitKurrent-Rg', sans-serif;
  }
  
  .noe-italic {
    font-family: 'NoeDisplay-RegularItalic', serif;
  }
`;

const GetStartedButton = styled.button`
  font-size: 1.3rem;
  padding: 1rem 2rem;
  border: 0.1rem solid white;
  border-radius: 0.2rem;
  color: white;
  background-color: transparent;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s ease;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: 1.3s;
  
  &:hover {
    transform: scale(0.95);
  }
  
  &:active {
    transform: scale(0.9);
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'ESKlarheitPlakat-Xbd', sans-serif;
  font-size: 2rem;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: 1.8s;
  
  .noe-italic {
    font-family: 'NoeDisplay-RegularItalic', sans-serif;
    font-size:2.3rem;
    margin-left:5px;
  }
`;

const Logo = styled.img`
  height: 2.5rem;
  margin-left: 0.5rem;
`;

const CoverPage = ({ onGetStarted }) => {
  const [slideUp, setSlideUp] = useState(false);
  const [animationsLoaded, setAnimationsLoaded] = useState(false);
  
  useEffect(() => {
    console.log('CoverPage mounted');
    // Set animations as loaded after all animations complete
    const timer = setTimeout(() => {
      setAnimationsLoaded(true);
    }, 2500); // Time after all animations have completed
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleGetStarted = () => {
    console.log('Get Started clicked');
    setSlideUp(true);
    
    // Wait for animation to complete before calling onGetStarted
    setTimeout(() => {
      if (onGetStarted) {
        onGetStarted();
      }
    }, 1000);
  };
  
  return (
    <CoverPageContainer slideUp={slideUp}>
      <Title>Promptimizer</Title>
      <Description> Promptimizer optimizes your prompt to AI tools for better results.
          <br /> Simply enter your prompt and see the magic happen.
      </Description>
      <GetStartedButton onClick={handleGetStarted}>Get Started</GetStartedButton>
      <Footer>
        <span>AI Experiment</span>
        <span className="noe-italic"> by </span>
        <Logo src="/assets/images/logo.svg" alt="Penguins from Pluto Logo" />
      </Footer>
    </CoverPageContainer>
  );
};

export default CoverPage; 