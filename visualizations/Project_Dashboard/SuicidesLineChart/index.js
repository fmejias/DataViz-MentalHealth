import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, scaleTime, max, format, timeFormat, extent } from 'd3';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import ReactDropdown from 'react-dropdown';

//const margin = { top: 20, right: 30, bottom: 165, left: 90 };
const xAxisLabelOffset = 30;

// This is used to move the label from the y axis values
const yAxisLabelOffset = 40;

export const SuicidesLineChart = ({
  data,
  width,
  height,
  yAttribute,
  countryAttribute
}) => {
  const margin = { top: -20, right: 50, bottom: 15, left: 90 };

  const yValue = (d) => d['SuicideDeathsRate'];
  const yAxisLabel = 'Share of deaths %';

  // Filter Costa Rica Data
  const filteredData = data.filter(function (d) {
    if (d['Entity'] == countryAttribute) {
      return d;
    }
  });

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (d) => d.Year;
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
          transform={`translate(${-yAxisLabelOffset},${
            innerHeight / 2
          }) rotate(-90)`}
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
    </>
  );
};
