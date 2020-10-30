import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  csv,
  scaleLinear,
  scaleTime,
  max,
  format,
  timeFormat,
  extent,
} from 'd3';
import { useData } from './useData';
import { MentalDiseasesLineChart } from './MentalDiseasesLineChart/index.js';
import { MentalDiseasesBarChart } from './MentalDiseasesBarChart/index.js';
import { SuicidesLineChart } from './SuicidesLineChart/index.js';
import { UnemploymentLineChart } from './UnemploymentLineChart/index.js';
import ReactDropdown from 'react-dropdown';

const width = 960;
const height = 500;
const lineChartSize = 0.2;

const attributes = [
  { value: 'AlcoholUseDisorders', label: 'Alcohol Use Disorders' },
  { value: 'DrugUseDisorders', label: 'Drug Use Disorders' },
  { value: 'DepressiveDisorders', label: 'Depressive Disorders' },
  { value: 'BipolarDisorder', label: 'Bipolar Disorder' },
  { value: 'AnxietyDisorders', label: 'Anxiety Disorders' },
  { value: 'EatingDisorders', label: 'Eating Disorders' },
  { value: 'Schizophrenia', label: 'Schizophrenia' },
];

const dropdownOptions = [
    {value: "1995", label: '1995'},
    {value: "2000", label: '2000'},
    {value: "2005", label: '2005'},
    {value: "2010", label: '2010'},
    {value: "2015", label: '2015'}
];

const App = () => {
  const data = useData();
  
  // Mental disease and Unemployment Bar Chart Menu
  const [hoveredValue, setHoveredValue] = useState(null);
  
  // Mental disease and Unemployment Bar Chart Years menu
  const initialYear = '2005';
  const [year, setYear] = useState(initialYear);
  
  // Suicides Line Chart Menu
  const suicidesInitialCountryAttribute = 'Costa Rica';
  const [suicidesCountryAttribute, setSuicidesCountryAttribute] = useState(
    suicidesInitialCountryAttribute
  );
  
  // Unemployment Line Chart Menu
  const unemploymentInitialCountryAttribute = 'Costa Rica';
  const [unemploymentCountryAttribute, setUnemploymentCountryAttribute] = useState(
    unemploymentInitialCountryAttribute
  );

  // Mental disease Line Chart Menu
  const initialYAttribute = 'Schizophrenia';
  const [yAttribute, setYAttribute] = useState(initialYAttribute);

  // Country Filter Menu
  const initialCountryAttribute = 'Costa Rica';
  const [countryAttribute, setCountryAttribute] = useState(
    initialCountryAttribute
  );

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

  return (
    <>
      <div className="mental-illness-title-container"> 
        <span className="mental-title-label">Mental illnesses over the years</span>
        <span className="top-unemployment-title-label">Top 5 of the countries most affected by unemployment</span>
      </div>
      <div className="line-chart-menus-container">
        <span className="line-chart-dropdown-label">Country</span>
        <ReactDropdown
          options={countriesDictionaryList}
          value={countryAttribute}
          onChange={({ value }) => setCountryAttribute(value)}
        />
        <span className="line-chart-dropdown-label">Mental disease</span>
        <ReactDropdown
          options={attributes}
          value={yAttribute}
          onChange={({ value }) => setYAttribute(value)}
        />
        <div className="bar-chart-menus-container">
          <span className="bar-chart-dropdown-label">Year</span>
          <ReactDropdown 
            options={dropdownOptions}
            value={year}
            onChange={({value}) => setYear(value)}
          />
        </div>
      </div>
      
      <div className="suicides-title-container"> 
        <span className="suicides-title-label">Share of deaths from suicide</span>
        <span className="unemployment-title-label">Mental illness and Unemployment</span>
      </div>
      
      <div className="suicides-menus-container">
        
        <span className="bar-chart-dropdown-label">Country</span>
        <ReactDropdown
          options={countriesDictionaryList}
          value={suicidesCountryAttribute}
          onChange={({ value }) => setSuicidesCountryAttribute(value)}
        />
        <div className="bar-chart-menus-container">
          <span className="bar-chart-dropdown-label">Country</span>
          <ReactDropdown 
            options={countriesDictionaryList}
            value={unemploymentCountryAttribute}
            onChange={({value}) => setUnemploymentCountryAttribute(value)}
          />
        </div>
      </div>
      
      <svg width={width} height={height}>
        <g transform={`translate(0, 40)`}>
          <MentalDiseasesLineChart
            data={data}
            width={width / 2}
            height={lineChartSize * height + 20}
            yAttribute={yAttribute}
            countryAttribute={countryAttribute}
          />
        </g>
        <g transform={`translate(${width/2 - 60}, 40)`}>
          <MentalDiseasesBarChart
            data={data}
            width={width / 2 + 60}
            height={lineChartSize * height + 20}
            year={year}
            hoveredValue={hoveredValue}
            setHoveredValue={setHoveredValue}
          />
        </g>      
        <g transform={`translate(0, 286)`}>
          <SuicidesLineChart
            data={data}
            width={width / 2}
            height={lineChartSize * height + 20}
            countryAttribute={suicidesCountryAttribute}
          />
        </g>
        <g transform={`translate(${width/2 - 100}, 276)`}>
          <UnemploymentLineChart
            data={data}
            width={width / 2 + 80}
            height={lineChartSize * height + 20}
            countryAttribute={unemploymentCountryAttribute}
          />
        </g>
      </svg>
    </>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
