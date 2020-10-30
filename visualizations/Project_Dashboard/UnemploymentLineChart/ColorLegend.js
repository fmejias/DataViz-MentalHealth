export const ColorLegend = ({ colorScale, 
                             tickSpacing = 20, 
                             tickSize = 10, 
                             tickTextOffset = 20}) =>
  <>
  <g className="tick"
     transform={`translate(0, ${1 * tickSpacing})`}
  >
    <circle fill={"Orange"} r={tickSize} />
      <text className="axis-label" x={tickTextOffset} dy=".32em"> {"Unemployment"} </text>
  </g>
  <g className="tick"
     transform={`translate(0, ${2.5 * tickSpacing})`}
  >
    <circle fill={"Green"} r={tickSize} />
      <text className="axis-label" x={tickTextOffset} dy=".32em" >
        <tspan x={tickTextOffset} dy=".32em">People that</tspan>
        <tspan x={tickTextOffset} dy="1.2em">have suffered</tspan>
        <tspan x={tickTextOffset} dy="1.2em">some mental</tspan>
        <tspan x={tickTextOffset} dy="1.2em">illness</tspan>
      </text>  
  </g>
  </>
