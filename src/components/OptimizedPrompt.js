import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
`;

const OptimizedText = styled.div`
  width: 100%;
  padding: 2rem;
  background-color: white;
  border: 0.2rem solid black;
  font-size: 2rem;
  font-family: 'ESKlarheitKurrent-Rg', sans-serif;
  margin-bottom: 2rem;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 2rem;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  text-transform: uppercase;
  font-family: 'Agdasima', sans-serif;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    transform: scale(0.95);
  }
  
  &:active {
    transform: scale(0.9);
  }

  svg {
    margin-right: 1rem;
  }
`;

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  padding: 1.6rem;
  border: 0.2rem solid black;
  background-color: white;
  text-transform: uppercase;
  font-family: 'Agdasima', sans-serif;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(0.95);
  }
  
  &:active {
    transform: scale(0.9);
  }

  svg {
    margin-right: 1rem;
  }
`;

const ExplanationContainer = styled.div`
  width: 100%;
  max-height: ${props => props.expanded ? '200rem' : '0'};
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  margin-top: ${props => props.expanded ? '2rem' : '0'};
`;

const ExplanationContent = styled.div`
  padding: 2rem;
  background-color: white;
  border: 0.2rem solid black;
  font-size: 1.6rem;
  font-family: 'ESKlarheitKurrent-Rg', sans-serif;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const OptimizedPrompt = ({ optimizedPrompt, explanation, onNewPrompt }) => {
  const [isExplanationExpanded, setIsExplanationExpanded] = useState(false);
  const explanationRef = useRef(null);
  
  useEffect(() => {
    console.log('OptimizedPrompt mounted');
  }, []);
  
  const handleToggleExplanation = () => {
    console.log('Toggle explanation');
    const newState = !isExplanationExpanded;
    setIsExplanationExpanded(newState);
    
    // Scroll to explanation if expanded
    if (newState && explanationRef.current) {
      setTimeout(() => {
        explanationRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };
  
  const handleCopyToClipboard = () => {
    console.log('Copying to clipboard');
    navigator.clipboard.writeText(optimizedPrompt)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };
  
  return (
    <Container>
      <OptimizedText>{optimizedPrompt}</OptimizedText>
      
      <ButtonsContainer>
        <ToggleButton onClick={handleToggleExplanation}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16L7 11H17L12 16Z" fill="currentColor" />
          </svg>
          Explanation
        </ToggleButton>
        
        <ActionButtons>
          <PrimaryButton onClick={handleCopyToClipboard}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor" />
            </svg>
            Copy
          </PrimaryButton>
          
          <PrimaryButton onClick={onNewPrompt}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor" />
            </svg>
            New Prompt
          </PrimaryButton>
        </ActionButtons>
      </ButtonsContainer>
      
      <ExplanationContainer expanded={isExplanationExpanded} ref={explanationRef}>
        <ExplanationContent dangerouslySetInnerHTML={{ __html: explanation.replace(/\\n/g, '<br/>') }} />
      </ExplanationContainer>
    </Container>
  );
};

export default OptimizedPrompt; 