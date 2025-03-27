import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const blink = keyframes`
  from, to { opacity: 1; }
  50% { opacity: 0; }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 4rem 2rem;
  min-height: 20rem;
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 1.6rem;
  left: 0;
  font-size: 7rem;
  color: black;
  font-family: 'Agdasima', sans-serif;
  pointer-events: none;
  animation: ${fadeInUp} 0.8s ease-out forwards;
`;

const Cursor = styled.span`
  display: inline-block;
  margin-left: 0.2rem;
  animation: ${blink} 1s step-end infinite;
`;

const StyledInput = styled.textarea`
  width: 100%;
  max-width: 100rem;
  padding: 1.6rem;
  font-size: 7rem;
  border: none;
  background: transparent;
  color: black;
  outline: none;
  font-family: 'Agdasima', sans-serif;
  resize: none;
  overflow: hidden;
  min-height: 9rem;
  
  &::placeholder {
    color: transparent; // Hide the native placeholder
  }
`;

const OptimizeButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  align-self: flex-end;
  padding: 1.6rem;
  border: 0.2rem solid black;
  background-color: white;
  text-transform: uppercase;
  font-family: 'Agdasima', sans-serif;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.3s ease;
  transform: ${props => props.$visible ? 'scale(1)' : 'scale(0.9)'};
  opacity: ${props => props.$visible ? '1' : '0'};
  pointer-events: ${props => props.$visible ? 'all' : 'none'};
  
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

const PromptInput = ({ onOptimize, shouldStartAnimation = false }) => {
  const [prompt, setPrompt] = useState('');
  const [buttonVisible, setButtonVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [typedPlaceholder, setTypedPlaceholder] = useState('');
  const fullPlaceholder = "Click to enter prompt";
  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  
  // Wait for the main app transition before showing placeholder
  useEffect(() => {
    if (shouldStartAnimation) {
      setShowPlaceholder(true);
    }
  }, [shouldStartAnimation]);
  
  // Typewriter effect for placeholder
  useEffect(() => {
    if (!showPlaceholder) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullPlaceholder.length) {
        setTypedPlaceholder(fullPlaceholder.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 80); // Speed of typing
    
    return () => clearInterval(interval);
  }, [showPlaceholder]);
  
  useEffect(() => {
    console.log('PromptInput mounted');
    // Focus handled separately for typewriter effect
  }, []);
  
  useEffect(() => {
    // Show button if there's text in the input
    if (prompt.length > 0) {
      setButtonVisible(true);
      setShowPlaceholder(false);
    } else {
      setButtonVisible(false);
      if (!isFocused) {
        setShowPlaceholder(true);
      }
    }
  }, [prompt, isFocused]);
  
  // Auto-resize the textarea when content changes
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  
  // Update height when prompt changes
  useEffect(() => {
    adjustHeight();
  }, [prompt]);
  
  const handleFocus = () => {
    setIsFocused(true);
    setShowPlaceholder(false);
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    setShowPlaceholder(prompt.length === 0);
  };
  
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
  
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };
  
  return (
    <InputContainer onClick={handleContainerClick}>
      <InputWrapper>
        <div style={{ position: 'relative', width: '100%' }}>
          {showPlaceholder && !isFocused && (
            <Placeholder>
              {typedPlaceholder}<Cursor>|</Cursor>
            </Placeholder>
          )}
          <StyledInput
            ref={(el) => {
              textareaRef.current = el;
              inputRef.current = el;
            }}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            rows={1}
          />
        </div>
        
        {buttonVisible && (
          <OptimizeButton 
            $visible={true}
            onClick={handleOptimize}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16L7 11H17L12 16Z" fill="currentColor" />
              <path d="M12 8L17 13H7L12 8Z" fill="currentColor" />
            </svg>
            Optimize
          </OptimizeButton>
        )}
      </InputWrapper>
    </InputContainer>
  );
};

export default PromptInput; 