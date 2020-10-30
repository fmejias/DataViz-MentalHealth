import { line, curveNatural } from 'd3';

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  circleRadius
}) => (

<g className="marks">

	<path
    fill="none"
    stroke="black"
    d={line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
    	.curve(curveNatural)(data)} 
  
  />
  {}
  
</g>
  
);