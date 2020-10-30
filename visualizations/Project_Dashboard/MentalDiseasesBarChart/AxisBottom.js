export const AxisBottom = ({ xScale, innerHeight, tickFormat }) =>
  xScale.ticks(5).map(tickValue => (
    <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={innerHeight} />
      <text className="axis-label" style={{ textAnchor: 'middle' }} dy=".71em" y={innerHeight + 3}>
        {tickFormat(tickValue)}
      </text>
    </g>
  ));