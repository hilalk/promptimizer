import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ColorGrid = ({
  gridWidth = 20,
  gridHeight = 12,
  colors = ['#00FFFF', '#FF00FF', '#FFFF00', '#000000', '#00FF33', '#FFFFFF'],
  transitionDuration = 200,
  transitionDelay = 30,
  finalColor = null,
  onFinalColorComplete = null,
  zIndex = -1
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Store the current ref in a variable to use in cleanup
    const svg = svgRef.current;

    // Clear any existing content
    d3.select(svg).selectAll('*').remove();

    // Create the grid of rectangles
    const boxes = [];
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        boxes.push({
          x: (x / gridWidth) * 100,
          y: (y / gridHeight) * 100,
          width: (1 / gridWidth) * 100,
          height: (1 / gridHeight) * 100
        });
      }
    }

    // Add rectangles to the SVG
    const rectangles = d3.select(svg)
      .selectAll('rect')
      .data(boxes)
      .enter()
      .append('rect')
      .attr('x', (d) => d.x + '%')
      .attr('y', (d) => d.y + '%')
      .attr('width', (d) => d.width + '%')
      .attr('height', (d) => d.height + '%')
      .style('fill', () => colors[Math.floor(Math.random() * colors.length)]);

    // Function to update colors
    function updateColors() {
      if (finalColor) {
        // Create a wave-like transition based on position
        rectangles.each(function(d, i) {
          const y = Math.floor(i / gridWidth);
          
          d3.select(this)
            .transition()
            .delay(y * 20) // Delay based on vertical position only
            .duration(transitionDuration)
            .style('fill', finalColor)
            .on('end', function() {
              if (i === 0 && onFinalColorComplete) {
                onFinalColorComplete();
              }
            });
        });
        return;
      }

      rectangles
        .transition()
        .duration(transitionDuration)
        .style('fill', () => colors[Math.floor(Math.random() * colors.length)])
        .on('end', function() {
          // Only trigger the next update from one rectangle to avoid multiple intervals
          if (d3.select(this).attr('x') === '0%') {
            setTimeout(updateColors, transitionDelay);
          }
        });
    }

    // Start the animation
    updateColors();

    // Cleanup function
    return () => {
      // Clear any pending transitions and timeouts
      d3.select(svg).selectAll('*').interrupt();
    };
  }, [gridWidth, gridHeight, colors, transitionDuration, transitionDelay, finalColor, onFinalColorComplete]);

  return (
    <svg
      ref={svgRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: zIndex,
      }}
    />
  );
};

export default ColorGrid;