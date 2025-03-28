import { useState, useRef, useEffect } from 'react';
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

const Container = styled.div`
  padding: 8rem 0rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: 0.3s; // Delay animation start to sync with ColorGrid fade-out
`;

const OptimizedText = styled.div`
  width: 100%;
  font-size: 7rem;
  font-family: 'Agdasima', sans-serif;
  margin-bottom: 2rem;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 3rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    align-items: stretch;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  text-transform: uppercase;
  font-family: 'Agdasima', sans-serif;
  font-size: 3rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    align-self: flex-start;
    font-size:4rem;
  }
  
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
  justify-content: center;
  padding: 1.6rem;
  border: 0.2rem solid black;
  border-radius: 0.5rem !important;
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
  text-transform: uppercase;
  font-family: 'Agdasima', sans-serif;
  font-size: 3rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 1rem;
    font-size: 4rem;
  }
  
  &:hover {
    transform: scale(0.95);
    background-color: transparent !important;
  }
  
  &:active {
    transform: scale(0.9);
    background-color: transparent !important;
  }

  svg {
    margin-right: 1rem;
  }
`;

const ExplanationContainer = styled.div`
  width: 100%;
  max-height: ${props => props.expanded ? '800rem' : '0'};
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  margin-top: ${props => props.expanded ? '2rem' : '0'};
`;

const ExplanationContent = styled.div`
  font-family: 'ESKlarheitKurrent-Rg', sans-serif;
  white-space: pre-wrap;
  line-height: 1.5;
  margin-top: 6rem;
  border-top: 0.2rem solid black;
  padding-top: 4rem;
  
  .explanation-title {
    font-weight: bold;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    display: block;
    font-size: 4rem;
    font-family: 'Agdasima', sans-serif;
  }
  
  .explanation-description {
    margin-bottom: 2rem;
    display: block;
    font-family: 'Agdasima', sans-serif;
    font-size: 4rem;
  }
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
      // Add a slightly longer delay to ensure the content has expanded
      setTimeout(() => {
        // Get the height of the footer to account for it
        const footerHeight = document.querySelector('footer')?.offsetHeight || 0;
        // Get the position of the explanation content
        const explanationRect = explanationRef.current.getBoundingClientRect();
        // Calculate the scroll position to ensure the entire explanation is visible
        // Add extra pixels to scroll further down
        const scrollPosition = window.scrollY + explanationRect.top - 100;
        
        // Scroll to the calculated position
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }, 300); // Longer delay to ensure the content has expanded
    }
  };
  
  const [copyButtonText, setCopyButtonText] = useState('Copy');
  
  const handleCopyToClipboard = () => {
    console.log('Copying to clipboard');
    navigator.clipboard.writeText(optimizedPrompt)
      .then(() => {
        // Change button text to 'Copied' temporarily
        setCopyButtonText('Copied!');
        
        // Reset button text after 2 seconds
        setTimeout(() => {
          setCopyButtonText('Copy');
        }, 2000);
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
          WHY IS THIS PROMPT BETTER?
        </ToggleButton>
        
        <ActionButtons>
          <PrimaryButton 
            onClick={handleCopyToClipboard}
            style={{ borderRadius: '0.2rem' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor" />
            </svg>
            {copyButtonText}
          </PrimaryButton>
          
          <PrimaryButton 
            onClick={onNewPrompt}
            style={{ borderRadius: '0.2rem' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor" />
            </svg>
            New Prompt
          </PrimaryButton>
        </ActionButtons>
      </ButtonsContainer>
      
      <ExplanationContainer expanded={isExplanationExpanded} ref={explanationRef}>
        <ExplanationContent 
          dangerouslySetInnerHTML={{ 
            __html: explanation
              // Extract only the numbered items with proper titles and descriptions
              .match(/\d+\. \*\*.*?\*\*:[\s\S]*?(?=\d+\. \*\*|$)/g)
              ?.map(item => {
                const match = item.match(/\d+\. \*\*(.*?)\*\*: ([\s\S]*)/);
                if (!match) return '';
                const [_, title, description] = match;
                return `<span class="explanation-title">${title}</span><span class="explanation-description">${description.trim()}</span>`;
              })
              .join('') || ''
          }} 
        />
      </ExplanationContainer>
    </Container>
  );
};

export default OptimizedPrompt; 