import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, scaleTime, max, format, timeFormat, extent } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import ReactDropdown from 'react-dropdown';

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 165, left: 90 };
const xAxisLabelOffset = 50;

// This is used to move the label from the y axis values
const yAxisLabelOffset = 60;

const attributes = [
    {value: "AlcoholUseDisorders", label: 'Alcohol Use Disorders'},
    {value: "DrugUseDisorders", label: 'Drug Use Disorders'},
    {value: "DepressiveDisorders", label: 'Depressive Disorders'},
    {value: "BipolarDisorder", label: 'Bipolar Disorder'},
    {value: "AnxietyDisorders", label: 'Anxiety Disorders'},
  	{value: "EatingDisorders", label: 'Eating Disorders'},
  	{value: "Schizophrenia", label: 'Schizophrenia'}
];

const americanCountries = [
    {value: "Costa Rica", label: 'Costa Rica'},
    {value: "Argentina", label: 'Argentina'},
    {value: "Guatemala", label: 'Guatemala'},
    {value: "Honduras", label: 'Honduras'},
    {value: "Colombia", label: 'Colombia'},
  	{value: "Ecuador", label: 'Ecuador'}
];

const getLabel = value => {
	for(let i = 0; i < attributes.length; i++){
    if(attributes[i].value === value){
      return attributes[i].label;
    }
}
};

const App = () => {
  const data = useData();
  
  // Mental disease menu
  const initialYAttribute = 'Schizophrenia';
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = d => d[yAttribute];
  const yAxisLabel = "Percentage of the Population ";
  
  // Country Filter Menu
  const initialCountryAttribute = 'Costa Rica';
  const [countryAttribute, setCountryAttribute] = useState(initialCountryAttribute);

  if (!data) {
    return <pre>Loading...</pre>;
  }
  
  // Get all countries names
  var countriesList = [];
  const getCountriesFromData = data.forEach(function(d) {
    countriesList.push(d.Entity);
  });
  
  // Get all unique countries names
  const uniqueCountriesList = Array.from(new Set(countriesList));
  
  const countriesDictionaryList = [];
  uniqueCountriesList.map(country => {
    countriesDictionaryList.push({
      value:   country,
      label: country
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

  const xValue = d => d.Year;
  const xAxisLabel = 'Years';
  const xAxisTickFormat = timeFormat('%Y');

  const xScale = scaleTime()
    .domain(extent(filteredData, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(filteredData, yValue))
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
        <span className="dropdown-label">Mental disease</span>
        <ReactDropdown 
          options={attributes}
          value={yAttribute}
          onChange={({value}) => setYAttribute(value)}
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
          <Marks
            data={filteredData}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={3}
          />
        </g>
      </svg>
    </>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
