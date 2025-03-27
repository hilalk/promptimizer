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

const colors = ['#00FFFF', '#FF00FF', '#FFFF00', '#000000', '#FFFFFF']; // CMYK + White

const ColorGrid = ({ onAnimationComplete, isVisible }) => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!isVisible) return;
    
    console.log('Starting ColorGrid animation');
    
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
      .attr('width', boxSize)
      .attr('height', boxSize)
      .attr('fill', d => d.color);
    
    // Animation function to change colors with a wave effect
    function animateColors() {
      squares
        .transition()
        .duration(500)
        .delay((d) => d.row * 20) // Wave effect: delay based on row
        .attr('fill', () => colors[Math.floor(Math.random() * colors.length)])
        .on('end', function(d, i) {
          if (i === 0) { // Only trigger on the first element to avoid multiple calls
            animateColors();
          }
        });
    }
    
    // Start animation
    animateColors();
    
    // Transition to final state with wave effect
    function transitionToFinalColor() {
      const finalColor = '#FF00FF'; // Magenta for final state
      
      squares
        .transition()
        .duration(500)
        .delay((d) => (d.row + d.col) * 15) // Diagonal wave pattern
        .attr('fill', finalColor)
        .on('end', function(d, i) {
          if (i === gridData.length - 1) { // Callback on last square
            if (onAnimationComplete) {
              onAnimationComplete();
            }
          }
        });
    }
    
    // Set timeout to complete animation with final transition
    const timer = setTimeout(() => {
      console.log('ColorGrid animation transitioning to final state');
      transitionToFinalColor();
    }, 1500); // Run colorful animation for 1.5 seconds before final transition
    
    // Cleanup function
    return () => {
      clearTimeout(timer);
      svg.selectAll('*').remove();
    };
  }, [isVisible, onAnimationComplete]);
  
  if (!isVisible) return null;
  
  return (
    <ColorGridContainer>
      <svg ref={svgRef}></svg>
    </ColorGridContainer>
  );
};

export default ColorGrid; 