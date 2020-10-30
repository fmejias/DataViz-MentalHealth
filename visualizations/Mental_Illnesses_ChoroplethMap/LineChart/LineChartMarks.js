import { line, curveNatural } from 'd3';
import React from 'react';

export const LineChartMarks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  innerHeight,
  countryFilter,
  countries
}) => (

<g className="marks">

  {countries.map(country => {
    const filteredData = countryFilter(country);
    return <path
      fill="none"
      stroke="black"
      d={line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(curveNatural)(filteredData)} 

    />
   })
  }
  
</g>
  
);

function areEqual(prevProps, nextProps) {
  return true;
}

export const MemoizedLineChartMarks = React.memo(LineChartMarks, areEqual);