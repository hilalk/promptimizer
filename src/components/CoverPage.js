import { useState, useEffect } from 'react';
import styled from 'styled-components';

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
`;

const Title = styled.h1`
  font-size: 10rem;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 8rem;
  }
`;

const Description = styled.p`
  font-size: 3rem;
  margin-bottom: 4rem;
  text-align: center;
  max-width: 80rem;
  
  .klarheit {
    font-family: 'ESKlarheitKurrent-Rg', sans-serif;
  }
  
  .noe-italic {
    font-family: 'NoeDisplay-RegularItalic', sans-serif;
  }
`;

const GetStartedButton = styled.button`
  font-size: 2.5rem;
  padding: 1.6rem 3.2rem;
  border: 0.2rem solid black;
  background-color: transparent;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s ease;
  
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
  border-top: 0.2rem solid black;
  font-family: 'ESKlarheitPlakat-Xbd', sans-serif;
  font-size: 1.5rem;
  
  .noe-italic {
    font-family: 'NoeDisplay-RegularItalic', sans-serif;
  }
`;

const Logo = styled.img`
  height: 2.5rem;
  margin-left: 0.5rem;
`;

const CoverPage = ({ onGetStarted }) => {
  const [slideUp, setSlideUp] = useState(false);
  
  useEffect(() => {
    console.log('CoverPage mounted');
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
      <Description>
        <span className="noe-italic">Promptimizer</span> optimizes your prompt to AI tools for better results. 
        Simply enter your prompt and see the magic happen. <span className="klarheit">ESKlarheitKurrent-Rg.woff</span>
      </Description>
      <GetStartedButton onClick={handleGetStarted}>Get Started</GetStartedButton>
      <Footer>
        <span>AI Experiment</span>
        <span className="noe-italic"> by </span>
        <span>Penguins from Pluto</span>
        <Logo src="/assets/images/logo.svg" alt="Penguins from Pluto Logo" />
      </Footer>
    </CoverPageContainer>
  );
};

export default CoverPage; 