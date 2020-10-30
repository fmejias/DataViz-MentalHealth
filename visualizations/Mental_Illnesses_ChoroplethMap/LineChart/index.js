import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { scaleLinear, scaleTime, timeFormat, extent } from 'd3';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { MemoizedLineChartMarks } from './LineChartMarks';

const margin = { top: 0, right: 30, bottom: 20, left: 50 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 30;

export const LineChart = ({
  data,
  selectedYear,
  width,
  height,
}) => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  
  // Get all countries names
  var countriesList = [];
  const getCountriesFromData = data.forEach(function (d) {
    countriesList.push(d.Entity);
  });

  // Get all unique countries names
  const uniqueCountriesList = Array.from(new Set(countriesList));

  // Filtered csv data by country name
  function filterByCountryName(countryName) {
    const filteredData = data.filter(function (d) {
      if (d['Entity'] == countryName) {
        return d;
      }
    });

    return filteredData;
  }

  const yValue = (d) => d.CountryPopulationWithMentalIllness;
  const yAxisLabel = 'Population with mental illness';

  const xValue = (d) => d.Year;
  const xAxisLabel = 'Years';
  const xAxisTickFormat = timeFormat('%Y');

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();
  
  const yAxisTickFormat = yScale.tickFormat(5, "+%");

  return (
    <>
      <rect width={width} height={height} fill="white" />
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} tickFormat={yAxisTickFormat} innerWidth={innerWidth} tickOffset={7} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <MemoizedLineChartMarks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          innerHeight={innerHeight}
          countryFilter={filterByCountryName}
          countries={uniqueCountriesList}
        />
        <line
          x1={xScale(selectedYear)}
          x2={xScale(selectedYear)}
          y1={0}
          y2={innerHeight}
          stroke="black"
          stroke-width="5"
        />
      </g>
    </>
  );
};
