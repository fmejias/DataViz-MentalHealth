export const ColorLegend = ({ colorScale, 
                             tickSpacing = 20, 
                             tickSize = 10, 
                             tickTextOffset = 20}) =>
	colorScale.ticks().map((t, i) => (
    // This line <g transform={`translate(0, ${i * 100})`}>
    // is used to add the vertical space of which each text
    // is going to be separated
    <g className="tick" transform={`translate(30, ${i * tickSpacing + 50})`}>
      <circle fill={colorScale(t)} r={tickSize} />
      <text x={tickTextOffset} dy=".32em"> {t + "% - " + (2*(i+1)) + "%"} </text>
    </g>
  ));
