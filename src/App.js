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
  background-color: ${props => props.$bgColor};
  transition: background-color 0.5s ease;
  padding-bottom: 6rem;
`;

const ContentContainer = styled.div`
  padding: 2rem;
  max-width: 120rem;
  margin: 0 auto;
  opacity: ${props => props.$visible ? '1' : '0'};
  transition: opacity 0.5s ease;
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  position: relative;
  z-index: 1;
`;

const AppBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.$bgColor};
  transition: background-color 0.5s ease;
  z-index: 0;
`;

function App() {
  const [showCover, setShowCover] = useState(true);
  const [isCoverTransitioning, setIsCoverTransitioning] = useState(false);
  const [appState, setAppState] = useState('input'); // 'input', 'loading', 'result'
  const [bgColor, setBgColor] = useState('#FF00FF'); // Magenta color initially
  const [optimizedResult, setOptimizedResult] = useState(null);
  const [appReady, setAppReady] = useState(false);
  const [isInitialTransitionComplete, setIsInitialTransitionComplete] = useState(false);
  const [showLoadingGrid, setShowLoadingGrid] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  
  useEffect(() => {
    console.log('App mounted');
  }, []);
  
  // Handler for when CoverPage "Get Started" is clicked
  const handleCoverComplete = () => {
    console.log('Cover page animation complete, starting transition to main app');
    setIsCoverTransitioning(true);
    
    // Start showing the main app content while the cover fades out
    setAppReady(true);
    
    // Complete the transition after the cover animation
    setTimeout(() => {
      setShowCover(false);
      setIsCoverTransitioning(false);
      setIsInitialTransitionComplete(true);
    }, 1000);
  };
  
  const handleOptimize = async (promptText) => {
    console.log('Optimizing prompt...');
    setAppState('loading');
    setShowLoadingGrid(true);
    setIsFadingOut(false);
    setBgColor('#FFFF00'); // Change background to yellow during optimization
    
    try {
      const result = await optimizePrompt(promptText);
      console.log('Optimization complete:', result);
      
      // Start the ColorGrid fade-out animation
      setIsFadingOut(true);
      
      // Store the result but don't show it yet
      setOptimizedResult(result);
      
      // Wait for ColorGrid fade-out animation (300ms) plus a small buffer (100ms)
      // before transitioning to the result state
      setTimeout(() => {
        setShowLoadingGrid(false);
        setIsFadingOut(false);
        // Set appState to result last, which will trigger OptimizedPrompt to fade in
        setAppState('result');
      }, 400);
    } catch (error) {
      console.error('Optimization failed:', error);
      alert('Failed to optimize prompt. Please try again.');
      setAppState('input');
      setBgColor('#FF00FF'); // Reset background color
      setShowLoadingGrid(false);
    }
  };
  
  const handleNewPrompt = () => {
    console.log('Resetting for new prompt');
    setAppState('input');
    setBgColor('#FF00FF');
    setOptimizedResult(null);
  };
  
  // Function to preload the main app content
  const preloadMainApp = async () => {
    return new Promise((resolve) => {
      console.log('Preloading main app content');
      // Set a flag that we're ready to show the main app
      setTimeout(resolve, 500);
    });
  };
  
  return (
    <>
      <GlobalStyles />
      <AppBackground $bgColor={bgColor} />
      <AppContainer $bgColor={bgColor}>
        {/* The loading color grid */}
        {showLoadingGrid && (
          <ColorGrid
            colors={['#00FFFF', '#FF00FF', '#FFFF00', '#000000', '#00FF33', '#FFFFFF']}
            transitionDuration={100}
            transitionDelay={100}
            zIndex={998}
            finalColor={isFadingOut ? '#FFFF00' : null}
          />
        )}
        
        {/* The cover page */}
        {showCover && (
          <CoverPage 
            onComplete={handleCoverComplete}
            onPreloadContent={preloadMainApp}
          />
        )}
        
        {/* Main content container */}
        <ContentContainer $visible={appReady}>
          {appState === 'input' && (
            <PromptInput 
              onOptimize={handleOptimize}
              shouldStartAnimation={isInitialTransitionComplete}
            />
          )}
          
          {appState === 'result' && optimizedResult && (
            <OptimizedPrompt 
              optimizedPrompt={optimizedResult.optimizedPrompt}
              explanation={optimizedResult.explanation}
              onNewPrompt={handleNewPrompt}
            />
          )}
        </ContentContainer>
        
        {appReady && (
          <Footer currentPage={appState === 'result' ? 'result' : 'input'} />
        )}
      </AppContainer>
    </>
  );
}

export default App; 