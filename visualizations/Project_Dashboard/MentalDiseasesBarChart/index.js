import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, arc, pie, scaleBand, scaleLinear, scaleOrdinal, max, format } from 'd3';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { ColorLegend } from './ColorLegend';

const margin = { top: -30, right: 160, bottom: 15, left: 200 };
const xAxisLabelOffset = 30;
const yAxisLabelOffset = 90;

const subgroups = ["Unemployment", "TotalPercentageOfPopulation"];
const fadeOpacity = 0.2;

export const MentalDiseasesBarChart = ({
  data,
  width,
  height,
  year,
  hoveredValue,
  setHoveredValue
}) => {

// Filter Data By year
  const filteredDataByYear = data.filter(function(d) 
	{ 
		if(d["Year"].getFullYear() == year){ 
      return d;
    } 
  });
  
  // Filter Data by Unemployment
  const filteredDataByUnemployment = filteredDataByYear.slice().sort((a, b) => d3.descending(a.Unemployment, b.Unemployment));
	
  // Extract top 5 rows order by descending unemployment value
  const filteredData = filteredDataByUnemployment.slice(0, 5);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yValue = d => d.Entity;
  
  const xValue = d => d.Unemployment;
  const xValueTotalPercentageOfPopulation = d => d.TotalPercentageOfPopulation;

  const siFormat = format('.2s');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');
  
  // Color Legend
  const circleRadius = 7;
  const colorScale = scaleOrdinal()
    .domain(["Mental illness", 
             "Unemployment"])
    .range(['#137B80', 'orange']);
	
  const yScale = scaleBand()
    .domain(filteredData.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.5);
  
  const yScaleSubgroup1 = d3.scaleBand()
    .domain(subgroups)
    .range([0, yScale.bandwidth()])
    .padding([0.3])
  
  const yScaleSubgroup2 = d3.scaleBand()
    .domain(subgroups)
    .range([2 * yScale.bandwidth(), 3 * yScale.bandwidth()])
    .padding([0.3])
  
  const yScaleSubgroup3 = d3.scaleBand()
    .domain(subgroups)
    .range([4 * yScale.bandwidth(), 5 * yScale.bandwidth()])
    .padding([0.3])
  
  const yScaleSubgroup4 = d3.scaleBand()
    .domain(subgroups)
    .range([6 * yScale.bandwidth(), 7 * yScale.bandwidth()])
    .padding([0.3])
  
  const yScaleSubgroup5 = d3.scaleBand()
    .domain(subgroups)
    .range([8 * yScale.bandwidth(), 9 * yScale.bandwidth()])
    .padding([0.3])

  const xScale = scaleLinear()
    .domain([0, max(filteredData, xValue)])
    .range([0, innerWidth]);

return (
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom 
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
          />
          <AxisLeft yScale={yScale} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            Percentage of the population
          </text>
          
          <text
            className="axis-label"
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset},${innerHeight /
              2}) rotate(-90)`}
          >
            {"Countries"}
          </text>
          
          <g transform={`translate(${innerWidth + 40}, 20)`}>
            
            <ColorLegend 
              tickSpacing={22}
              tickSize={circleRadius}
              tickTextOffset={12}
              colorScale={colorScale}
              onHover={setHoveredValue}
              hoveredValue={hoveredValue}
              fadeOpacity={fadeOpacity}
            />
          </g>

          <Marks
            data={filteredData.slice(0,1)}
            xScale={xScale}
            yScale={yScaleSubgroup1}
            xValue={xValue}
            yValue={yValue}
            xValueTotalPercentageOfPopulation={xValueTotalPercentageOfPopulation}
            tooltipFormat={xAxisTickFormat}
          />

          <Marks
            data={filteredData.slice(1,2)}
            xScale={xScale}
            yScale={yScaleSubgroup2}
            xValue={xValue}
            yValue={yValue}
            xValueTotalPercentageOfPopulation={xValueTotalPercentageOfPopulation}
            tooltipFormat={xAxisTickFormat}
          />

          <Marks
            data={filteredData.slice(2,3)}
            xScale={xScale}
            yScale={yScaleSubgroup3}
            xValue={xValue}
            yValue={yValue}
            xValueTotalPercentageOfPopulation={xValueTotalPercentageOfPopulation}
            tooltipFormat={xAxisTickFormat}
          />

          <Marks
            data={filteredData.slice(3,4)}
            xScale={xScale}
            yScale={yScaleSubgroup4}
            xValue={xValue}
            yValue={yValue}
            xValueTotalPercentageOfPopulation={xValueTotalPercentageOfPopulation}
            tooltipFormat={xAxisTickFormat}
          />

          <Marks
            data={filteredData.slice(4,5)}
            xScale={xScale}
            yScale={yScaleSubgroup5}
            xValue={xValue}
            yValue={yValue}
            xValueTotalPercentageOfPopulation={xValueTotalPercentageOfPopulation}
            tooltipFormat={xAxisTickFormat}
          />

        </g>
  );
};