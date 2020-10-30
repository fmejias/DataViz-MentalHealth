export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
  yScale.ticks(5).map(tickValue => (
    <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
      <line x2={innerWidth} />
      <text
        className="axis-label"
        key={tickValue}
        style={{ textAnchor: 'end' }}
        x={-tickOffset}
        dy=".32em"
      >
        {tickValue}
      </text>
    </g>
  ));
