import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const ColorGridContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColorGrid = ({ 
  isVisible, 
  onAnimationComplete,
  gridWidth = 20,
  gridHeight = 12,
  colors = ['#00FFFF', '#FF00FF', '#FFFF00', '#000000', '#FFFFFF'],
  transitionDuration = 200,
  transitionDelay = 30,
  finalColor = null,
  onFinalColorComplete = null
}) => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!isVisible || !svgRef.current) return;
    
    console.log('Starting ColorGrid animation', finalColor ? 'with final color' : 'with random colors');
    
    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Set SVG dimensions
    svg.attr('width', width).attr('height', height);
    
    // Calculate grid dimensions
    const boxSize = 100;
    const cols = Math.ceil(width / boxSize);
    const rows = Math.ceil(height / boxSize);
    
    // Create grid data
    const gridData = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        gridData.push({
          x: j * boxSize,
          y: i * boxSize,
          width: boxSize,
          height: boxSize,
          color: colors[Math.floor(Math.random() * colors.length)],
          row: i,
          col: j
        });
      }
    }
    
    // Create grid squares
    const squares = svg.selectAll('rect')
      .data(gridData)
      .enter()
      .append('rect')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('width', d => d.width)
      .attr('height', d => d.height)
      .attr('fill', d => d.color);
    
    // Animation function to change colors with a wave effect
    function animateRandomColors() {
      squares
        .transition()
        .duration(transitionDuration)
        .delay(d => d.row * 20) // Wave effect based on row
        .attr('fill', () => colors[Math.floor(Math.random() * colors.length)])
        .on('end', function(d, i) {
          if (i === 0) { // Only trigger on the first element
            if (!finalColor) {
              setTimeout(animateRandomColors, transitionDelay);
            }
          }
        });
    }
    
    // Function to transition to final color with wave effect
    function transitionToFinalColor() {
      console.log('Transitioning to final color:', finalColor);
      
      let transitionEndCount = 0;
      const totalSquares = gridData.length;
      
      squares
        .transition()
        .duration(500)
        .delay(d => d.row * 20) // Changed to top-to-bottom only pattern
        .attr('fill', finalColor)
        .on('end', function() {
          transitionEndCount++;
          // Call the callback when all transitions have completed
          if (transitionEndCount >= totalSquares) {
            console.log('Final color transition complete - all squares transitioned');
            if (onFinalColorComplete) {
              onFinalColorComplete();
            }
          }
        });
    }
    
    // Start the animation sequence
    if (finalColor) {
      // Directly transition to final color with wave effect
      console.log('Starting final color transition with wave effect');
      transitionToFinalColor();
      
      // Add a safety timeout to ensure callback is called even if transitions don't complete
      const safetyTimer = setTimeout(() => {
        console.log('Safety timeout triggered for final color transition');
        if (onFinalColorComplete) {
          onFinalColorComplete();
        }
      }, 3000); // 3 second safety timeout
      
      // Return cleanup function
      return () => {
        console.log('Cleaning up safety timer');
        clearTimeout(safetyTimer);
      };
    } else {
      // Start random color animation
      animateRandomColors();
      
      // Set timeout to complete animation
      const timer = setTimeout(() => {
        console.log('ColorGrid random animation complete');
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 2000); // Animation runs for 2 seconds
      
      // Return cleanup function
      return () => clearTimeout(timer);
    }
  }, [isVisible, onAnimationComplete, gridWidth, gridHeight, colors, 
      transitionDuration, transitionDelay, finalColor, onFinalColorComplete]);
  
  if (!isVisible) return null;
  
  return (
    <ColorGridContainer>
      <svg ref={svgRef}></svg>
    </ColorGridContainer>
  );
};

export default ColorGrid; 