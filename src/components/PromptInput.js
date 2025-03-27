import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 4rem 2rem;
  min-height: 20rem;
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  max-width: 100rem;
  padding: 1.6rem;
  font-size: 2.5rem;
  border: none;
  background: transparent;
  color: white;
  border-bottom: 0.2rem solid white;
  outline: none;
  font-family: 'Agdasima', sans-serif;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const OptimizeButton = styled.button`
  position: absolute;
  right: ${props => props.right}px;
  display: flex;
  align-items: center;
  padding: 1.6rem;
  border: 0.2rem solid black;
  background-color: white;
  text-transform: uppercase;
  font-family: 'Agdasima', sans-serif;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.3s ease;
  transform: ${props => props.visible ? 'scale(1)' : 'scale(0.9)'};
  opacity: ${props => props.visible ? '1' : '0'};
  pointer-events: ${props => props.visible ? 'all' : 'none'};
  
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

const PromptInput = ({ onOptimize }) => {
  const [prompt, setPrompt] = useState('');
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(0);
  const inputRef = useRef(null);
  
  useEffect(() => {
    console.log('PromptInput mounted');
    // Focus the input automatically
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  useEffect(() => {
    if (prompt.length > 0) {
      setButtonVisible(true);
      
      // Calculate button position based on input width
      if (inputRef.current) {
        const inputWidth = inputRef.current.offsetWidth;
        const promptLength = prompt.length;
        const charWidth = inputWidth / 50; // Estimate character width
        const textWidth = promptLength * charWidth;
        const maxPosition = inputWidth - 150; // Button width + padding
        const newPosition = Math.min(textWidth + 20, maxPosition);
        
        setButtonPosition(newPosition);
      }
    } else {
      setButtonVisible(false);
    }
  }, [prompt]);
  
  const handleKeyDown = (e) => {
    // Submit on Enter key
    if (e.key === 'Enter' && prompt.trim() !== '') {
      handleOptimize();
    }
  };
  
  const handleOptimize = () => {
    console.log('Optimizing prompt:', prompt);
    if (onOptimize) {
      onOptimize(prompt);
    }
  };
  
  return (
    <InputContainer>
      <StyledInput
        ref={inputRef}
        type="text"
        placeholder="Click to enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <OptimizeButton 
        visible={buttonVisible}
        right={buttonPosition}
        onClick={handleOptimize}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16L7 11H17L12 16Z" fill="currentColor" />
          <path d="M12 8L17 13H7L12 8Z" fill="currentColor" />
        </svg>
        Optimize
      </OptimizeButton>
    </InputContainer>
  );
};

export default PromptInput; 