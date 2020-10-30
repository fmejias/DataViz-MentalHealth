import React from 'react';
import { interpolatePuBu, scaleSequential, max } from 'd3';
import { Marks } from './Marks';
import { ColorLegend } from './ColorLegend';

export const WorldMap = ({data, codes, selectedYear, worldAtlas}) => {
  	const numericCodeByAlphaCode = new Map();
    codes.forEach(code => {
      const alpha3Code = code["alpha-3"];
      const numericCode = code["country-code"];
      numericCodeByAlphaCode.set(alpha3Code, numericCode);
    });

    // Filter Data By Year 2017
    const filteredData = data.filter(d => d.Year.getFullYear() === selectedYear.getFullYear());

    const rowByNumericCode = new Map();
    filteredData.forEach(d => {
      const alpha3Code = d.Code;
      const numericCode = numericCodeByAlphaCode.get(alpha3Code);
      rowByNumericCode.set(numericCode, d);
    });
  
    // Country population that suffer a mental illness
    const colorValue = d => d.CountryPopulationWithMentalIllness;

    // Color scale 
    const colorScale = scaleSequential(d3.interpolateBlues)
      .domain([0, max(data, colorValue)]);
  
  	colorScale.domain().map((domainValue, i) => (
    	console.log(i)
    ));
  
    
    return ( 
      <>
      <g transform={`translate(20, 20)`}>
        <ColorLegend
          tickSpacing={22}
          tickSize={7}
          tickTextOffset={12}
          colorScale={colorScale}
        />
        <g className="tick" transform={`translate(30, ${270})`}>
          <circle fill={"black"} r={7} />
          <text x={12} dy=".32em"> {"Missing Data"} </text>
        </g>
      </g>
      <Marks
        worldAtlas={worldAtlas}
        rowByNumericCode={rowByNumericCode}
        colorScale={colorScale}
        colorValue={colorValue}
      />
        </>
    );
 };