import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import ColorGrid from './ColorGrid';

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

const fadeInBg = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const hover = keyframes`
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('/assets/images/bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  transition: transform 1s ease;
  transform: ${props => props.$isAnimating ? 'translateY(-100%)' : 'translateY(0)'};
  position: relative;
  overflow: hidden;
  animation: ${fadeInBg} 0.8s ease;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  width: 100%;
  max-width: 800px;
`;

const Title = styled.h1`
  font-family: 'NoeDisplay-RegularItalic', serif;
  font-size: 4rem;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  animation: ${fadeIn} 0.8s ease;
  animation-fill-mode: both;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Description = styled.p`
  font-family: 'ESKlarheitKurrent-Rg', sans-serif;
  font-size: 1.2rem;
  opacity: 0.8;
  margin-bottom: 2rem;
  max-width: 100%;
  text-align: center;
  animation: ${fadeIn} 0.8s ease;
  animation-delay: 0.3s;
  animation-fill-mode: both;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
    margin-bottom: 2rem;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 56px; /* Fixed height to prevent layout shifts */
`;

const GetStartedButton = styled.button`
  background: transparent;
  border: 1px solid #fff;
  cursor: pointer;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s ease, opacity 0.3s ease;
  border-radius: 6px;
  transform-origin: center;
  margin: 0 auto;
  animation: ${fadeIn} 0.8s ease, ${hover} 1s ease-in-out infinite;
  animation-delay: 0.9s, 2s;
  animation-fill-mode: both, forwards;
  font-family: 'ESKlarheitKurrent-Rg', sans-serif;
  font-size: 1rem;
  color: #fff;
  text-transform: uppercase;

  &:hover {
    animation-play-state: paused;
    transform: translateY(4px) scale(0.95) !important;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  &:active {
    transform: translateY(4px) scale(0.90) !important;
    transition: transform 0.1s ease;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 12px 24px;
  }
`;

const Footer = styled.footer`
  position: fixed;
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
  color:white;
  
  .noe-italic {
    font-family: 'NoeDisplay-RegularItalic', serif;
    font-size: 2.3rem;
    margin-left: 5px;
  }
`;

const Logo = styled.img`
  height: 2.5rem;
  margin-left: 0.5rem;
`;

const CoverPage = ({ onComplete, onPreloadContent, onGetStarted }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showColorGrid, setShowColorGrid] = useState(true);
  const [finalColor, setFinalColor] = useState(null);
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const contentRef = useRef(null);
  
  // Log element dimensions on render and changes
  useEffect(() => {
    const logDimensions = () => {
      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        console.log('Title dimensions:', {
          top: titleRect.top,
          left: titleRect.left,
          height: titleRect.height,
          width: titleRect.width
        });
      }
      
      if (descriptionRef.current) {
        const descRect = descriptionRef.current.getBoundingClientRect();
        console.log('Description dimensions:', {
          top: descRect.top,
          left: descRect.left,
          height: descRect.height,
          width: descRect.width
        });
      }
      
      if (contentRef.current) {
        const contentRect = contentRef.current.getBoundingClientRect();
        console.log('Content dimensions:', {
          top: contentRect.top,
          left: contentRect.left,
          height: contentRect.height,
          width: contentRect.width
        });
      }
    };
    
    // Log on initial render
    console.log('Component rendered, logging initial dimensions');
    // Use setTimeout to ensure the DOM has been painted
    setTimeout(logDimensions, 100);
    
    // Log again after a delay to catch any shifts
    setTimeout(() => {
      console.log('Logging dimensions after delay');
      logDimensions();
    }, 1000);
    
    // Create a MutationObserver to detect DOM changes
    const observer = new MutationObserver(() => {
      console.log('DOM mutation detected, logging dimensions');
      logDimensions();
    });
    
    // Start observing the content container
    if (contentRef.current) {
      observer.observe(contentRef.current, { 
        attributes: true, 
        childList: true, 
        subtree: true 
      });
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Preload content as soon as component mounts
  useEffect(() => {
    const preloadApp = async () => {
      console.log('CoverPage mounted, preloading content');
      setIsLoading(true);
      
      try {
        if (onPreloadContent) {
          await onPreloadContent();
        }
        // Render everything first without animations
        setIsButtonVisible(false); // Don't show button yet
        setIsLoading(false);
        
        // First let the background fade in
        // Then enable content animations after background is visible
        setTimeout(() => {
          setAnimationsEnabled(true);
          console.log('Content preloaded, animations enabled');
          
          // Show button with a delay after animations start
          setTimeout(() => {
            setIsButtonVisible(true);
            console.log('Button visible');
          }, 800);
        }, 800); // Delay content animations to let background fade in first
      } catch (error) {
        console.error('Error preloading content:', error);
        // Show button anyway if there's an error
        setIsButtonVisible(true);
        setIsLoading(false);
        setTimeout(() => setAnimationsEnabled(true), 500);
      }
    };
    
    preloadApp();
  }, [onPreloadContent]);
  
  const handleGetStarted = () => {
    console.log('Get Started clicked, initiating transition');
    
    // Only animate if button is visible and not in loading state
    if (isButtonVisible && !isLoading) {
      setIsAnimating(true);
      
      // Add a small delay before starting the color transition
      setTimeout(() => {
        setFinalColor('#FF00FF');
      }, 500);  // Wait 500ms before starting color transition
      
      // Call onComplete immediately to start the app transition
      if (onComplete) {
        onComplete();
      }
      
      // Wait for fade out animation to complete before removing color grid
      setTimeout(() => {
        setShowColorGrid(false);
      }, 1000);
    }
  };

  const handleColorGridComplete = () => {
    setShowColorGrid(false);
  };
  
  return (
    <>
      {showColorGrid && (
        <ColorGrid
          colors={['#00FFFF', '#FF00FF', '#FFFF00', '#000000', '#00FF33', '#FFFFFF']}
          transitionDuration={500}
          transitionDelay={200}
          finalColor={finalColor}
          onFinalColorComplete={handleColorGridComplete}
          zIndex={999}
        />
      )}
      <CoverPageContainer $isAnimating={isAnimating}>
        <Content ref={contentRef}>
          <Title 
            ref={titleRef} 
            style={{ 
              opacity: animationsEnabled ? undefined : 1,
              transform: animationsEnabled ? undefined : 'none',
              animationPlayState: animationsEnabled ? 'running' : 'paused'
            }}
          >
            Promptimizer
          </Title>
          <Description 
            ref={descriptionRef}
            style={{ 
              opacity: animationsEnabled ? undefined : 1,
              transform: animationsEnabled ? undefined : 'none',
              animationPlayState: animationsEnabled ? 'running' : 'paused'
            }}
          >
            Promptimizer optimizes your prompt to AI tools for better results.
            <br /> Simply enter your prompt and see the magic happen.
          </Description>
          <ButtonArea>
            {/* Always render the button but control its visibility with CSS */}
            <div style={{ 
              height: '56px', /* Fixed height to prevent layout shifts */
              overflow: 'hidden'
            }}>
              <GetStartedButton 
                onClick={isButtonVisible ? handleGetStarted : undefined}
                style={{ 
                  opacity: isButtonVisible ? 1 : 0,
                  transform: isButtonVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.8s ease, transform 0.8s ease',
                  pointerEvents: isButtonVisible ? 'auto' : 'none'
                }}
              >
                Get Started
              </GetStartedButton>
            </div>
          </ButtonArea>
        </Content>
        <Footer>
          <span>AI Experiment</span>
          <span className="noe-italic"> by </span>
          <Logo src="/assets/images/logo.svg" alt="Penguins from Pluto Logo" />
        </Footer>
      </CoverPageContainer>
    </>
  );
};

export default CoverPage; 