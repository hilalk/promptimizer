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

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
  100% {
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
  transform: ${props => props.$isAnimating ? 'translateY(-100%)' : 'translateY(0)'};
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
  animation-delay: 0.6s;
  
  .klarheit {
    font-family: 'ESKlarheitKurrent-Rg', sans-serif;
  }
  
  .noe-italic {
    font-family: 'NoeDisplay-RegularItalic', serif;
  }
`;

const ButtonArea = styled.div`
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
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
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards, ${float} 1s ease-in-out infinite;
  animation-delay: 0.9s, 1.7s;
  
  &:hover {
    animation-play-state: paused;
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
  animation-delay: 1.2s;
  
  .noe-italic {
    font-family: 'NoeDisplay-RegularItalic', sans-serif;
    font-size: 2.3rem;
    margin-left: 5px;
  }
`;

const Logo = styled.img`
  height: 2.5rem;
  margin-left: 0.5rem;
`;

const CoverPage = ({ onComplete, onGetStarted, onPreloadContent }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Preload content as soon as component mounts
  useEffect(() => {
    const preloadApp = async () => {
      console.log('CoverPage mounted, preloading content');
      setIsLoading(true);
      
      try {
        if (onPreloadContent) {
          await onPreloadContent();
        }
        // Once preloaded, show the button
        setIsButtonVisible(true);
        setIsLoading(false);
        console.log('Content preloaded, button is visible');
      } catch (error) {
        console.error('Error preloading content:', error);
        // Show button anyway if there's an error
        setIsButtonVisible(true);
        setIsLoading(false);
      }
    };
    
    preloadApp();
  }, [onPreloadContent]);
  
  const handleGetStarted = () => {
    console.log('Get Started clicked, initiating transition');
    
    // Only animate if button is visible and not in loading state
    if (isButtonVisible && !isLoading) {
      setIsAnimating(true);
      
      // Wait for slide-up animation to complete then call onComplete
      setTimeout(() => {
        console.log('Slide-up animation complete, calling onComplete');
        if (onComplete) {
          onComplete();
        }
        
        // Also call the legacy onGetStarted for backward compatibility
        if (onGetStarted) {
          onGetStarted();
        }
      }, 1000);
    }
  };
  
  return (
    <CoverPageContainer $isAnimating={isAnimating}>
      <Title>Promptimizer</Title>
      <Description>Promptimizer optimizes your prompt to AI tools for better results.
          <br /> Simply enter your prompt and see the magic happen.
      </Description>
      <ButtonArea>
        {isButtonVisible && (
          <GetStartedButton onClick={handleGetStarted}>
            Get Started
          </GetStartedButton>
        )}
      </ButtonArea>
      <Footer>
        <span>AI Experiment</span>
        <span className="noe-italic"> by </span>
        <Logo src="/assets/images/logo.svg" alt="Penguins from Pluto Logo" />
      </Footer>
    </CoverPageContainer>
  );
};

export default CoverPage; 