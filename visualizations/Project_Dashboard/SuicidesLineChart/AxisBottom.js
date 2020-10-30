export const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
  xScale.ticks(6).map(tickValue => (
    <g
      className="tick"
      key={tickValue}
      transform={`translate(${xScale(tickValue)},0)`}
    >
      <line y2={innerHeight} />
      <text className="axis-label" style={{ textAnchor: 'middle' }} dy=".71em" y={innerHeight + tickOffset}>
        {tickFormat(tickValue)}
      </text>
    </g>
  ));
