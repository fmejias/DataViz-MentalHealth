export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  xValueTotalPercentageOfPopulation,
  tooltipFormat
}) =>
  data.map(d => (
    <>
      <rect
        key={yValue(d)}
        x={0}
        y={yScale("Unemployment")}
        width={xScale(xValue(d))}
        height={yScale.bandwidth()}
        fill={"orange"}
      >

        <title>{tooltipFormat(xValue(d))}</title>
      </rect>

      <rect
        className="mark"
        key={yValue(d)}
        x={0}
        y={yScale("TotalPercentageOfPopulation")}
        width={xScale(xValueTotalPercentageOfPopulation(d))}
        height={yScale.bandwidth()}
      >

        <title>{tooltipFormat(xValue(d))}</title>
      </rect>
    </>
  ));
