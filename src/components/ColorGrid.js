import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(${props => props.$gridWidth}, 1fr);
  grid-template-rows: repeat(${props => props.$gridHeight}, 1fr);
  z-index: ${props => props.$zIndex};
`;

const Cell = styled.div`
  background-color: ${props => props.$color};
  transition: background-color ${props => props.$transitionDuration}ms ${props => props.$transitionDelay}ms ease;
`;

const ColorGrid = ({ 
  gridWidth = 20, 
  gridHeight = 12, 
  colors = ['#00FFFF', '#FF00FF', '#FFFF00', '#000000', '#00FF33', '#FFFFFF'],
  transitionDuration = 100,
  transitionDelay = 100,
  finalColor = null,
  onFinalColorComplete = () => {},
  zIndex = -1
}) => {
  const [cells, setCells] = useState([]);

  useEffect(() => {
    // Initialize grid with random colors
    const totalCells = gridWidth * gridHeight;
    const initialCells = Array(totalCells).fill(null).map(() => {
      return colors[Math.floor(Math.random() * colors.length)];
    });
    setCells(initialCells);

    // Set up color change interval if no finalColor is specified
    if (!finalColor) {
      const interval = setInterval(() => {
        setCells(prevCells => {
          return prevCells.map(() => colors[Math.floor(Math.random() * colors.length)]);
        });
      }, transitionDuration + transitionDelay);

      return () => clearInterval(interval);
    }
  }, [colors, gridWidth, gridHeight, transitionDuration, transitionDelay]);

  // Handle transition to final color
  useEffect(() => {
    if (finalColor) {
      setCells(prev => prev.map(() => finalColor));
      // Call the completion callback after the transition
      const timeout = setTimeout(() => {
        onFinalColorComplete();
      }, transitionDuration + transitionDelay);
      return () => clearTimeout(timeout);
    }
  }, [finalColor, transitionDuration, transitionDelay, onFinalColorComplete]);

  return (
    <GridContainer 
      $gridWidth={gridWidth} 
      $gridHeight={gridHeight}
      $zIndex={zIndex}
    >
      {cells.map((color, index) => (
        <Cell
          key={index}
          $color={color}
          $transitionDuration={transitionDuration}
          $transitionDelay={transitionDelay}
        />
      ))}
    </GridContainer>
  );
};

export default ColorGrid; 