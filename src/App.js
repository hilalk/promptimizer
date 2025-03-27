import { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
import CoverPage from './components/CoverPage';
import ColorGrid from './components/ColorGrid';
import PromptInput from './components/PromptInput';
import OptimizedPrompt from './components/OptimizedPrompt';
import Footer from './components/Footer';
import { optimizePrompt } from './services/api';

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${props => props.bgColor};
  transition: background-color 0.5s ease;
  padding-bottom: 6rem;
`;

const ContentContainer = styled.div`
  padding: 2rem;
  max-width: 120rem;
  margin: 0 auto;
  opacity: ${props => props.visible ? '1' : '0'};
  transition: opacity 0.5s ease;
`;

function App() {
  const [showCover, setShowCover] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);
  const [appState, setAppState] = useState('input'); // 'input', 'loading', 'result'
  const [bgColor, setBgColor] = useState('#FF00FF'); // Magenta color initially
  const [optimizedResult, setOptimizedResult] = useState(null);
  const [appReady, setAppReady] = useState(false);
  
  useEffect(() => {
    console.log('App mounted');
  }, []);
  
  const handleGetStarted = () => {
    console.log('App starting...');
    setShowCover(false);
    setShowAnimation(true);
    
    // After animation completes
    setTimeout(() => {
      setShowAnimation(false);
      setAppReady(true);
    }, 2000); // Animation duration
  };
  
  const handleOptimize = async (promptText) => {
    console.log('Optimizing prompt...');
    setAppState('loading');
    setShowAnimation(true);
    setBgColor('#FFFF00'); // Change background to yellow during optimization
    
    try {
      const result = await optimizePrompt(promptText);
      console.log('Optimization complete:', result);
      setOptimizedResult(result);
      setAppState('result');
    } catch (error) {
      console.error('Optimization failed:', error);
      alert('Failed to optimize prompt. Please try again.');
      setAppState('input');
      setBgColor('#FF00FF'); // Reset background color
    } finally {
      setShowAnimation(false);
    }
  };
  
  const handleNewPrompt = () => {
    console.log('Resetting for new prompt');
    setAppState('input');
    setBgColor('#FF00FF');
    setOptimizedResult(null);
  };
  
  return (
    <>
      <GlobalStyles />
      <AppContainer bgColor={bgColor}>
        {showCover && (
          <CoverPage onGetStarted={handleGetStarted} />
        )}
        
        <ColorGrid 
          isVisible={showAnimation} 
          onAnimationComplete={() => setShowAnimation(false)} 
        />
        
        <ContentContainer visible={appReady && !showAnimation}>
          {appState === 'input' && (
            <PromptInput onOptimize={handleOptimize} />
          )}
          
          {appState === 'result' && optimizedResult && (
            <OptimizedPrompt 
              optimizedPrompt={optimizedResult.optimizedPrompt}
              explanation={optimizedResult.explanation}
              onNewPrompt={handleNewPrompt}
            />
          )}
        </ContentContainer>
        
        {appReady && !showCover && <Footer />}
      </AppContainer>
    </>
  );
}

export default App; 