import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, scaleTime, max, min, format, timeFormat, extent } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import ReactDropdown from 'react-dropdown';
import { ColorLegend } from './ColorLegend';

const width = 960;
const height = 500;
const margin = { top: 20, right: 230, bottom: 165, left: 90 };
const xAxisLabelOffset = 50;

// This is used to move the label from the y axis values
const yAxisLabelOffset = 60;

const americanCountries = [
    {value: "Costa Rica", label: 'Costa Rica'},
    {value: "Argentina", label: 'Argentina'},
    {value: "Guatemala", label: 'Guatemala'},
    {value: "Honduras", label: 'Honduras'},
    {value: "Colombia", label: 'Colombia'},
  	{value: "Ecuador", label: 'Ecuador'}
];

const App = () => {
  const data = useData();
  
  // Unemployment data
  const yUnemploymentValue = d => d["Unemployment"];
  
  // Country Filter Menu
  const initialCountryAttribute = 'Costa Rica';
  const [countryAttribute, setCountryAttribute] = useState(initialCountryAttribute);

  if (!data) {
    return <pre>Loading...</pre>;
  }
  
  // Get all countries names
  var countriesList = [];
  const getCountriesFromData = data.forEach(function (d) {
    countriesList.push(d.Entity);
  });

  // Get all unique countries names
  const uniqueCountriesList = Array.from(new Set(countriesList));

  const countriesDictionaryList = [];
  uniqueCountriesList.map((country) => {
    countriesDictionaryList.push({
      value: country,
      label: country,
    });
  });
  
  // Filter Costa Rica Data
  const filteredData = data.filter(function(d) 
	{ 
		if(d["Entity"] == countryAttribute){ 
      return d;
    } 
  });

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  
  const circleRadius = 7;

  const xValue = d => d.Year;
  const xAxisLabel = 'Years';
  const xAxisTickFormat = timeFormat('%Y');
  
  const yMentalIllnessValue = d => d.TotalPercentageOfPopulation;
  const yAxisLabel = "Percentage of the Population ";

  const xScale = scaleTime()
    .domain(extent(filteredData, xValue))
    .range([0, innerWidth])
    .nice();
  
  // Set yScale
  const yMentalIllnessValueMinMax = extent(filteredData, yMentalIllnessValue);
  const yUnemploymentValueMinMax = extent(filteredData, yUnemploymentValue);
  const yMergeMinMaxValues = yMentalIllnessValueMinMax.concat(yUnemploymentValueMinMax);
  const yMinValue = min(yMergeMinMaxValues);
  const yMaxValue = max(yMergeMinMaxValues);

  const yScale = scaleLinear()
    .domain([yMinValue, yMaxValue])
    .range([innerHeight, 0])
  	.nice();

  return (
    <>
      <div className="menus-container">
        <span className="dropdown-label">Country</span>
        <ReactDropdown 
          options={countriesDictionaryList}
          value={countryAttribute}
          onChange={({value}) => setCountryAttribute(value)}
        />
    	</div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            tickOffset={7}
          />
          <text
            className="axis-label"
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset},${innerHeight /
              2}) rotate(-90)`}
          >
            {yAxisLabel}
          </text>
          <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={7} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
          <g transform={`translate(${innerWidth + 60}, 0)`}>
            <ColorLegend 
              tickSpacing={22}
              tickSize={circleRadius}
              tickTextOffset={12}
            />
          </g>
          <Marks
            data={filteredData}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yMentalIllnessValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={3}
            colorValue={"Green"}
          />
          <Marks
            data={filteredData}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yUnemploymentValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={3}
            colorValue={"Orange"}
          />
        </g>
      </svg>
    </>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
