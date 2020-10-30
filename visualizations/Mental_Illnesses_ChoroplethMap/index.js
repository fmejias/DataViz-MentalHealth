import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { scaleTime, extent } from 'd3';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
import { useCodes } from './useCodes';
import { WorldMap } from './WorldMap/index.js';
import { LineChart } from './LineChart/index.js';

const width = 960;
const height = 500;
const lineChartSize = 0.2;
const margin = { top: 0, right: 30, bottom: 30, left: 50 };
const innerWidth = width - margin.left - margin.right;

const App = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();
  const codes = useCodes();
  const initialMousePosition = { x: innerWidth / 2, y: height - 130 };
  const [mousePosition, setMousePosition] = useState(initialMousePosition);

  const handleMouseMove = useCallback(
    (event) => {
      const { clientX, clientY } = event;
      if (
        clientX > 0 &&
        clientX < width - 130 &&
        clientY > 400 &&
        clientY < height
      ) {
        setMousePosition({ x: clientX, y: clientY });
      }
    },
    [setMousePosition]
  );

  if (!worldAtlas || !data || !codes) {
    return <pre>Loading...</pre>;
  }

  const xValue = (d) => d.Year;
  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  // Get selected year by moving the vertical line
  const selectedYear = xScale.invert(mousePosition.x);

  return (
    <svg width={width} height={height} onMouseMove={handleMouseMove}>
      
      <WorldMap
        data={data}
        codes={codes}
        selectedYear={selectedYear}
        worldAtlas={worldAtlas}
      />
      <g transform={`translate(0, ${height - lineChartSize * height})`}>
        <LineChart
          data={data}
          selectedYear={selectedYear}
          width={width}
          height={lineChartSize * height}
        />
      </g>
    </svg>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
