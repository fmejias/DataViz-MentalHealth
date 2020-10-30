import { line, curveNatural } from 'd3';

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  circleRadius,
  colorValue
}) => (

<g className="marks">

	<path
    fill="none"
    stroke={colorValue}
    d={line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
    	.curve(curveNatural)(data)} 
  
  />
  {}
  
</g>
  
);