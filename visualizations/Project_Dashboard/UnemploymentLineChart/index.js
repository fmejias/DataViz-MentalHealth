import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, scaleTime, max, min, format, timeFormat, extent } from 'd3';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import ReactDropdown from 'react-dropdown';
import { ColorLegend } from './ColorLegend';

const margin = { top: 0, right: 160, bottom: 15, left: 200 };
const xAxisLabelOffset = 30;
const yAxisLabelOffset = 35;

export const UnemploymentLineChart = ({
  data,
  width,
  height,
  countryAttribute
}) => {

const yUnemploymentValue = d => d["Unemployment"];

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
  const yAxisLabel = "Population %";

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
    </>
  );
};