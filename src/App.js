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
  const [showAnimation, setShowAnimation] = useState(false);
  const [appState, setAppState] = useState('input'); // 'input', 'loading', 'result'
  const [bgColor, setBgColor] = useState('#FF00FF'); // Magenta color initially
  const [optimizedResult, setOptimizedResult] = useState(null);
  const [appReady, setAppReady] = useState(false);
  const [isInitialTransitionComplete, setIsInitialTransitionComplete] = useState(false);
  
  useEffect(() => {
    console.log('App mounted');
  }, []);
  
  // Handler for when CoverPage "Get Started" is clicked
  const handleCoverComplete = () => {
    console.log('Cover page animation complete, starting transition to color grid');
    // Start the pink transition when cover animation completes
    setIsCoverTransitioning(true);
    
    // Safety timeout to ensure we don't get stuck
    setTimeout(() => {
      if (isCoverTransitioning) {
        console.log('Safety timeout: color grid transition taking too long, forcing completion');
        handleCoverTransitionComplete();
      }
    }, 5000); // 5 second safety timeout
  };
  
  // Handler for when the color grid transition to pink completes
  const handleCoverTransitionComplete = () => {
    console.log('Color grid transition to pink complete, showing main app');
    // This is called when the pink color transition is complete
    setShowCover(false);
    setIsCoverTransitioning(false);
    
    // Delay setting app ready to ensure the cover is fully gone
    setTimeout(() => {
      setAppReady(true);
      setIsInitialTransitionComplete(true);
    }, 300);
  };
  
  // Legacy handler kept for backward compatibility
  const handleGetStarted = () => {
    console.log('Legacy handleGetStarted called');
    // This is now handled by the multi-step transition
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
  
  // Function to preload the main app content
  const preloadMainApp = async () => {
    return new Promise((resolve) => {
      console.log('Preloading main app content');
      // Set a flag that we're ready to show the main app
      setTimeout(resolve, 500);
    });
  };
  
  // Render the ColorGrid component when needed
  const renderColorGrid = () => {
    console.log('Rendering ColorGrid with:', {
      isVisible: showAnimation || isCoverTransitioning,
      isCoverTransitioning,
      appState,
      finalColor: isCoverTransitioning ? '#FF00FF' : (appState === 'loading' ? '#FFFF00' : null)
    });
    
    return (
      <ColorGrid 
        isVisible={showAnimation || isCoverTransitioning}
        gridWidth={20}
        gridHeight={12}
        colors={['#00FFFF', '#FF00FF', '#FFFF00', '#000000', '#FFFFFF']}
        transitionDuration={isCoverTransitioning ? 500 : 200}
        transitionDelay={isCoverTransitioning ? 200 : 30}
        finalColor={isCoverTransitioning ? '#FF00FF' : (appState === 'loading' ? '#FFFF00' : null)}
        onFinalColorComplete={isCoverTransitioning ? handleCoverTransitionComplete : null}
        onAnimationComplete={!isCoverTransitioning ? () => setShowAnimation(false) : null}
      />
    );
  };
  
  return (
    <>
      <GlobalStyles />
      <AppBackground $bgColor={bgColor} />
      <AppContainer $bgColor={bgColor}>
        {/* The color grid is always rendered when needed */}
        {(showAnimation || isCoverTransitioning) && renderColorGrid()}
        
        {/* The cover page is on top of everything else */}
        {showCover && (
          <CoverPage 
            onComplete={handleCoverComplete} 
            onGetStarted={handleGetStarted}
            onPreloadContent={preloadMainApp}
          />
        )}
        
        {/* Main content container - only visible when cover is gone and not animating */}
        <ContentContainer $visible={appReady && !showAnimation && !showCover}>
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
        
        {appReady && !showCover && <Footer currentPage={appState === 'result' ? 'result' : 'input'} />}
      </AppContainer>
    </>
  );
}

export default App; 