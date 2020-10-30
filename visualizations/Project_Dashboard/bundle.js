(function (React$1, ReactDOM, d3$1, ReactDropdown) {
  'use strict';

  var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
  ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;
  ReactDropdown = ReactDropdown && Object.prototype.hasOwnProperty.call(ReactDropdown, 'default') ? ReactDropdown['default'] : ReactDropdown;

  const csvUrl =
    'https://gist.githubusercontent.com/fmejias/8df2a27f1285576ae3cf4d67c3368144/raw/mental_health_disorders_unemployment_and_suicides.csv';

  const useData = () => {
    const [data, setData] = React$1.useState(null);

    React$1.useEffect(() => {
      const row = d => {
        d.Year = new Date(d.Year, 0);
        d.Schizophrenia = +d.Schizophrenia;
        d.AlcoholUseDisorders = +d.AlcoholUseDisorders;
        d.DrugUseDisorders = +d.DrugUseDisorders;
        d.DepressiveDisorders = +d.DepressiveDisorders;
        d.BipolarDisorder = +d.BipolarDisorder;
        d.AnxietyDisorders = +d.AnxietyDisorders;
        d.EatingDisorders = +d.EatingDisorders;
        d.Unemployment = +d.Unemployment;
        d.TotalPercentageOfPopulation = +d.TotalPercentageOfPopulation;
        d.SuicideDeathsRate = +d.SuicideDeathsRate;
        return d;
      };
      d3$1.csv(csvUrl, row).then(setData);
    }, []);
    
    
    return data;
  };

  const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
    xScale.ticks(6).map(tickValue => (
      React.createElement( 'g', {
        className: "tick", key: tickValue, transform: `translate(${xScale(tickValue)},0)` },
        React.createElement( 'line', { y2: innerHeight }),
        React.createElement( 'text', { className: "axis-label", style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + tickOffset },
          tickFormat(tickValue)
        )
      )
    ));

  const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
    yScale.ticks(5).map(tickValue => (
      React.createElement( 'g', { className: "tick", transform: `translate(0,${yScale(tickValue)})` },
        React.createElement( 'line', { x2: innerWidth }),
        React.createElement( 'text', {
          className: "axis-label", key: tickValue, style: { textAnchor: 'end' }, x: -tickOffset, dy: ".32em" },
          tickValue
        )
      )
    ));

  const Marks = ({
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    tooltipFormat,
    circleRadius
  }) => (

  React.createElement( 'g', { className: "marks" },

  	React.createElement( 'path', {
      fill: "none", stroke: "black", d: d3$1.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
      	.curve(d3$1.curveNatural)(data) })
    
    
  )
    
  );

  //const margin = { top: 20, right: 30, bottom: 165, left: 90 };
  const xAxisLabelOffset = 30;

  // This is used to move the label from the y axis values
  const yAxisLabelOffset = 60;

  const MentalDiseasesLineChart = ({
    data,
    width,
    height,
    yAttribute,
    countryAttribute
  }) => {
    const margin = { top: -30, right: 50, bottom: 15, left: 90 };

    const yValue = (d) => d[yAttribute];
    const yAxisLabel = 'Population %';

    // Filter Costa Rica Data
    const filteredData = data.filter(function (d) {
      if (d['Entity'] == countryAttribute) {
        return d;
      }
    });

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xValue = (d) => d.Year;
    const xAxisLabel = 'Years';
    const xAxisTickFormat = d3$1.timeFormat('%Y');

    const xScale = d3$1.scaleTime()
      .domain(d3$1.extent(filteredData, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = d3$1.scaleLinear()
      .domain(d3$1.extent(filteredData, yValue))
      .range([innerHeight, 0])
      .nice();

    return (
      React$1__default.createElement( React$1__default.Fragment, null,
        React$1__default.createElement( 'g', { transform: `translate(${margin.left},${margin.top})` },
          React$1__default.createElement( AxisBottom, {
            xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat, tickOffset: 7 }),
          React$1__default.createElement( 'text', {
            className: "axis-label", textAnchor: "middle", transform: `translate(${-yAxisLabelOffset},${
            innerHeight / 2
          }) rotate(-90)` },
            yAxisLabel
          ),
          React$1__default.createElement( AxisLeft, { yScale: yScale, innerWidth: innerWidth, tickOffset: 7 }),
          React$1__default.createElement( 'text', {
            className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisLabelOffset, textAnchor: "middle" },
            xAxisLabel
          ),
          React$1__default.createElement( Marks, {
            data: filteredData, xScale: xScale, yScale: yScale, xValue: xValue, yValue: yValue, tooltipFormat: xAxisTickFormat, circleRadius: 3 })
        )
      )
    );
  };

  const AxisBottom$1 = ({ xScale, innerHeight, tickFormat }) =>
    xScale.ticks(5).map(tickValue => (
      React.createElement( 'g', { className: "tick", key: tickValue, transform: `translate(${xScale(tickValue)},0)` },
        React.createElement( 'line', { y2: innerHeight }),
        React.createElement( 'text', { className: "axis-label", style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + 3 },
          tickFormat(tickValue)
        )
      )
    ));

  const AxisLeft$1 = ({ yScale }) =>
    yScale.domain().map(tickValue => (
      React.createElement( 'g', { className: "tick" },
        React.createElement( 'text', { className: "axis-label", key: tickValue, style: { textAnchor: 'end' }, x: -3, dy: ".32em", y: yScale(tickValue) + yScale.bandwidth() / 2 },
          tickValue
        )
      )
    ));

  const Marks$1 = ({
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    xValueTotalPercentageOfPopulation,
    tooltipFormat
  }) =>
    data.map(d => (
      React.createElement( React.Fragment, null,
        React.createElement( 'rect', {
          key: yValue(d), x: 0, y: yScale("Unemployment"), width: xScale(xValue(d)), height: yScale.bandwidth(), fill: "orange" },

          React.createElement( 'title', null, tooltipFormat(xValue(d)) )
        ),

        React.createElement( 'rect', {
          className: "mark", key: yValue(d), x: 0, y: yScale("TotalPercentageOfPopulation"), width: xScale(xValueTotalPercentageOfPopulation(d)), height: yScale.bandwidth() },

          React.createElement( 'title', null, tooltipFormat(xValue(d)) )
        )
      )
    ));

  const ColorLegend = ({ colorScale, 
                               tickSpacing = 20, 
                               tickSize = 10, 
                               tickTextOffset = 20,
                               onHover,
                               hoveredValue,
                               fadeOpacity}) =>
    colorScale.domain().map((domainValue, i) => (
      React.createElement( 'g', { className: "tick", transform: `translate(0, ${i * tickSpacing})`, onMouseEnter: () => {onHover(domainValue);}, onMouseOut: () => {onHover(null);}, opacity: hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1 },
        React.createElement( 'circle', { fill: colorScale(domainValue), r: tickSize }),
        React.createElement( 'text', { className: "axis-label", x: tickTextOffset, dy: ".32em" }, " ", domainValue, " ")
      )
    ));

  const margin = { top: -30, right: 160, bottom: 15, left: 200 };
  const xAxisLabelOffset$1 = 30;
  const yAxisLabelOffset$1 = 90;

  const subgroups = ["Unemployment", "TotalPercentageOfPopulation"];
  const fadeOpacity = 0.2;

  const MentalDiseasesBarChart = ({
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

    const siFormat = d3$1.format('.2s');
    const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');
    
    // Color Legend
    const circleRadius = 7;
    const colorScale = d3$1.scaleOrdinal()
      .domain(["Mental illness", 
               "Unemployment"])
      .range(['#137B80', 'orange']);
  	
    const yScale = d3$1.scaleBand()
      .domain(filteredData.map(yValue))
      .range([0, innerHeight])
      .paddingInner(0.5);
    
    const yScaleSubgroup1 = d3.scaleBand()
      .domain(subgroups)
      .range([0, yScale.bandwidth()])
      .padding([0.3]);
    
    const yScaleSubgroup2 = d3.scaleBand()
      .domain(subgroups)
      .range([2 * yScale.bandwidth(), 3 * yScale.bandwidth()])
      .padding([0.3]);
    
    const yScaleSubgroup3 = d3.scaleBand()
      .domain(subgroups)
      .range([4 * yScale.bandwidth(), 5 * yScale.bandwidth()])
      .padding([0.3]);
    
    const yScaleSubgroup4 = d3.scaleBand()
      .domain(subgroups)
      .range([6 * yScale.bandwidth(), 7 * yScale.bandwidth()])
      .padding([0.3]);
    
    const yScaleSubgroup5 = d3.scaleBand()
      .domain(subgroups)
      .range([8 * yScale.bandwidth(), 9 * yScale.bandwidth()])
      .padding([0.3]);

    const xScale = d3$1.scaleLinear()
      .domain([0, d3$1.max(filteredData, xValue)])
      .range([0, innerWidth]);

  return (
          React$1__default.createElement( 'g', { transform: `translate(${margin.left},${margin.top})` },
            React$1__default.createElement( AxisBottom$1, { 
              xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat }),
            React$1__default.createElement( AxisLeft$1, { yScale: yScale }),
            React$1__default.createElement( 'text', {
              className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisLabelOffset$1, textAnchor: "middle" }, "Percentage of the population"),
            
            React$1__default.createElement( 'text', {
              className: "axis-label", textAnchor: "middle", transform: `translate(${-yAxisLabelOffset$1},${innerHeight /
              2}) rotate(-90)` },
              "Countries"
            ),
            
            React$1__default.createElement( 'g', { transform: `translate(${innerWidth + 40}, 20)` },
              
              React$1__default.createElement( ColorLegend, { 
                tickSpacing: 22, tickSize: circleRadius, tickTextOffset: 12, colorScale: colorScale, onHover: setHoveredValue, hoveredValue: hoveredValue, fadeOpacity: fadeOpacity })
            ),

            React$1__default.createElement( Marks$1, {
              data: filteredData.slice(0,1), xScale: xScale, yScale: yScaleSubgroup1, xValue: xValue, yValue: yValue, xValueTotalPercentageOfPopulation: xValueTotalPercentageOfPopulation, tooltipFormat: xAxisTickFormat }),

            React$1__default.createElement( Marks$1, {
              data: filteredData.slice(1,2), xScale: xScale, yScale: yScaleSubgroup2, xValue: xValue, yValue: yValue, xValueTotalPercentageOfPopulation: xValueTotalPercentageOfPopulation, tooltipFormat: xAxisTickFormat }),

            React$1__default.createElement( Marks$1, {
              data: filteredData.slice(2,3), xScale: xScale, yScale: yScaleSubgroup3, xValue: xValue, yValue: yValue, xValueTotalPercentageOfPopulation: xValueTotalPercentageOfPopulation, tooltipFormat: xAxisTickFormat }),

            React$1__default.createElement( Marks$1, {
              data: filteredData.slice(3,4), xScale: xScale, yScale: yScaleSubgroup4, xValue: xValue, yValue: yValue, xValueTotalPercentageOfPopulation: xValueTotalPercentageOfPopulation, tooltipFormat: xAxisTickFormat }),

            React$1__default.createElement( Marks$1, {
              data: filteredData.slice(4,5), xScale: xScale, yScale: yScaleSubgroup5, xValue: xValue, yValue: yValue, xValueTotalPercentageOfPopulation: xValueTotalPercentageOfPopulation, tooltipFormat: xAxisTickFormat })

          )
    );
  };

  const AxisBottom$2 = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
    xScale.ticks(6).map(tickValue => (
      React.createElement( 'g', {
        className: "tick", key: tickValue, transform: `translate(${xScale(tickValue)},0)` },
        React.createElement( 'line', { y2: innerHeight }),
        React.createElement( 'text', { className: "axis-label", style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + tickOffset },
          tickFormat(tickValue)
        )
      )
    ));

  const AxisLeft$2 = ({ yScale, innerWidth, tickOffset = 3 }) =>
    yScale.ticks(5).map(tickValue => (
      React.createElement( 'g', { className: "tick", transform: `translate(0,${yScale(tickValue)})` },
        React.createElement( 'line', { x2: innerWidth }),
        React.createElement( 'text', {
          className: "axis-label", key: tickValue, style: { textAnchor: 'end' }, x: -tickOffset, dy: ".32em" },
          tickValue
        )
      )
    ));

  const Marks$2 = ({
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    tooltipFormat,
    circleRadius
  }) => (

  React.createElement( 'g', { className: "marks" },

  	React.createElement( 'path', {
      fill: "none", stroke: "black", d: d3$1.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
      	.curve(d3$1.curveNatural)(data) })
    
    
  )
    
  );

  //const margin = { top: 20, right: 30, bottom: 165, left: 90 };
  const xAxisLabelOffset$2 = 30;

  // This is used to move the label from the y axis values
  const yAxisLabelOffset$2 = 40;

  const SuicidesLineChart = ({
    data,
    width,
    height,
    yAttribute,
    countryAttribute
  }) => {
    const margin = { top: -20, right: 50, bottom: 15, left: 90 };

    const yValue = (d) => d['SuicideDeathsRate'];
    const yAxisLabel = 'Share of deaths %';

    // Filter Costa Rica Data
    const filteredData = data.filter(function (d) {
      if (d['Entity'] == countryAttribute) {
        return d;
      }
    });

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xValue = (d) => d.Year;
    const xAxisLabel = 'Years';
    const xAxisTickFormat = d3$1.timeFormat('%Y');

    const xScale = d3$1.scaleTime()
      .domain(d3$1.extent(filteredData, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = d3$1.scaleLinear()
      .domain(d3$1.extent(filteredData, yValue))
      .range([innerHeight, 0])
      .nice();

    return (
      React$1__default.createElement( React$1__default.Fragment, null,
        React$1__default.createElement( 'g', { transform: `translate(${margin.left},${margin.top})` },
          React$1__default.createElement( AxisBottom$2, {
            xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat, tickOffset: 7 }),
          React$1__default.createElement( 'text', {
            className: "axis-label", textAnchor: "middle", transform: `translate(${-yAxisLabelOffset$2},${
            innerHeight / 2
          }) rotate(-90)` },
            yAxisLabel
          ),
          React$1__default.createElement( AxisLeft$2, { yScale: yScale, innerWidth: innerWidth, tickOffset: 7 }),
          React$1__default.createElement( 'text', {
            className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisLabelOffset$2, textAnchor: "middle" },
            xAxisLabel
          ),
          React$1__default.createElement( Marks$2, {
            data: filteredData, xScale: xScale, yScale: yScale, xValue: xValue, yValue: yValue, tooltipFormat: xAxisTickFormat, circleRadius: 3 })
        )
      )
    );
  };

  const AxisBottom$3 = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
    xScale.ticks(6).map(tickValue => (
      React.createElement( 'g', {
        className: "tick", key: tickValue, transform: `translate(${xScale(tickValue)},0)` },
        React.createElement( 'line', { y2: innerHeight }),
        React.createElement( 'text', { className: "axis-label", style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + tickOffset },
          tickFormat(tickValue)
        )
      )
    ));

  const AxisLeft$3 = ({ yScale, innerWidth, tickOffset = 3 }) =>
    yScale.ticks(5).map(tickValue => (
      React.createElement( 'g', { className: "tick", transform: `translate(0,${yScale(tickValue)})` },
        React.createElement( 'line', { x2: innerWidth }),
        React.createElement( 'text', {
          className: "axis-label", key: tickValue, style: { textAnchor: 'end' }, x: -tickOffset, dy: ".32em" },
          tickValue
        )
      )
    ));

  const Marks$3 = ({
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    tooltipFormat,
    circleRadius,
    colorValue
  }) => (

  React.createElement( 'g', { className: "unemployment-marks" },

  	React.createElement( 'path', {
      fill: "none", stroke: colorValue, d: d3$1.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
      	.curve(d3$1.curveNatural)(data) })
    
    
  )
    
  );

  const ColorLegend$1 = ({ colorScale, 
                               tickSpacing = 20, 
                               tickSize = 10, 
                               tickTextOffset = 20}) =>
    React.createElement( React.Fragment, null,
    React.createElement( 'g', { className: "tick", transform: `translate(0, ${1 * tickSpacing})` },
      React.createElement( 'circle', { fill: "Orange", r: tickSize }),
        React.createElement( 'text', { className: "axis-label", x: tickTextOffset, dy: ".32em" }, " ", "Unemployment", " ")
    ),
    React.createElement( 'g', { className: "tick", transform: `translate(0, ${2.5 * tickSpacing})` },
      React.createElement( 'circle', { fill: "Green", r: tickSize }),
        React.createElement( 'text', { className: "axis-label", x: tickTextOffset, dy: ".32em" },
          React.createElement( 'tspan', { x: tickTextOffset, dy: ".32em" }, "People that"),
          React.createElement( 'tspan', { x: tickTextOffset, dy: "1.2em" }, "have suffered"),
          React.createElement( 'tspan', { x: tickTextOffset, dy: "1.2em" }, "some mental"),
          React.createElement( 'tspan', { x: tickTextOffset, dy: "1.2em" }, "illness")
        )  
    )
    );

  const margin$1 = { top: 0, right: 160, bottom: 15, left: 200 };
  const xAxisLabelOffset$3 = 30;
  const yAxisLabelOffset$3 = 35;

  const UnemploymentLineChart = ({
    data,
    width,
    height,
    countryAttribute
  }) => {

  const yUnemploymentValue = d => d["Unemployment"];

  // Filter Costa Rica Data
    const filteredData = data.filter(function(d) 
  	{ 
  		if(d["Entity"] == countryAttribute){ 
        return d;
      } 
    });

    const innerHeight = height - margin$1.top - margin$1.bottom;
    const innerWidth = width - margin$1.left - margin$1.right;
    
    const circleRadius = 7;

    const xValue = d => d.Year;
    const xAxisLabel = 'Years';
    const xAxisTickFormat = d3$1.timeFormat('%Y');
    
    const yMentalIllnessValue = d => d.TotalPercentageOfPopulation;
    const yAxisLabel = "Population %";

    const xScale = d3$1.scaleTime()
      .domain(d3$1.extent(filteredData, xValue))
      .range([0, innerWidth])
      .nice();
    
    // Set yScale
    const yMentalIllnessValueMinMax = d3$1.extent(filteredData, yMentalIllnessValue);
    const yUnemploymentValueMinMax = d3$1.extent(filteredData, yUnemploymentValue);
    const yMergeMinMaxValues = yMentalIllnessValueMinMax.concat(yUnemploymentValueMinMax);
    const yMinValue = d3$1.min(yMergeMinMaxValues);
    const yMaxValue = d3$1.max(yMergeMinMaxValues);

    const yScale = d3$1.scaleLinear()
      .domain([yMinValue, yMaxValue])
      .range([innerHeight, 0])
    	.nice();
    
    return (
      React$1__default.createElement( React$1__default.Fragment, null,
          React$1__default.createElement( 'g', { transform: `translate(${margin$1.left},${margin$1.top})` },
            React$1__default.createElement( AxisBottom$3, {
              xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat, tickOffset: 7 }),
            React$1__default.createElement( 'text', {
              className: "axis-label", textAnchor: "middle", transform: `translate(${-yAxisLabelOffset$3},${innerHeight /
              2}) rotate(-90)` },
              yAxisLabel
            ),
            React$1__default.createElement( AxisLeft$3, { yScale: yScale, innerWidth: innerWidth, tickOffset: 7 }),
            React$1__default.createElement( 'text', {
              className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisLabelOffset$3, textAnchor: "middle" },
              xAxisLabel
            ),
            React$1__default.createElement( 'g', { transform: `translate(${innerWidth + 60}, 0)` },
              React$1__default.createElement( ColorLegend$1, { 
                tickSpacing: 22, tickSize: circleRadius, tickTextOffset: 12 })
            ),
            React$1__default.createElement( Marks$3, {
              data: filteredData, xScale: xScale, yScale: yScale, xValue: xValue, yValue: yMentalIllnessValue, tooltipFormat: xAxisTickFormat, circleRadius: 3, colorValue: "Green" }),
            React$1__default.createElement( Marks$3, {
              data: filteredData, xScale: xScale, yScale: yScale, xValue: xValue, yValue: yUnemploymentValue, tooltipFormat: xAxisTickFormat, circleRadius: 3, colorValue: "Orange" })
          )
      )
    );
  };

  const width = 960;
  const height = 500;
  const lineChartSize = 0.2;

  const attributes = [
    { value: 'AlcoholUseDisorders', label: 'Alcohol Use Disorders' },
    { value: 'DrugUseDisorders', label: 'Drug Use Disorders' },
    { value: 'DepressiveDisorders', label: 'Depressive Disorders' },
    { value: 'BipolarDisorder', label: 'Bipolar Disorder' },
    { value: 'AnxietyDisorders', label: 'Anxiety Disorders' },
    { value: 'EatingDisorders', label: 'Eating Disorders' },
    { value: 'Schizophrenia', label: 'Schizophrenia' },
  ];

  const dropdownOptions = [
      {value: "1995", label: '1995'},
      {value: "2000", label: '2000'},
      {value: "2005", label: '2005'},
      {value: "2010", label: '2010'},
      {value: "2015", label: '2015'}
  ];

  const App = () => {
    const data = useData();
    
    // Mental disease and Unemployment Bar Chart Menu
    const [hoveredValue, setHoveredValue] = React$1.useState(null);
    
    // Mental disease and Unemployment Bar Chart Years menu
    const initialYear = '2005';
    const [year, setYear] = React$1.useState(initialYear);
    
    // Suicides Line Chart Menu
    const suicidesInitialCountryAttribute = 'Costa Rica';
    const [suicidesCountryAttribute, setSuicidesCountryAttribute] = React$1.useState(
      suicidesInitialCountryAttribute
    );
    
    // Unemployment Line Chart Menu
    const unemploymentInitialCountryAttribute = 'Costa Rica';
    const [unemploymentCountryAttribute, setUnemploymentCountryAttribute] = React$1.useState(
      unemploymentInitialCountryAttribute
    );

    // Mental disease Line Chart Menu
    const initialYAttribute = 'Schizophrenia';
    const [yAttribute, setYAttribute] = React$1.useState(initialYAttribute);

    // Country Filter Menu
    const initialCountryAttribute = 'Costa Rica';
    const [countryAttribute, setCountryAttribute] = React$1.useState(
      initialCountryAttribute
    );

    if (!data) {
      return React$1__default.createElement( 'pre', null, "Loading..." );
    }
    
    // Get all countries names
    var countriesList = [];
    const getCountriesFromData = data.forEach(function (d) {
      countriesList.push(d.Entity);
    });

    // Get all unique countries names
    const uniqueCountriesList = Array.from(new Set(countriesList));

    const countriesDictionaryList = [];
    uniqueCountriesList.map((country) => {
      countriesDictionaryList.push({
        value: country,
        label: country,
      });
    });

    return (
      React$1__default.createElement( React$1__default.Fragment, null,
        React$1__default.createElement( 'div', { className: "mental-illness-title-container" },  
          React$1__default.createElement( 'span', { className: "mental-title-label" }, "Mental illnesses over the years"),
          React$1__default.createElement( 'span', { className: "top-unemployment-title-label" }, "Top 5 of the countries most affected by unemployment")
        ),
        React$1__default.createElement( 'div', { className: "line-chart-menus-container" },
          React$1__default.createElement( 'span', { className: "line-chart-dropdown-label" }, "Country"),
          React$1__default.createElement( ReactDropdown, {
            options: countriesDictionaryList, value: countryAttribute, onChange: ({ value }) => setCountryAttribute(value) }),
          React$1__default.createElement( 'span', { className: "line-chart-dropdown-label" }, "Mental disease"),
          React$1__default.createElement( ReactDropdown, {
            options: attributes, value: yAttribute, onChange: ({ value }) => setYAttribute(value) }),
          React$1__default.createElement( 'div', { className: "bar-chart-menus-container" },
            React$1__default.createElement( 'span', { className: "bar-chart-dropdown-label" }, "Year"),
            React$1__default.createElement( ReactDropdown, { 
              options: dropdownOptions, value: year, onChange: ({value}) => setYear(value) })
          )
        ),
        
        React$1__default.createElement( 'div', { className: "suicides-title-container" },  
          React$1__default.createElement( 'span', { className: "suicides-title-label" }, "Share of deaths from suicide"),
          React$1__default.createElement( 'span', { className: "unemployment-title-label" }, "Mental illness and Unemployment")
        ),
        
        React$1__default.createElement( 'div', { className: "suicides-menus-container" },
          
          React$1__default.createElement( 'span', { className: "bar-chart-dropdown-label" }, "Country"),
          React$1__default.createElement( ReactDropdown, {
            options: countriesDictionaryList, value: suicidesCountryAttribute, onChange: ({ value }) => setSuicidesCountryAttribute(value) }),
          React$1__default.createElement( 'div', { className: "bar-chart-menus-container" },
            React$1__default.createElement( 'span', { className: "bar-chart-dropdown-label" }, "Country"),
            React$1__default.createElement( ReactDropdown, { 
              options: countriesDictionaryList, value: unemploymentCountryAttribute, onChange: ({value}) => setUnemploymentCountryAttribute(value) })
          )
        ),
        
        React$1__default.createElement( 'svg', { width: width, height: height },
          React$1__default.createElement( 'g', { transform: `translate(0, 40)` },
            React$1__default.createElement( MentalDiseasesLineChart, {
              data: data, width: width / 2, height: lineChartSize * height + 20, yAttribute: yAttribute, countryAttribute: countryAttribute })
          ),
          React$1__default.createElement( 'g', { transform: `translate(${width/2 - 60}, 40)` },
            React$1__default.createElement( MentalDiseasesBarChart, {
              data: data, width: width / 2 + 60, height: lineChartSize * height + 20, year: year, hoveredValue: hoveredValue, setHoveredValue: setHoveredValue })
          ),       
          React$1__default.createElement( 'g', { transform: `translate(0, 286)` },
            React$1__default.createElement( SuicidesLineChart, {
              data: data, width: width / 2, height: lineChartSize * height + 20, countryAttribute: suicidesCountryAttribute })
          ),
          React$1__default.createElement( 'g', { transform: `translate(${width/2 - 100}, 276)` },
            React$1__default.createElement( UnemploymentLineChart, {
              data: data, width: width / 2 + 80, height: lineChartSize * height + 20, countryAttribute: unemploymentCountryAttribute })
          )
        )
      )
    );
  };
  const rootElement = document.getElementById('root');
  ReactDOM.render(React$1__default.createElement( App, null ), rootElement);

}(React, ReactDOM, d3, ReactDropdown));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbInVzZURhdGEuanMiLCJNZW50YWxEaXNlYXNlc0xpbmVDaGFydC9BeGlzQm90dG9tLmpzIiwiTWVudGFsRGlzZWFzZXNMaW5lQ2hhcnQvQXhpc0xlZnQuanMiLCJNZW50YWxEaXNlYXNlc0xpbmVDaGFydC9NYXJrcy5qcyIsIk1lbnRhbERpc2Vhc2VzTGluZUNoYXJ0L2luZGV4LmpzIiwiTWVudGFsRGlzZWFzZXNCYXJDaGFydC9BeGlzQm90dG9tLmpzIiwiTWVudGFsRGlzZWFzZXNCYXJDaGFydC9BeGlzTGVmdC5qcyIsIk1lbnRhbERpc2Vhc2VzQmFyQ2hhcnQvTWFya3MuanMiLCJNZW50YWxEaXNlYXNlc0JhckNoYXJ0L0NvbG9yTGVnZW5kLmpzIiwiTWVudGFsRGlzZWFzZXNCYXJDaGFydC9pbmRleC5qcyIsIlN1aWNpZGVzTGluZUNoYXJ0L0F4aXNCb3R0b20uanMiLCJTdWljaWRlc0xpbmVDaGFydC9BeGlzTGVmdC5qcyIsIlN1aWNpZGVzTGluZUNoYXJ0L01hcmtzLmpzIiwiU3VpY2lkZXNMaW5lQ2hhcnQvaW5kZXguanMiLCJVbmVtcGxveW1lbnRMaW5lQ2hhcnQvQXhpc0JvdHRvbS5qcyIsIlVuZW1wbG95bWVudExpbmVDaGFydC9BeGlzTGVmdC5qcyIsIlVuZW1wbG95bWVudExpbmVDaGFydC9NYXJrcy5qcyIsIlVuZW1wbG95bWVudExpbmVDaGFydC9Db2xvckxlZ2VuZC5qcyIsIlVuZW1wbG95bWVudExpbmVDaGFydC9pbmRleC5qcyIsImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3N2IH0gZnJvbSAnZDMnO1xuXG5jb25zdCBjc3ZVcmwgPVxuICAnaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9mbWVqaWFzLzhkZjJhMjdmMTI4NTU3NmFlM2NmNGQ2N2MzMzY4MTQ0L3Jhdy9tZW50YWxfaGVhbHRoX2Rpc29yZGVyc191bmVtcGxveW1lbnRfYW5kX3N1aWNpZGVzLmNzdic7XG5cbmV4cG9ydCBjb25zdCB1c2VEYXRhID0gKCkgPT4ge1xuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHJvdyA9IGQgPT4ge1xuICAgICAgZC5ZZWFyID0gbmV3IERhdGUoZC5ZZWFyLCAwKTtcbiAgICAgIGQuU2NoaXpvcGhyZW5pYSA9ICtkLlNjaGl6b3BocmVuaWE7XG4gICAgICBkLkFsY29ob2xVc2VEaXNvcmRlcnMgPSArZC5BbGNvaG9sVXNlRGlzb3JkZXJzO1xuICAgICAgZC5EcnVnVXNlRGlzb3JkZXJzID0gK2QuRHJ1Z1VzZURpc29yZGVycztcbiAgICAgIGQuRGVwcmVzc2l2ZURpc29yZGVycyA9ICtkLkRlcHJlc3NpdmVEaXNvcmRlcnM7XG4gICAgICBkLkJpcG9sYXJEaXNvcmRlciA9ICtkLkJpcG9sYXJEaXNvcmRlcjtcbiAgICAgIGQuQW54aWV0eURpc29yZGVycyA9ICtkLkFueGlldHlEaXNvcmRlcnM7XG4gICAgICBkLkVhdGluZ0Rpc29yZGVycyA9ICtkLkVhdGluZ0Rpc29yZGVycztcbiAgICAgIGQuVW5lbXBsb3ltZW50ID0gK2QuVW5lbXBsb3ltZW50O1xuICAgICAgZC5Ub3RhbFBlcmNlbnRhZ2VPZlBvcHVsYXRpb24gPSArZC5Ub3RhbFBlcmNlbnRhZ2VPZlBvcHVsYXRpb247XG4gICAgICBkLlN1aWNpZGVEZWF0aHNSYXRlID0gK2QuU3VpY2lkZURlYXRoc1JhdGU7XG4gICAgICByZXR1cm4gZDtcbiAgICB9O1xuICAgIGNzdihjc3ZVcmwsIHJvdykudGhlbihzZXREYXRhKTtcbiAgfSwgW10pO1xuICBcbiAgXG4gIHJldHVybiBkYXRhO1xufTsiLCJleHBvcnQgY29uc3QgQXhpc0JvdHRvbSA9ICh7IHhTY2FsZSwgaW5uZXJIZWlnaHQsIHRpY2tGb3JtYXQsIHRpY2tPZmZzZXQgPSAzIH0pID0+XG4gIHhTY2FsZS50aWNrcyg2KS5tYXAodGlja1ZhbHVlID0+IChcbiAgICA8Z1xuICAgICAgY2xhc3NOYW1lPVwidGlja1wiXG4gICAgICBrZXk9e3RpY2tWYWx1ZX1cbiAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3hTY2FsZSh0aWNrVmFsdWUpfSwwKWB9XG4gICAgPlxuICAgICAgPGxpbmUgeTI9e2lubmVySGVpZ2h0fSAvPlxuICAgICAgPHRleHQgY2xhc3NOYW1lPVwiYXhpcy1sYWJlbFwiIHN0eWxlPXt7IHRleHRBbmNob3I6ICdtaWRkbGUnIH19IGR5PVwiLjcxZW1cIiB5PXtpbm5lckhlaWdodCArIHRpY2tPZmZzZXR9PlxuICAgICAgICB7dGlja0Zvcm1hdCh0aWNrVmFsdWUpfVxuICAgICAgPC90ZXh0PlxuICAgIDwvZz5cbiAgKSk7XG4iLCJleHBvcnQgY29uc3QgQXhpc0xlZnQgPSAoeyB5U2NhbGUsIGlubmVyV2lkdGgsIHRpY2tPZmZzZXQgPSAzIH0pID0+XG4gIHlTY2FsZS50aWNrcyg1KS5tYXAodGlja1ZhbHVlID0+IChcbiAgICA8ZyBjbGFzc05hbWU9XCJ0aWNrXCIgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKDAsJHt5U2NhbGUodGlja1ZhbHVlKX0pYH0+XG4gICAgICA8bGluZSB4Mj17aW5uZXJXaWR0aH0gLz5cbiAgICAgIDx0ZXh0XG4gICAgICAgIGNsYXNzTmFtZT1cImF4aXMtbGFiZWxcIlxuICAgICAgICBrZXk9e3RpY2tWYWx1ZX1cbiAgICAgICAgc3R5bGU9e3sgdGV4dEFuY2hvcjogJ2VuZCcgfX1cbiAgICAgICAgeD17LXRpY2tPZmZzZXR9XG4gICAgICAgIGR5PVwiLjMyZW1cIlxuICAgICAgPlxuICAgICAgICB7dGlja1ZhbHVlfVxuICAgICAgPC90ZXh0PlxuICAgIDwvZz5cbiAgKSk7XG4iLCJpbXBvcnQgeyBsaW5lLCBjdXJ2ZU5hdHVyYWwgfSBmcm9tICdkMyc7XG5cbmV4cG9ydCBjb25zdCBNYXJrcyA9ICh7XG4gIGRhdGEsXG4gIHhTY2FsZSxcbiAgeVNjYWxlLFxuICB4VmFsdWUsXG4gIHlWYWx1ZSxcbiAgdG9vbHRpcEZvcm1hdCxcbiAgY2lyY2xlUmFkaXVzXG59KSA9PiAoXG5cbjxnIGNsYXNzTmFtZT1cIm1hcmtzXCI+XG5cblx0PHBhdGhcbiAgICBmaWxsPVwibm9uZVwiXG4gICAgc3Ryb2tlPVwiYmxhY2tcIlxuICAgIGQ9e2xpbmUoKVxuICAgICAgLngoZCA9PiB4U2NhbGUoeFZhbHVlKGQpKSlcbiAgICAgIC55KGQgPT4geVNjYWxlKHlWYWx1ZShkKSkpXG4gICAgXHQuY3VydmUoY3VydmVOYXR1cmFsKShkYXRhKX0gXG4gIFxuICAvPlxuICB7fVxuICBcbjwvZz5cbiAgXG4pOyIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgY3N2LCBzY2FsZUxpbmVhciwgc2NhbGVUaW1lLCBtYXgsIGZvcm1hdCwgdGltZUZvcm1hdCwgZXh0ZW50IH0gZnJvbSAnZDMnO1xuaW1wb3J0IHsgQXhpc0JvdHRvbSB9IGZyb20gJy4vQXhpc0JvdHRvbSc7XG5pbXBvcnQgeyBBeGlzTGVmdCB9IGZyb20gJy4vQXhpc0xlZnQnO1xuaW1wb3J0IHsgTWFya3MgfSBmcm9tICcuL01hcmtzJztcbmltcG9ydCBSZWFjdERyb3Bkb3duIGZyb20gJ3JlYWN0LWRyb3Bkb3duJztcblxuLy9jb25zdCBtYXJnaW4gPSB7IHRvcDogMjAsIHJpZ2h0OiAzMCwgYm90dG9tOiAxNjUsIGxlZnQ6IDkwIH07XG5jb25zdCB4QXhpc0xhYmVsT2Zmc2V0ID0gMzA7XG5cbi8vIFRoaXMgaXMgdXNlZCB0byBtb3ZlIHRoZSBsYWJlbCBmcm9tIHRoZSB5IGF4aXMgdmFsdWVzXG5jb25zdCB5QXhpc0xhYmVsT2Zmc2V0ID0gNjA7XG5cbmV4cG9ydCBjb25zdCBNZW50YWxEaXNlYXNlc0xpbmVDaGFydCA9ICh7XG4gIGRhdGEsXG4gIHdpZHRoLFxuICBoZWlnaHQsXG4gIHlBdHRyaWJ1dGUsXG4gIGNvdW50cnlBdHRyaWJ1dGVcbn0pID0+IHtcbiAgY29uc3QgbWFyZ2luID0geyB0b3A6IC0zMCwgcmlnaHQ6IDUwLCBib3R0b206IDE1LCBsZWZ0OiA5MCB9O1xuXG4gIGNvbnN0IHlWYWx1ZSA9IChkKSA9PiBkW3lBdHRyaWJ1dGVdO1xuICBjb25zdCB5QXhpc0xhYmVsID0gJ1BvcHVsYXRpb24gJSc7XG5cbiAgLy8gRmlsdGVyIENvc3RhIFJpY2EgRGF0YVxuICBjb25zdCBmaWx0ZXJlZERhdGEgPSBkYXRhLmZpbHRlcihmdW5jdGlvbiAoZCkge1xuICAgIGlmIChkWydFbnRpdHknXSA9PSBjb3VudHJ5QXR0cmlidXRlKSB7XG4gICAgICByZXR1cm4gZDtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGlubmVySGVpZ2h0ID0gaGVpZ2h0IC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG4gIGNvbnN0IGlubmVyV2lkdGggPSB3aWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuXG4gIGNvbnN0IHhWYWx1ZSA9IChkKSA9PiBkLlllYXI7XG4gIGNvbnN0IHhBeGlzTGFiZWwgPSAnWWVhcnMnO1xuICBjb25zdCB4QXhpc1RpY2tGb3JtYXQgPSB0aW1lRm9ybWF0KCclWScpO1xuXG4gIGNvbnN0IHhTY2FsZSA9IHNjYWxlVGltZSgpXG4gICAgLmRvbWFpbihleHRlbnQoZmlsdGVyZWREYXRhLCB4VmFsdWUpKVxuICAgIC5yYW5nZShbMCwgaW5uZXJXaWR0aF0pXG4gICAgLm5pY2UoKTtcblxuICBjb25zdCB5U2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihleHRlbnQoZmlsdGVyZWREYXRhLCB5VmFsdWUpKVxuICAgIC5yYW5nZShbaW5uZXJIZWlnaHQsIDBdKVxuICAgIC5uaWNlKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7bWFyZ2luLmxlZnR9LCR7bWFyZ2luLnRvcH0pYH0+XG4gICAgICAgIDxBeGlzQm90dG9tXG4gICAgICAgICAgeFNjYWxlPXt4U2NhbGV9XG4gICAgICAgICAgaW5uZXJIZWlnaHQ9e2lubmVySGVpZ2h0fVxuICAgICAgICAgIHRpY2tGb3JtYXQ9e3hBeGlzVGlja0Zvcm1hdH1cbiAgICAgICAgICB0aWNrT2Zmc2V0PXs3fVxuICAgICAgICAvPlxuICAgICAgICA8dGV4dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImF4aXMtbGFiZWxcIlxuICAgICAgICAgIHRleHRBbmNob3I9XCJtaWRkbGVcIlxuICAgICAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgkey15QXhpc0xhYmVsT2Zmc2V0fSwke1xuICAgICAgICAgICAgaW5uZXJIZWlnaHQgLyAyXG4gICAgICAgICAgfSkgcm90YXRlKC05MClgfVxuICAgICAgICA+XG4gICAgICAgICAge3lBeGlzTGFiZWx9XG4gICAgICAgIDwvdGV4dD5cbiAgICAgICAgPEF4aXNMZWZ0IHlTY2FsZT17eVNjYWxlfSBpbm5lcldpZHRoPXtpbm5lcldpZHRofSB0aWNrT2Zmc2V0PXs3fSAvPlxuICAgICAgICA8dGV4dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImF4aXMtbGFiZWxcIlxuICAgICAgICAgIHg9e2lubmVyV2lkdGggLyAyfVxuICAgICAgICAgIHk9e2lubmVySGVpZ2h0ICsgeEF4aXNMYWJlbE9mZnNldH1cbiAgICAgICAgICB0ZXh0QW5jaG9yPVwibWlkZGxlXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt4QXhpc0xhYmVsfVxuICAgICAgICA8L3RleHQ+XG4gICAgICAgIDxNYXJrc1xuICAgICAgICAgIGRhdGE9e2ZpbHRlcmVkRGF0YX1cbiAgICAgICAgICB4U2NhbGU9e3hTY2FsZX1cbiAgICAgICAgICB5U2NhbGU9e3lTY2FsZX1cbiAgICAgICAgICB4VmFsdWU9e3hWYWx1ZX1cbiAgICAgICAgICB5VmFsdWU9e3lWYWx1ZX1cbiAgICAgICAgICB0b29sdGlwRm9ybWF0PXt4QXhpc1RpY2tGb3JtYXR9XG4gICAgICAgICAgY2lyY2xlUmFkaXVzPXszfVxuICAgICAgICAvPlxuICAgICAgPC9nPlxuICAgIDwvPlxuICApO1xufTtcbiIsImV4cG9ydCBjb25zdCBBeGlzQm90dG9tID0gKHsgeFNjYWxlLCBpbm5lckhlaWdodCwgdGlja0Zvcm1hdCB9KSA9PlxuICB4U2NhbGUudGlja3MoNSkubWFwKHRpY2tWYWx1ZSA9PiAoXG4gICAgPGcgY2xhc3NOYW1lPVwidGlja1wiIGtleT17dGlja1ZhbHVlfSB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHt4U2NhbGUodGlja1ZhbHVlKX0sMClgfT5cbiAgICAgIDxsaW5lIHkyPXtpbm5lckhlaWdodH0gLz5cbiAgICAgIDx0ZXh0IGNsYXNzTmFtZT1cImF4aXMtbGFiZWxcIiBzdHlsZT17eyB0ZXh0QW5jaG9yOiAnbWlkZGxlJyB9fSBkeT1cIi43MWVtXCIgeT17aW5uZXJIZWlnaHQgKyAzfT5cbiAgICAgICAge3RpY2tGb3JtYXQodGlja1ZhbHVlKX1cbiAgICAgIDwvdGV4dD5cbiAgICA8L2c+XG4gICkpOyIsImV4cG9ydCBjb25zdCBBeGlzTGVmdCA9ICh7IHlTY2FsZSB9KSA9PlxuICB5U2NhbGUuZG9tYWluKCkubWFwKHRpY2tWYWx1ZSA9PiAoXG4gICAgPGcgY2xhc3NOYW1lPVwidGlja1wiPlxuICAgICAgPHRleHQgY2xhc3NOYW1lPVwiYXhpcy1sYWJlbFwiXG4gICAgICAgIGtleT17dGlja1ZhbHVlfVxuICAgICAgICBzdHlsZT17eyB0ZXh0QW5jaG9yOiAnZW5kJyB9fVxuICAgICAgICB4PXstM31cbiAgICAgICAgZHk9XCIuMzJlbVwiXG4gICAgICAgIHk9e3lTY2FsZSh0aWNrVmFsdWUpICsgeVNjYWxlLmJhbmR3aWR0aCgpIC8gMn1cbiAgICAgID5cbiAgICAgICAge3RpY2tWYWx1ZX1cbiAgICAgIDwvdGV4dD5cbiAgICA8L2c+XG4gICkpO1xuIiwiZXhwb3J0IGNvbnN0IE1hcmtzID0gKHtcbiAgZGF0YSxcbiAgeFNjYWxlLFxuICB5U2NhbGUsXG4gIHhWYWx1ZSxcbiAgeVZhbHVlLFxuICB4VmFsdWVUb3RhbFBlcmNlbnRhZ2VPZlBvcHVsYXRpb24sXG4gIHRvb2x0aXBGb3JtYXRcbn0pID0+XG4gIGRhdGEubWFwKGQgPT4gKFxuICAgIDw+XG4gICAgICA8cmVjdFxuICAgICAgICBrZXk9e3lWYWx1ZShkKX1cbiAgICAgICAgeD17MH1cbiAgICAgICAgeT17eVNjYWxlKFwiVW5lbXBsb3ltZW50XCIpfVxuICAgICAgICB3aWR0aD17eFNjYWxlKHhWYWx1ZShkKSl9XG4gICAgICAgIGhlaWdodD17eVNjYWxlLmJhbmR3aWR0aCgpfVxuICAgICAgICBmaWxsPXtcIm9yYW5nZVwifVxuICAgICAgPlxuXG4gICAgICAgIDx0aXRsZT57dG9vbHRpcEZvcm1hdCh4VmFsdWUoZCkpfTwvdGl0bGU+XG4gICAgICA8L3JlY3Q+XG5cbiAgICAgIDxyZWN0XG4gICAgICAgIGNsYXNzTmFtZT1cIm1hcmtcIlxuICAgICAgICBrZXk9e3lWYWx1ZShkKX1cbiAgICAgICAgeD17MH1cbiAgICAgICAgeT17eVNjYWxlKFwiVG90YWxQZXJjZW50YWdlT2ZQb3B1bGF0aW9uXCIpfVxuICAgICAgICB3aWR0aD17eFNjYWxlKHhWYWx1ZVRvdGFsUGVyY2VudGFnZU9mUG9wdWxhdGlvbihkKSl9XG4gICAgICAgIGhlaWdodD17eVNjYWxlLmJhbmR3aWR0aCgpfVxuICAgICAgPlxuXG4gICAgICAgIDx0aXRsZT57dG9vbHRpcEZvcm1hdCh4VmFsdWUoZCkpfTwvdGl0bGU+XG4gICAgICA8L3JlY3Q+XG4gICAgPC8+XG4gICkpO1xuIiwiZXhwb3J0IGNvbnN0IENvbG9yTGVnZW5kID0gKHsgY29sb3JTY2FsZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpY2tTcGFjaW5nID0gMjAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWNrU2l6ZSA9IDEwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlja1RleHRPZmZzZXQgPSAyMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Ib3ZlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG92ZXJlZFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWRlT3BhY2l0eX0pID0+XG4gIGNvbG9yU2NhbGUuZG9tYWluKCkubWFwKChkb21haW5WYWx1ZSwgaSkgPT4gKFxuICAgIDxnIGNsYXNzTmFtZT1cInRpY2tcIiBcbiAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoMCwgJHtpICogdGlja1NwYWNpbmd9KWB9XG4gICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiB7b25Ib3Zlcihkb21haW5WYWx1ZSk7fX1cbiAgICAgICBvbk1vdXNlT3V0PXsoKSA9PiB7b25Ib3ZlcihudWxsKTt9fVxuICAgICAgIG9wYWNpdHk9e2hvdmVyZWRWYWx1ZSAmJiBkb21haW5WYWx1ZSAhPT0gaG92ZXJlZFZhbHVlID8gZmFkZU9wYWNpdHkgOiAxfVxuICAgID5cbiAgICAgIDxjaXJjbGUgZmlsbD17Y29sb3JTY2FsZShkb21haW5WYWx1ZSl9IHI9e3RpY2tTaXplfSAvPlxuICAgICAgPHRleHQgY2xhc3NOYW1lPVwiYXhpcy1sYWJlbFwiIHg9e3RpY2tUZXh0T2Zmc2V0fSBkeT1cIi4zMmVtXCI+IHtkb21haW5WYWx1ZX0gPC90ZXh0PlxuICAgIDwvZz5cbiAgKSk7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IGNzdiwgYXJjLCBwaWUsIHNjYWxlQmFuZCwgc2NhbGVMaW5lYXIsIHNjYWxlT3JkaW5hbCwgbWF4LCBmb3JtYXQgfSBmcm9tICdkMyc7XG5pbXBvcnQgeyBBeGlzQm90dG9tIH0gZnJvbSAnLi9BeGlzQm90dG9tJztcbmltcG9ydCB7IEF4aXNMZWZ0IH0gZnJvbSAnLi9BeGlzTGVmdCc7XG5pbXBvcnQgeyBNYXJrcyB9IGZyb20gJy4vTWFya3MnO1xuaW1wb3J0IHsgQ29sb3JMZWdlbmQgfSBmcm9tICcuL0NvbG9yTGVnZW5kJztcblxuY29uc3QgbWFyZ2luID0geyB0b3A6IC0zMCwgcmlnaHQ6IDE2MCwgYm90dG9tOiAxNSwgbGVmdDogMjAwIH07XG5jb25zdCB4QXhpc0xhYmVsT2Zmc2V0ID0gMzA7XG5jb25zdCB5QXhpc0xhYmVsT2Zmc2V0ID0gOTA7XG5cbmNvbnN0IHN1Ymdyb3VwcyA9IFtcIlVuZW1wbG95bWVudFwiLCBcIlRvdGFsUGVyY2VudGFnZU9mUG9wdWxhdGlvblwiXTtcbmNvbnN0IGZhZGVPcGFjaXR5ID0gMC4yO1xuXG5leHBvcnQgY29uc3QgTWVudGFsRGlzZWFzZXNCYXJDaGFydCA9ICh7XG4gIGRhdGEsXG4gIHdpZHRoLFxuICBoZWlnaHQsXG4gIHllYXIsXG4gIGhvdmVyZWRWYWx1ZSxcbiAgc2V0SG92ZXJlZFZhbHVlXG59KSA9PiB7XG5cbi8vIEZpbHRlciBEYXRhIEJ5IHllYXJcbiAgY29uc3QgZmlsdGVyZWREYXRhQnlZZWFyID0gZGF0YS5maWx0ZXIoZnVuY3Rpb24oZCkgXG5cdHsgXG5cdFx0aWYoZFtcIlllYXJcIl0uZ2V0RnVsbFllYXIoKSA9PSB5ZWFyKXsgXG4gICAgICByZXR1cm4gZDtcbiAgICB9IFxuICB9KTtcbiAgXG4gIC8vIEZpbHRlciBEYXRhIGJ5IFVuZW1wbG95bWVudFxuICBjb25zdCBmaWx0ZXJlZERhdGFCeVVuZW1wbG95bWVudCA9IGZpbHRlcmVkRGF0YUJ5WWVhci5zbGljZSgpLnNvcnQoKGEsIGIpID0+IGQzLmRlc2NlbmRpbmcoYS5VbmVtcGxveW1lbnQsIGIuVW5lbXBsb3ltZW50KSk7XG5cdFxuICAvLyBFeHRyYWN0IHRvcCA1IHJvd3Mgb3JkZXIgYnkgZGVzY2VuZGluZyB1bmVtcGxveW1lbnQgdmFsdWVcbiAgY29uc3QgZmlsdGVyZWREYXRhID0gZmlsdGVyZWREYXRhQnlVbmVtcGxveW1lbnQuc2xpY2UoMCwgNSk7XG5cbiAgY29uc3QgaW5uZXJIZWlnaHQgPSBoZWlnaHQgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcbiAgY29uc3QgaW5uZXJXaWR0aCA9IHdpZHRoIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG5cbiAgY29uc3QgeVZhbHVlID0gZCA9PiBkLkVudGl0eTtcbiAgXG4gIGNvbnN0IHhWYWx1ZSA9IGQgPT4gZC5VbmVtcGxveW1lbnQ7XG4gIGNvbnN0IHhWYWx1ZVRvdGFsUGVyY2VudGFnZU9mUG9wdWxhdGlvbiA9IGQgPT4gZC5Ub3RhbFBlcmNlbnRhZ2VPZlBvcHVsYXRpb247XG5cbiAgY29uc3Qgc2lGb3JtYXQgPSBmb3JtYXQoJy4ycycpO1xuICBjb25zdCB4QXhpc1RpY2tGb3JtYXQgPSB0aWNrVmFsdWUgPT4gc2lGb3JtYXQodGlja1ZhbHVlKS5yZXBsYWNlKCdHJywgJ0InKTtcbiAgXG4gIC8vIENvbG9yIExlZ2VuZFxuICBjb25zdCBjaXJjbGVSYWRpdXMgPSA3O1xuICBjb25zdCBjb2xvclNjYWxlID0gc2NhbGVPcmRpbmFsKClcbiAgICAuZG9tYWluKFtcIk1lbnRhbCBpbGxuZXNzXCIsIFxuICAgICAgICAgICAgIFwiVW5lbXBsb3ltZW50XCJdKVxuICAgIC5yYW5nZShbJyMxMzdCODAnLCAnb3JhbmdlJ10pO1xuXHRcbiAgY29uc3QgeVNjYWxlID0gc2NhbGVCYW5kKClcbiAgICAuZG9tYWluKGZpbHRlcmVkRGF0YS5tYXAoeVZhbHVlKSlcbiAgICAucmFuZ2UoWzAsIGlubmVySGVpZ2h0XSlcbiAgICAucGFkZGluZ0lubmVyKDAuNSk7XG4gIFxuICBjb25zdCB5U2NhbGVTdWJncm91cDEgPSBkMy5zY2FsZUJhbmQoKVxuICAgIC5kb21haW4oc3ViZ3JvdXBzKVxuICAgIC5yYW5nZShbMCwgeVNjYWxlLmJhbmR3aWR0aCgpXSlcbiAgICAucGFkZGluZyhbMC4zXSlcbiAgXG4gIGNvbnN0IHlTY2FsZVN1Ymdyb3VwMiA9IGQzLnNjYWxlQmFuZCgpXG4gICAgLmRvbWFpbihzdWJncm91cHMpXG4gICAgLnJhbmdlKFsyICogeVNjYWxlLmJhbmR3aWR0aCgpLCAzICogeVNjYWxlLmJhbmR3aWR0aCgpXSlcbiAgICAucGFkZGluZyhbMC4zXSlcbiAgXG4gIGNvbnN0IHlTY2FsZVN1Ymdyb3VwMyA9IGQzLnNjYWxlQmFuZCgpXG4gICAgLmRvbWFpbihzdWJncm91cHMpXG4gICAgLnJhbmdlKFs0ICogeVNjYWxlLmJhbmR3aWR0aCgpLCA1ICogeVNjYWxlLmJhbmR3aWR0aCgpXSlcbiAgICAucGFkZGluZyhbMC4zXSlcbiAgXG4gIGNvbnN0IHlTY2FsZVN1Ymdyb3VwNCA9IGQzLnNjYWxlQmFuZCgpXG4gICAgLmRvbWFpbihzdWJncm91cHMpXG4gICAgLnJhbmdlKFs2ICogeVNjYWxlLmJhbmR3aWR0aCgpLCA3ICogeVNjYWxlLmJhbmR3aWR0aCgpXSlcbiAgICAucGFkZGluZyhbMC4zXSlcbiAgXG4gIGNvbnN0IHlTY2FsZVN1Ymdyb3VwNSA9IGQzLnNjYWxlQmFuZCgpXG4gICAgLmRvbWFpbihzdWJncm91cHMpXG4gICAgLnJhbmdlKFs4ICogeVNjYWxlLmJhbmR3aWR0aCgpLCA5ICogeVNjYWxlLmJhbmR3aWR0aCgpXSlcbiAgICAucGFkZGluZyhbMC4zXSlcblxuICBjb25zdCB4U2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbWF4KGZpbHRlcmVkRGF0YSwgeFZhbHVlKV0pXG4gICAgLnJhbmdlKFswLCBpbm5lcldpZHRoXSk7XG5cbnJldHVybiAoXG4gICAgICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwke21hcmdpbi50b3B9KWB9PlxuICAgICAgICAgIDxBeGlzQm90dG9tIFxuICAgICAgICAgICAgeFNjYWxlPXt4U2NhbGV9XG4gICAgICAgICAgICBpbm5lckhlaWdodD17aW5uZXJIZWlnaHR9XG4gICAgICAgICAgICB0aWNrRm9ybWF0PXt4QXhpc1RpY2tGb3JtYXR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8QXhpc0xlZnQgeVNjYWxlPXt5U2NhbGV9IC8+XG4gICAgICAgICAgPHRleHRcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImF4aXMtbGFiZWxcIlxuICAgICAgICAgICAgeD17aW5uZXJXaWR0aCAvIDJ9XG4gICAgICAgICAgICB5PXtpbm5lckhlaWdodCArIHhBeGlzTGFiZWxPZmZzZXR9XG4gICAgICAgICAgICB0ZXh0QW5jaG9yPVwibWlkZGxlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBQZXJjZW50YWdlIG9mIHRoZSBwb3B1bGF0aW9uXG4gICAgICAgICAgPC90ZXh0PlxuICAgICAgICAgIFxuICAgICAgICAgIDx0ZXh0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJheGlzLWxhYmVsXCJcbiAgICAgICAgICAgIHRleHRBbmNob3I9XCJtaWRkbGVcIlxuICAgICAgICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7LXlBeGlzTGFiZWxPZmZzZXR9LCR7aW5uZXJIZWlnaHQgL1xuICAgICAgICAgICAgICAyfSkgcm90YXRlKC05MClgfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtcIkNvdW50cmllc1wifVxuICAgICAgICAgIDwvdGV4dD5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtpbm5lcldpZHRoICsgNDB9LCAyMClgfT5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPENvbG9yTGVnZW5kIFxuICAgICAgICAgICAgICB0aWNrU3BhY2luZz17MjJ9XG4gICAgICAgICAgICAgIHRpY2tTaXplPXtjaXJjbGVSYWRpdXN9XG4gICAgICAgICAgICAgIHRpY2tUZXh0T2Zmc2V0PXsxMn1cbiAgICAgICAgICAgICAgY29sb3JTY2FsZT17Y29sb3JTY2FsZX1cbiAgICAgICAgICAgICAgb25Ib3Zlcj17c2V0SG92ZXJlZFZhbHVlfVxuICAgICAgICAgICAgICBob3ZlcmVkVmFsdWU9e2hvdmVyZWRWYWx1ZX1cbiAgICAgICAgICAgICAgZmFkZU9wYWNpdHk9e2ZhZGVPcGFjaXR5fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2c+XG5cbiAgICAgICAgICA8TWFya3NcbiAgICAgICAgICAgIGRhdGE9e2ZpbHRlcmVkRGF0YS5zbGljZSgwLDEpfVxuICAgICAgICAgICAgeFNjYWxlPXt4U2NhbGV9XG4gICAgICAgICAgICB5U2NhbGU9e3lTY2FsZVN1Ymdyb3VwMX1cbiAgICAgICAgICAgIHhWYWx1ZT17eFZhbHVlfVxuICAgICAgICAgICAgeVZhbHVlPXt5VmFsdWV9XG4gICAgICAgICAgICB4VmFsdWVUb3RhbFBlcmNlbnRhZ2VPZlBvcHVsYXRpb249e3hWYWx1ZVRvdGFsUGVyY2VudGFnZU9mUG9wdWxhdGlvbn1cbiAgICAgICAgICAgIHRvb2x0aXBGb3JtYXQ9e3hBeGlzVGlja0Zvcm1hdH1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPE1hcmtzXG4gICAgICAgICAgICBkYXRhPXtmaWx0ZXJlZERhdGEuc2xpY2UoMSwyKX1cbiAgICAgICAgICAgIHhTY2FsZT17eFNjYWxlfVxuICAgICAgICAgICAgeVNjYWxlPXt5U2NhbGVTdWJncm91cDJ9XG4gICAgICAgICAgICB4VmFsdWU9e3hWYWx1ZX1cbiAgICAgICAgICAgIHlWYWx1ZT17eVZhbHVlfVxuICAgICAgICAgICAgeFZhbHVlVG90YWxQZXJjZW50YWdlT2ZQb3B1bGF0aW9uPXt4VmFsdWVUb3RhbFBlcmNlbnRhZ2VPZlBvcHVsYXRpb259XG4gICAgICAgICAgICB0b29sdGlwRm9ybWF0PXt4QXhpc1RpY2tGb3JtYXR9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxNYXJrc1xuICAgICAgICAgICAgZGF0YT17ZmlsdGVyZWREYXRhLnNsaWNlKDIsMyl9XG4gICAgICAgICAgICB4U2NhbGU9e3hTY2FsZX1cbiAgICAgICAgICAgIHlTY2FsZT17eVNjYWxlU3ViZ3JvdXAzfVxuICAgICAgICAgICAgeFZhbHVlPXt4VmFsdWV9XG4gICAgICAgICAgICB5VmFsdWU9e3lWYWx1ZX1cbiAgICAgICAgICAgIHhWYWx1ZVRvdGFsUGVyY2VudGFnZU9mUG9wdWxhdGlvbj17eFZhbHVlVG90YWxQZXJjZW50YWdlT2ZQb3B1bGF0aW9ufVxuICAgICAgICAgICAgdG9vbHRpcEZvcm1hdD17eEF4aXNUaWNrRm9ybWF0fVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8TWFya3NcbiAgICAgICAgICAgIGRhdGE9e2ZpbHRlcmVkRGF0YS5zbGljZSgzLDQpfVxuICAgICAgICAgICAgeFNjYWxlPXt4U2NhbGV9XG4gICAgICAgICAgICB5U2NhbGU9e3lTY2FsZVN1Ymdyb3VwNH1cbiAgICAgICAgICAgIHhWYWx1ZT17eFZhbHVlfVxuICAgICAgICAgICAgeVZhbHVlPXt5VmFsdWV9XG4gICAgICAgICAgICB4VmFsdWVUb3RhbFBlcmNlbnRhZ2VPZlBvcHVsYXRpb249e3hWYWx1ZVRvdGFsUGVyY2VudGFnZU9mUG9wdWxhdGlvbn1cbiAgICAgICAgICAgIHRvb2x0aXBGb3JtYXQ9e3hBeGlzVGlja0Zvcm1hdH1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPE1hcmtzXG4gICAgICAgICAgICBkYXRhPXtmaWx0ZXJlZERhdGEuc2xpY2UoNCw1KX1cbiAgICAgICAgICAgIHhTY2FsZT17eFNjYWxlfVxuICAgICAgICAgICAgeVNjYWxlPXt5U2NhbGVTdWJncm91cDV9XG4gICAgICAgICAgICB4VmFsdWU9e3hWYWx1ZX1cbiAgICAgICAgICAgIHlWYWx1ZT17eVZhbHVlfVxuICAgICAgICAgICAgeFZhbHVlVG90YWxQZXJjZW50YWdlT2ZQb3B1bGF0aW9uPXt4VmFsdWVUb3RhbFBlcmNlbnRhZ2VPZlBvcHVsYXRpb259XG4gICAgICAgICAgICB0b29sdGlwRm9ybWF0PXt4QXhpc1RpY2tGb3JtYXR9XG4gICAgICAgICAgLz5cblxuICAgICAgICA8L2c+XG4gICk7XG59OyIsImV4cG9ydCBjb25zdCBBeGlzQm90dG9tID0gKHsgeFNjYWxlLCBpbm5lckhlaWdodCwgdGlja0Zvcm1hdCwgdGlja09mZnNldCA9IDMgfSkgPT5cbiAgeFNjYWxlLnRpY2tzKDYpLm1hcCh0aWNrVmFsdWUgPT4gKFxuICAgIDxnXG4gICAgICBjbGFzc05hbWU9XCJ0aWNrXCJcbiAgICAgIGtleT17dGlja1ZhbHVlfVxuICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7eFNjYWxlKHRpY2tWYWx1ZSl9LDApYH1cbiAgICA+XG4gICAgICA8bGluZSB5Mj17aW5uZXJIZWlnaHR9IC8+XG4gICAgICA8dGV4dCBjbGFzc05hbWU9XCJheGlzLWxhYmVsXCIgc3R5bGU9e3sgdGV4dEFuY2hvcjogJ21pZGRsZScgfX0gZHk9XCIuNzFlbVwiIHk9e2lubmVySGVpZ2h0ICsgdGlja09mZnNldH0+XG4gICAgICAgIHt0aWNrRm9ybWF0KHRpY2tWYWx1ZSl9XG4gICAgICA8L3RleHQ+XG4gICAgPC9nPlxuICApKTtcbiIsImV4cG9ydCBjb25zdCBBeGlzTGVmdCA9ICh7IHlTY2FsZSwgaW5uZXJXaWR0aCwgdGlja09mZnNldCA9IDMgfSkgPT5cbiAgeVNjYWxlLnRpY2tzKDUpLm1hcCh0aWNrVmFsdWUgPT4gKFxuICAgIDxnIGNsYXNzTmFtZT1cInRpY2tcIiB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoMCwke3lTY2FsZSh0aWNrVmFsdWUpfSlgfT5cbiAgICAgIDxsaW5lIHgyPXtpbm5lcldpZHRofSAvPlxuICAgICAgPHRleHRcbiAgICAgICAgY2xhc3NOYW1lPVwiYXhpcy1sYWJlbFwiXG4gICAgICAgIGtleT17dGlja1ZhbHVlfVxuICAgICAgICBzdHlsZT17eyB0ZXh0QW5jaG9yOiAnZW5kJyB9fVxuICAgICAgICB4PXstdGlja09mZnNldH1cbiAgICAgICAgZHk9XCIuMzJlbVwiXG4gICAgICA+XG4gICAgICAgIHt0aWNrVmFsdWV9XG4gICAgICA8L3RleHQ+XG4gICAgPC9nPlxuICApKTtcbiIsImltcG9ydCB7IGxpbmUsIGN1cnZlTmF0dXJhbCB9IGZyb20gJ2QzJztcblxuZXhwb3J0IGNvbnN0IE1hcmtzID0gKHtcbiAgZGF0YSxcbiAgeFNjYWxlLFxuICB5U2NhbGUsXG4gIHhWYWx1ZSxcbiAgeVZhbHVlLFxuICB0b29sdGlwRm9ybWF0LFxuICBjaXJjbGVSYWRpdXNcbn0pID0+IChcblxuPGcgY2xhc3NOYW1lPVwibWFya3NcIj5cblxuXHQ8cGF0aFxuICAgIGZpbGw9XCJub25lXCJcbiAgICBzdHJva2U9XCJibGFja1wiXG4gICAgZD17bGluZSgpXG4gICAgICAueChkID0+IHhTY2FsZSh4VmFsdWUoZCkpKVxuICAgICAgLnkoZCA9PiB5U2NhbGUoeVZhbHVlKGQpKSlcbiAgICBcdC5jdXJ2ZShjdXJ2ZU5hdHVyYWwpKGRhdGEpfSBcbiAgXG4gIC8+XG4gIHt9XG4gIFxuPC9nPlxuICBcbik7IiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VDYWxsYmFjaywgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBjc3YsIHNjYWxlTGluZWFyLCBzY2FsZVRpbWUsIG1heCwgZm9ybWF0LCB0aW1lRm9ybWF0LCBleHRlbnQgfSBmcm9tICdkMyc7XG5pbXBvcnQgeyBBeGlzQm90dG9tIH0gZnJvbSAnLi9BeGlzQm90dG9tJztcbmltcG9ydCB7IEF4aXNMZWZ0IH0gZnJvbSAnLi9BeGlzTGVmdCc7XG5pbXBvcnQgeyBNYXJrcyB9IGZyb20gJy4vTWFya3MnO1xuaW1wb3J0IFJlYWN0RHJvcGRvd24gZnJvbSAncmVhY3QtZHJvcGRvd24nO1xuXG4vL2NvbnN0IG1hcmdpbiA9IHsgdG9wOiAyMCwgcmlnaHQ6IDMwLCBib3R0b206IDE2NSwgbGVmdDogOTAgfTtcbmNvbnN0IHhBeGlzTGFiZWxPZmZzZXQgPSAzMDtcblxuLy8gVGhpcyBpcyB1c2VkIHRvIG1vdmUgdGhlIGxhYmVsIGZyb20gdGhlIHkgYXhpcyB2YWx1ZXNcbmNvbnN0IHlBeGlzTGFiZWxPZmZzZXQgPSA0MDtcblxuZXhwb3J0IGNvbnN0IFN1aWNpZGVzTGluZUNoYXJ0ID0gKHtcbiAgZGF0YSxcbiAgd2lkdGgsXG4gIGhlaWdodCxcbiAgeUF0dHJpYnV0ZSxcbiAgY291bnRyeUF0dHJpYnV0ZVxufSkgPT4ge1xuICBjb25zdCBtYXJnaW4gPSB7IHRvcDogLTIwLCByaWdodDogNTAsIGJvdHRvbTogMTUsIGxlZnQ6IDkwIH07XG5cbiAgY29uc3QgeVZhbHVlID0gKGQpID0+IGRbJ1N1aWNpZGVEZWF0aHNSYXRlJ107XG4gIGNvbnN0IHlBeGlzTGFiZWwgPSAnU2hhcmUgb2YgZGVhdGhzICUnO1xuXG4gIC8vIEZpbHRlciBDb3N0YSBSaWNhIERhdGFcbiAgY29uc3QgZmlsdGVyZWREYXRhID0gZGF0YS5maWx0ZXIoZnVuY3Rpb24gKGQpIHtcbiAgICBpZiAoZFsnRW50aXR5J10gPT0gY291bnRyeUF0dHJpYnV0ZSkge1xuICAgICAgcmV0dXJuIGQ7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBpbm5lckhlaWdodCA9IGhlaWdodCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuICBjb25zdCBpbm5lcldpZHRoID0gd2lkdGggLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcblxuICBjb25zdCB4VmFsdWUgPSAoZCkgPT4gZC5ZZWFyO1xuICBjb25zdCB4QXhpc0xhYmVsID0gJ1llYXJzJztcbiAgY29uc3QgeEF4aXNUaWNrRm9ybWF0ID0gdGltZUZvcm1hdCgnJVknKTtcblxuICBjb25zdCB4U2NhbGUgPSBzY2FsZVRpbWUoKVxuICAgIC5kb21haW4oZXh0ZW50KGZpbHRlcmVkRGF0YSwgeFZhbHVlKSlcbiAgICAucmFuZ2UoWzAsIGlubmVyV2lkdGhdKVxuICAgIC5uaWNlKCk7XG5cbiAgY29uc3QgeVNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oZXh0ZW50KGZpbHRlcmVkRGF0YSwgeVZhbHVlKSlcbiAgICAucmFuZ2UoW2lubmVySGVpZ2h0LCAwXSlcbiAgICAubmljZSgpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwke21hcmdpbi50b3B9KWB9PlxuICAgICAgICA8QXhpc0JvdHRvbVxuICAgICAgICAgIHhTY2FsZT17eFNjYWxlfVxuICAgICAgICAgIGlubmVySGVpZ2h0PXtpbm5lckhlaWdodH1cbiAgICAgICAgICB0aWNrRm9ybWF0PXt4QXhpc1RpY2tGb3JtYXR9XG4gICAgICAgICAgdGlja09mZnNldD17N31cbiAgICAgICAgLz5cbiAgICAgICAgPHRleHRcbiAgICAgICAgICBjbGFzc05hbWU9XCJheGlzLWxhYmVsXCJcbiAgICAgICAgICB0ZXh0QW5jaG9yPVwibWlkZGxlXCJcbiAgICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHsteUF4aXNMYWJlbE9mZnNldH0sJHtcbiAgICAgICAgICAgIGlubmVySGVpZ2h0IC8gMlxuICAgICAgICAgIH0pIHJvdGF0ZSgtOTApYH1cbiAgICAgICAgPlxuICAgICAgICAgIHt5QXhpc0xhYmVsfVxuICAgICAgICA8L3RleHQ+XG4gICAgICAgIDxBeGlzTGVmdCB5U2NhbGU9e3lTY2FsZX0gaW5uZXJXaWR0aD17aW5uZXJXaWR0aH0gdGlja09mZnNldD17N30gLz5cbiAgICAgICAgPHRleHRcbiAgICAgICAgICBjbGFzc05hbWU9XCJheGlzLWxhYmVsXCJcbiAgICAgICAgICB4PXtpbm5lcldpZHRoIC8gMn1cbiAgICAgICAgICB5PXtpbm5lckhlaWdodCArIHhBeGlzTGFiZWxPZmZzZXR9XG4gICAgICAgICAgdGV4dEFuY2hvcj1cIm1pZGRsZVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eEF4aXNMYWJlbH1cbiAgICAgICAgPC90ZXh0PlxuICAgICAgICA8TWFya3NcbiAgICAgICAgICBkYXRhPXtmaWx0ZXJlZERhdGF9XG4gICAgICAgICAgeFNjYWxlPXt4U2NhbGV9XG4gICAgICAgICAgeVNjYWxlPXt5U2NhbGV9XG4gICAgICAgICAgeFZhbHVlPXt4VmFsdWV9XG4gICAgICAgICAgeVZhbHVlPXt5VmFsdWV9XG4gICAgICAgICAgdG9vbHRpcEZvcm1hdD17eEF4aXNUaWNrRm9ybWF0fVxuICAgICAgICAgIGNpcmNsZVJhZGl1cz17M31cbiAgICAgICAgLz5cbiAgICAgIDwvZz5cbiAgICA8Lz5cbiAgKTtcbn07XG4iLCJleHBvcnQgY29uc3QgQXhpc0JvdHRvbSA9ICh7IHhTY2FsZSwgaW5uZXJIZWlnaHQsIHRpY2tGb3JtYXQsIHRpY2tPZmZzZXQgPSAzIH0pID0+XG4gIHhTY2FsZS50aWNrcyg2KS5tYXAodGlja1ZhbHVlID0+IChcbiAgICA8Z1xuICAgICAgY2xhc3NOYW1lPVwidGlja1wiXG4gICAgICBrZXk9e3RpY2tWYWx1ZX1cbiAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3hTY2FsZSh0aWNrVmFsdWUpfSwwKWB9XG4gICAgPlxuICAgICAgPGxpbmUgeTI9e2lubmVySGVpZ2h0fSAvPlxuICAgICAgPHRleHQgY2xhc3NOYW1lPVwiYXhpcy1sYWJlbFwiIHN0eWxlPXt7IHRleHRBbmNob3I6ICdtaWRkbGUnIH19IGR5PVwiLjcxZW1cIiB5PXtpbm5lckhlaWdodCArIHRpY2tPZmZzZXR9PlxuICAgICAgICB7dGlja0Zvcm1hdCh0aWNrVmFsdWUpfVxuICAgICAgPC90ZXh0PlxuICAgIDwvZz5cbiAgKSk7XG4iLCJleHBvcnQgY29uc3QgQXhpc0xlZnQgPSAoeyB5U2NhbGUsIGlubmVyV2lkdGgsIHRpY2tPZmZzZXQgPSAzIH0pID0+XG4gIHlTY2FsZS50aWNrcyg1KS5tYXAodGlja1ZhbHVlID0+IChcbiAgICA8ZyBjbGFzc05hbWU9XCJ0aWNrXCIgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKDAsJHt5U2NhbGUodGlja1ZhbHVlKX0pYH0+XG4gICAgICA8bGluZSB4Mj17aW5uZXJXaWR0aH0gLz5cbiAgICAgIDx0ZXh0XG4gICAgICAgIGNsYXNzTmFtZT1cImF4aXMtbGFiZWxcIlxuICAgICAgICBrZXk9e3RpY2tWYWx1ZX1cbiAgICAgICAgc3R5bGU9e3sgdGV4dEFuY2hvcjogJ2VuZCcgfX1cbiAgICAgICAgeD17LXRpY2tPZmZzZXR9XG4gICAgICAgIGR5PVwiLjMyZW1cIlxuICAgICAgPlxuICAgICAgICB7dGlja1ZhbHVlfVxuICAgICAgPC90ZXh0PlxuICAgIDwvZz5cbiAgKSk7XG4iLCJpbXBvcnQgeyBsaW5lLCBjdXJ2ZU5hdHVyYWwgfSBmcm9tICdkMyc7XG5cbmV4cG9ydCBjb25zdCBNYXJrcyA9ICh7XG4gIGRhdGEsXG4gIHhTY2FsZSxcbiAgeVNjYWxlLFxuICB4VmFsdWUsXG4gIHlWYWx1ZSxcbiAgdG9vbHRpcEZvcm1hdCxcbiAgY2lyY2xlUmFkaXVzLFxuICBjb2xvclZhbHVlXG59KSA9PiAoXG5cbjxnIGNsYXNzTmFtZT1cInVuZW1wbG95bWVudC1tYXJrc1wiPlxuXG5cdDxwYXRoXG4gICAgZmlsbD1cIm5vbmVcIlxuICAgIHN0cm9rZT17Y29sb3JWYWx1ZX1cbiAgICBkPXtsaW5lKClcbiAgICAgIC54KGQgPT4geFNjYWxlKHhWYWx1ZShkKSkpXG4gICAgICAueShkID0+IHlTY2FsZSh5VmFsdWUoZCkpKVxuICAgIFx0LmN1cnZlKGN1cnZlTmF0dXJhbCkoZGF0YSl9IFxuICBcbiAgLz5cbiAge31cbiAgXG48L2c+XG4gIFxuKTsiLCJleHBvcnQgY29uc3QgQ29sb3JMZWdlbmQgPSAoeyBjb2xvclNjYWxlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlja1NwYWNpbmcgPSAyMCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpY2tTaXplID0gMTAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWNrVGV4dE9mZnNldCA9IDIwfSkgPT5cbiAgPD5cbiAgPGcgY2xhc3NOYW1lPVwidGlja1wiXG4gICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgwLCAkezEgKiB0aWNrU3BhY2luZ30pYH1cbiAgPlxuICAgIDxjaXJjbGUgZmlsbD17XCJPcmFuZ2VcIn0gcj17dGlja1NpemV9IC8+XG4gICAgICA8dGV4dCBjbGFzc05hbWU9XCJheGlzLWxhYmVsXCIgeD17dGlja1RleHRPZmZzZXR9IGR5PVwiLjMyZW1cIj4ge1wiVW5lbXBsb3ltZW50XCJ9IDwvdGV4dD5cbiAgPC9nPlxuICA8ZyBjbGFzc05hbWU9XCJ0aWNrXCJcbiAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKDAsICR7Mi41ICogdGlja1NwYWNpbmd9KWB9XG4gID5cbiAgICA8Y2lyY2xlIGZpbGw9e1wiR3JlZW5cIn0gcj17dGlja1NpemV9IC8+XG4gICAgICA8dGV4dCBjbGFzc05hbWU9XCJheGlzLWxhYmVsXCIgeD17dGlja1RleHRPZmZzZXR9IGR5PVwiLjMyZW1cIiA+XG4gICAgICAgIDx0c3BhbiB4PXt0aWNrVGV4dE9mZnNldH0gZHk9XCIuMzJlbVwiPlBlb3BsZSB0aGF0PC90c3Bhbj5cbiAgICAgICAgPHRzcGFuIHg9e3RpY2tUZXh0T2Zmc2V0fSBkeT1cIjEuMmVtXCI+aGF2ZSBzdWZmZXJlZDwvdHNwYW4+XG4gICAgICAgIDx0c3BhbiB4PXt0aWNrVGV4dE9mZnNldH0gZHk9XCIxLjJlbVwiPnNvbWUgbWVudGFsPC90c3Bhbj5cbiAgICAgICAgPHRzcGFuIHg9e3RpY2tUZXh0T2Zmc2V0fSBkeT1cIjEuMmVtXCI+aWxsbmVzczwvdHNwYW4+XG4gICAgICA8L3RleHQ+ICBcbiAgPC9nPlxuICA8Lz5cbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgY3N2LCBzY2FsZUxpbmVhciwgc2NhbGVUaW1lLCBtYXgsIG1pbiwgZm9ybWF0LCB0aW1lRm9ybWF0LCBleHRlbnQgfSBmcm9tICdkMyc7XG5pbXBvcnQgeyBBeGlzQm90dG9tIH0gZnJvbSAnLi9BeGlzQm90dG9tJztcbmltcG9ydCB7IEF4aXNMZWZ0IH0gZnJvbSAnLi9BeGlzTGVmdCc7XG5pbXBvcnQgeyBNYXJrcyB9IGZyb20gJy4vTWFya3MnO1xuaW1wb3J0IFJlYWN0RHJvcGRvd24gZnJvbSAncmVhY3QtZHJvcGRvd24nO1xuaW1wb3J0IHsgQ29sb3JMZWdlbmQgfSBmcm9tICcuL0NvbG9yTGVnZW5kJztcblxuY29uc3QgbWFyZ2luID0geyB0b3A6IDAsIHJpZ2h0OiAxNjAsIGJvdHRvbTogMTUsIGxlZnQ6IDIwMCB9O1xuY29uc3QgeEF4aXNMYWJlbE9mZnNldCA9IDMwO1xuY29uc3QgeUF4aXNMYWJlbE9mZnNldCA9IDM1O1xuXG5leHBvcnQgY29uc3QgVW5lbXBsb3ltZW50TGluZUNoYXJ0ID0gKHtcbiAgZGF0YSxcbiAgd2lkdGgsXG4gIGhlaWdodCxcbiAgY291bnRyeUF0dHJpYnV0ZVxufSkgPT4ge1xuXG5jb25zdCB5VW5lbXBsb3ltZW50VmFsdWUgPSBkID0+IGRbXCJVbmVtcGxveW1lbnRcIl07XG5cbi8vIEZpbHRlciBDb3N0YSBSaWNhIERhdGFcbiAgY29uc3QgZmlsdGVyZWREYXRhID0gZGF0YS5maWx0ZXIoZnVuY3Rpb24oZCkgXG5cdHsgXG5cdFx0aWYoZFtcIkVudGl0eVwiXSA9PSBjb3VudHJ5QXR0cmlidXRlKXsgXG4gICAgICByZXR1cm4gZDtcbiAgICB9IFxuICB9KTtcblxuICBjb25zdCBpbm5lckhlaWdodCA9IGhlaWdodCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuICBjb25zdCBpbm5lcldpZHRoID0gd2lkdGggLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbiAgXG4gIGNvbnN0IGNpcmNsZVJhZGl1cyA9IDc7XG5cbiAgY29uc3QgeFZhbHVlID0gZCA9PiBkLlllYXI7XG4gIGNvbnN0IHhBeGlzTGFiZWwgPSAnWWVhcnMnO1xuICBjb25zdCB4QXhpc1RpY2tGb3JtYXQgPSB0aW1lRm9ybWF0KCclWScpO1xuICBcbiAgY29uc3QgeU1lbnRhbElsbG5lc3NWYWx1ZSA9IGQgPT4gZC5Ub3RhbFBlcmNlbnRhZ2VPZlBvcHVsYXRpb247XG4gIGNvbnN0IHlBeGlzTGFiZWwgPSBcIlBvcHVsYXRpb24gJVwiO1xuXG4gIGNvbnN0IHhTY2FsZSA9IHNjYWxlVGltZSgpXG4gICAgLmRvbWFpbihleHRlbnQoZmlsdGVyZWREYXRhLCB4VmFsdWUpKVxuICAgIC5yYW5nZShbMCwgaW5uZXJXaWR0aF0pXG4gICAgLm5pY2UoKTtcbiAgXG4gIC8vIFNldCB5U2NhbGVcbiAgY29uc3QgeU1lbnRhbElsbG5lc3NWYWx1ZU1pbk1heCA9IGV4dGVudChmaWx0ZXJlZERhdGEsIHlNZW50YWxJbGxuZXNzVmFsdWUpO1xuICBjb25zdCB5VW5lbXBsb3ltZW50VmFsdWVNaW5NYXggPSBleHRlbnQoZmlsdGVyZWREYXRhLCB5VW5lbXBsb3ltZW50VmFsdWUpO1xuICBjb25zdCB5TWVyZ2VNaW5NYXhWYWx1ZXMgPSB5TWVudGFsSWxsbmVzc1ZhbHVlTWluTWF4LmNvbmNhdCh5VW5lbXBsb3ltZW50VmFsdWVNaW5NYXgpO1xuICBjb25zdCB5TWluVmFsdWUgPSBtaW4oeU1lcmdlTWluTWF4VmFsdWVzKTtcbiAgY29uc3QgeU1heFZhbHVlID0gbWF4KHlNZXJnZU1pbk1heFZhbHVlcyk7XG5cbiAgY29uc3QgeVNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oW3lNaW5WYWx1ZSwgeU1heFZhbHVlXSlcbiAgICAucmFuZ2UoW2lubmVySGVpZ2h0LCAwXSlcbiAgXHQubmljZSgpO1xuICBcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sJHttYXJnaW4udG9wfSlgfT5cbiAgICAgICAgICA8QXhpc0JvdHRvbVxuICAgICAgICAgICAgeFNjYWxlPXt4U2NhbGV9XG4gICAgICAgICAgICBpbm5lckhlaWdodD17aW5uZXJIZWlnaHR9XG4gICAgICAgICAgICB0aWNrRm9ybWF0PXt4QXhpc1RpY2tGb3JtYXR9XG4gICAgICAgICAgICB0aWNrT2Zmc2V0PXs3fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHRleHRcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImF4aXMtbGFiZWxcIlxuICAgICAgICAgICAgdGV4dEFuY2hvcj1cIm1pZGRsZVwiXG4gICAgICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHsteUF4aXNMYWJlbE9mZnNldH0sJHtpbm5lckhlaWdodCAvXG4gICAgICAgICAgICAgIDJ9KSByb3RhdGUoLTkwKWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3lBeGlzTGFiZWx9XG4gICAgICAgICAgPC90ZXh0PlxuICAgICAgICAgIDxBeGlzTGVmdCB5U2NhbGU9e3lTY2FsZX0gaW5uZXJXaWR0aD17aW5uZXJXaWR0aH0gdGlja09mZnNldD17N30gLz5cbiAgICAgICAgICA8dGV4dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXhpcy1sYWJlbFwiXG4gICAgICAgICAgICB4PXtpbm5lcldpZHRoIC8gMn1cbiAgICAgICAgICAgIHk9e2lubmVySGVpZ2h0ICsgeEF4aXNMYWJlbE9mZnNldH1cbiAgICAgICAgICAgIHRleHRBbmNob3I9XCJtaWRkbGVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt4QXhpc0xhYmVsfVxuICAgICAgICAgIDwvdGV4dD5cbiAgICAgICAgICA8ZyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtpbm5lcldpZHRoICsgNjB9LCAwKWB9PlxuICAgICAgICAgICAgPENvbG9yTGVnZW5kIFxuICAgICAgICAgICAgICB0aWNrU3BhY2luZz17MjJ9XG4gICAgICAgICAgICAgIHRpY2tTaXplPXtjaXJjbGVSYWRpdXN9XG4gICAgICAgICAgICAgIHRpY2tUZXh0T2Zmc2V0PXsxMn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9nPlxuICAgICAgICAgIDxNYXJrc1xuICAgICAgICAgICAgZGF0YT17ZmlsdGVyZWREYXRhfVxuICAgICAgICAgICAgeFNjYWxlPXt4U2NhbGV9XG4gICAgICAgICAgICB5U2NhbGU9e3lTY2FsZX1cbiAgICAgICAgICAgIHhWYWx1ZT17eFZhbHVlfVxuICAgICAgICAgICAgeVZhbHVlPXt5TWVudGFsSWxsbmVzc1ZhbHVlfVxuICAgICAgICAgICAgdG9vbHRpcEZvcm1hdD17eEF4aXNUaWNrRm9ybWF0fVxuICAgICAgICAgICAgY2lyY2xlUmFkaXVzPXszfVxuICAgICAgICAgICAgY29sb3JWYWx1ZT17XCJHcmVlblwifVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPE1hcmtzXG4gICAgICAgICAgICBkYXRhPXtmaWx0ZXJlZERhdGF9XG4gICAgICAgICAgICB4U2NhbGU9e3hTY2FsZX1cbiAgICAgICAgICAgIHlTY2FsZT17eVNjYWxlfVxuICAgICAgICAgICAgeFZhbHVlPXt4VmFsdWV9XG4gICAgICAgICAgICB5VmFsdWU9e3lVbmVtcGxveW1lbnRWYWx1ZX1cbiAgICAgICAgICAgIHRvb2x0aXBGb3JtYXQ9e3hBeGlzVGlja0Zvcm1hdH1cbiAgICAgICAgICAgIGNpcmNsZVJhZGl1cz17M31cbiAgICAgICAgICAgIGNvbG9yVmFsdWU9e1wiT3JhbmdlXCJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9nPlxuICAgIDwvPlxuICApO1xufTsiLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7XG4gIGNzdixcbiAgc2NhbGVMaW5lYXIsXG4gIHNjYWxlVGltZSxcbiAgbWF4LFxuICBmb3JtYXQsXG4gIHRpbWVGb3JtYXQsXG4gIGV4dGVudCxcbn0gZnJvbSAnZDMnO1xuaW1wb3J0IHsgdXNlRGF0YSB9IGZyb20gJy4vdXNlRGF0YSc7XG5pbXBvcnQgeyBNZW50YWxEaXNlYXNlc0xpbmVDaGFydCB9IGZyb20gJy4vTWVudGFsRGlzZWFzZXNMaW5lQ2hhcnQvaW5kZXguanMnO1xuaW1wb3J0IHsgTWVudGFsRGlzZWFzZXNCYXJDaGFydCB9IGZyb20gJy4vTWVudGFsRGlzZWFzZXNCYXJDaGFydC9pbmRleC5qcyc7XG5pbXBvcnQgeyBTdWljaWRlc0xpbmVDaGFydCB9IGZyb20gJy4vU3VpY2lkZXNMaW5lQ2hhcnQvaW5kZXguanMnO1xuaW1wb3J0IHsgVW5lbXBsb3ltZW50TGluZUNoYXJ0IH0gZnJvbSAnLi9VbmVtcGxveW1lbnRMaW5lQ2hhcnQvaW5kZXguanMnO1xuaW1wb3J0IFJlYWN0RHJvcGRvd24gZnJvbSAncmVhY3QtZHJvcGRvd24nO1xuXG5jb25zdCB3aWR0aCA9IDk2MDtcbmNvbnN0IGhlaWdodCA9IDUwMDtcbmNvbnN0IGxpbmVDaGFydFNpemUgPSAwLjI7XG5cbmNvbnN0IGF0dHJpYnV0ZXMgPSBbXG4gIHsgdmFsdWU6ICdBbGNvaG9sVXNlRGlzb3JkZXJzJywgbGFiZWw6ICdBbGNvaG9sIFVzZSBEaXNvcmRlcnMnIH0sXG4gIHsgdmFsdWU6ICdEcnVnVXNlRGlzb3JkZXJzJywgbGFiZWw6ICdEcnVnIFVzZSBEaXNvcmRlcnMnIH0sXG4gIHsgdmFsdWU6ICdEZXByZXNzaXZlRGlzb3JkZXJzJywgbGFiZWw6ICdEZXByZXNzaXZlIERpc29yZGVycycgfSxcbiAgeyB2YWx1ZTogJ0JpcG9sYXJEaXNvcmRlcicsIGxhYmVsOiAnQmlwb2xhciBEaXNvcmRlcicgfSxcbiAgeyB2YWx1ZTogJ0FueGlldHlEaXNvcmRlcnMnLCBsYWJlbDogJ0FueGlldHkgRGlzb3JkZXJzJyB9LFxuICB7IHZhbHVlOiAnRWF0aW5nRGlzb3JkZXJzJywgbGFiZWw6ICdFYXRpbmcgRGlzb3JkZXJzJyB9LFxuICB7IHZhbHVlOiAnU2NoaXpvcGhyZW5pYScsIGxhYmVsOiAnU2NoaXpvcGhyZW5pYScgfSxcbl07XG5cbmNvbnN0IGRyb3Bkb3duT3B0aW9ucyA9IFtcbiAgICB7dmFsdWU6IFwiMTk5NVwiLCBsYWJlbDogJzE5OTUnfSxcbiAgICB7dmFsdWU6IFwiMjAwMFwiLCBsYWJlbDogJzIwMDAnfSxcbiAgICB7dmFsdWU6IFwiMjAwNVwiLCBsYWJlbDogJzIwMDUnfSxcbiAgICB7dmFsdWU6IFwiMjAxMFwiLCBsYWJlbDogJzIwMTAnfSxcbiAgICB7dmFsdWU6IFwiMjAxNVwiLCBsYWJlbDogJzIwMTUnfVxuXTtcblxuY29uc3QgQXBwID0gKCkgPT4ge1xuICBjb25zdCBkYXRhID0gdXNlRGF0YSgpO1xuICBcbiAgLy8gTWVudGFsIGRpc2Vhc2UgYW5kIFVuZW1wbG95bWVudCBCYXIgQ2hhcnQgTWVudVxuICBjb25zdCBbaG92ZXJlZFZhbHVlLCBzZXRIb3ZlcmVkVmFsdWVdID0gdXNlU3RhdGUobnVsbCk7XG4gIFxuICAvLyBNZW50YWwgZGlzZWFzZSBhbmQgVW5lbXBsb3ltZW50IEJhciBDaGFydCBZZWFycyBtZW51XG4gIGNvbnN0IGluaXRpYWxZZWFyID0gJzIwMDUnO1xuICBjb25zdCBbeWVhciwgc2V0WWVhcl0gPSB1c2VTdGF0ZShpbml0aWFsWWVhcik7XG4gIFxuICAvLyBTdWljaWRlcyBMaW5lIENoYXJ0IE1lbnVcbiAgY29uc3Qgc3VpY2lkZXNJbml0aWFsQ291bnRyeUF0dHJpYnV0ZSA9ICdDb3N0YSBSaWNhJztcbiAgY29uc3QgW3N1aWNpZGVzQ291bnRyeUF0dHJpYnV0ZSwgc2V0U3VpY2lkZXNDb3VudHJ5QXR0cmlidXRlXSA9IHVzZVN0YXRlKFxuICAgIHN1aWNpZGVzSW5pdGlhbENvdW50cnlBdHRyaWJ1dGVcbiAgKTtcbiAgXG4gIC8vIFVuZW1wbG95bWVudCBMaW5lIENoYXJ0IE1lbnVcbiAgY29uc3QgdW5lbXBsb3ltZW50SW5pdGlhbENvdW50cnlBdHRyaWJ1dGUgPSAnQ29zdGEgUmljYSc7XG4gIGNvbnN0IFt1bmVtcGxveW1lbnRDb3VudHJ5QXR0cmlidXRlLCBzZXRVbmVtcGxveW1lbnRDb3VudHJ5QXR0cmlidXRlXSA9IHVzZVN0YXRlKFxuICAgIHVuZW1wbG95bWVudEluaXRpYWxDb3VudHJ5QXR0cmlidXRlXG4gICk7XG5cbiAgLy8gTWVudGFsIGRpc2Vhc2UgTGluZSBDaGFydCBNZW51XG4gIGNvbnN0IGluaXRpYWxZQXR0cmlidXRlID0gJ1NjaGl6b3BocmVuaWEnO1xuICBjb25zdCBbeUF0dHJpYnV0ZSwgc2V0WUF0dHJpYnV0ZV0gPSB1c2VTdGF0ZShpbml0aWFsWUF0dHJpYnV0ZSk7XG5cbiAgLy8gQ291bnRyeSBGaWx0ZXIgTWVudVxuICBjb25zdCBpbml0aWFsQ291bnRyeUF0dHJpYnV0ZSA9ICdDb3N0YSBSaWNhJztcbiAgY29uc3QgW2NvdW50cnlBdHRyaWJ1dGUsIHNldENvdW50cnlBdHRyaWJ1dGVdID0gdXNlU3RhdGUoXG4gICAgaW5pdGlhbENvdW50cnlBdHRyaWJ1dGVcbiAgKTtcblxuICBpZiAoIWRhdGEpIHtcbiAgICByZXR1cm4gPHByZT5Mb2FkaW5nLi4uPC9wcmU+O1xuICB9XG4gIFxuICAvLyBHZXQgYWxsIGNvdW50cmllcyBuYW1lc1xuICB2YXIgY291bnRyaWVzTGlzdCA9IFtdO1xuICBjb25zdCBnZXRDb3VudHJpZXNGcm9tRGF0YSA9IGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgIGNvdW50cmllc0xpc3QucHVzaChkLkVudGl0eSk7XG4gIH0pO1xuXG4gIC8vIEdldCBhbGwgdW5pcXVlIGNvdW50cmllcyBuYW1lc1xuICBjb25zdCB1bmlxdWVDb3VudHJpZXNMaXN0ID0gQXJyYXkuZnJvbShuZXcgU2V0KGNvdW50cmllc0xpc3QpKTtcblxuICBjb25zdCBjb3VudHJpZXNEaWN0aW9uYXJ5TGlzdCA9IFtdO1xuICB1bmlxdWVDb3VudHJpZXNMaXN0Lm1hcCgoY291bnRyeSkgPT4ge1xuICAgIGNvdW50cmllc0RpY3Rpb25hcnlMaXN0LnB1c2goe1xuICAgICAgdmFsdWU6IGNvdW50cnksXG4gICAgICBsYWJlbDogY291bnRyeSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW50YWwtaWxsbmVzcy10aXRsZS1jb250YWluZXJcIj4gXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1lbnRhbC10aXRsZS1sYWJlbFwiPk1lbnRhbCBpbGxuZXNzZXMgb3ZlciB0aGUgeWVhcnM8L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRvcC11bmVtcGxveW1lbnQtdGl0bGUtbGFiZWxcIj5Ub3AgNSBvZiB0aGUgY291bnRyaWVzIG1vc3QgYWZmZWN0ZWQgYnkgdW5lbXBsb3ltZW50PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpbmUtY2hhcnQtbWVudXMtY29udGFpbmVyXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxpbmUtY2hhcnQtZHJvcGRvd24tbGFiZWxcIj5Db3VudHJ5PC9zcGFuPlxuICAgICAgICA8UmVhY3REcm9wZG93blxuICAgICAgICAgIG9wdGlvbnM9e2NvdW50cmllc0RpY3Rpb25hcnlMaXN0fVxuICAgICAgICAgIHZhbHVlPXtjb3VudHJ5QXR0cmlidXRlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoeyB2YWx1ZSB9KSA9PiBzZXRDb3VudHJ5QXR0cmlidXRlKHZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGluZS1jaGFydC1kcm9wZG93bi1sYWJlbFwiPk1lbnRhbCBkaXNlYXNlPC9zcGFuPlxuICAgICAgICA8UmVhY3REcm9wZG93blxuICAgICAgICAgIG9wdGlvbnM9e2F0dHJpYnV0ZXN9XG4gICAgICAgICAgdmFsdWU9e3lBdHRyaWJ1dGV9XG4gICAgICAgICAgb25DaGFuZ2U9eyh7IHZhbHVlIH0pID0+IHNldFlBdHRyaWJ1dGUodmFsdWUpfVxuICAgICAgICAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhci1jaGFydC1tZW51cy1jb250YWluZXJcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJiYXItY2hhcnQtZHJvcGRvd24tbGFiZWxcIj5ZZWFyPC9zcGFuPlxuICAgICAgICAgIDxSZWFjdERyb3Bkb3duIFxuICAgICAgICAgICAgb3B0aW9ucz17ZHJvcGRvd25PcHRpb25zfVxuICAgICAgICAgICAgdmFsdWU9e3llYXJ9XG4gICAgICAgICAgICBvbkNoYW5nZT17KHt2YWx1ZX0pID0+IHNldFllYXIodmFsdWUpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICBcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VpY2lkZXMtdGl0bGUtY29udGFpbmVyXCI+IFxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdWljaWRlcy10aXRsZS1sYWJlbFwiPlNoYXJlIG9mIGRlYXRocyBmcm9tIHN1aWNpZGU8L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInVuZW1wbG95bWVudC10aXRsZS1sYWJlbFwiPk1lbnRhbCBpbGxuZXNzIGFuZCBVbmVtcGxveW1lbnQ8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWljaWRlcy1tZW51cy1jb250YWluZXJcIj5cbiAgICAgICAgXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJhci1jaGFydC1kcm9wZG93bi1sYWJlbFwiPkNvdW50cnk8L3NwYW4+XG4gICAgICAgIDxSZWFjdERyb3Bkb3duXG4gICAgICAgICAgb3B0aW9ucz17Y291bnRyaWVzRGljdGlvbmFyeUxpc3R9XG4gICAgICAgICAgdmFsdWU9e3N1aWNpZGVzQ291bnRyeUF0dHJpYnV0ZX1cbiAgICAgICAgICBvbkNoYW5nZT17KHsgdmFsdWUgfSkgPT4gc2V0U3VpY2lkZXNDb3VudHJ5QXR0cmlidXRlKHZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYXItY2hhcnQtbWVudXMtY29udGFpbmVyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmFyLWNoYXJ0LWRyb3Bkb3duLWxhYmVsXCI+Q291bnRyeTwvc3Bhbj5cbiAgICAgICAgICA8UmVhY3REcm9wZG93biBcbiAgICAgICAgICAgIG9wdGlvbnM9e2NvdW50cmllc0RpY3Rpb25hcnlMaXN0fVxuICAgICAgICAgICAgdmFsdWU9e3VuZW1wbG95bWVudENvdW50cnlBdHRyaWJ1dGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17KHt2YWx1ZX0pID0+IHNldFVuZW1wbG95bWVudENvdW50cnlBdHRyaWJ1dGUodmFsdWUpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICBcbiAgICAgIDxzdmcgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0+XG4gICAgICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgwLCA0MClgfT5cbiAgICAgICAgICA8TWVudGFsRGlzZWFzZXNMaW5lQ2hhcnRcbiAgICAgICAgICAgIGRhdGE9e2RhdGF9XG4gICAgICAgICAgICB3aWR0aD17d2lkdGggLyAyfVxuICAgICAgICAgICAgaGVpZ2h0PXtsaW5lQ2hhcnRTaXplICogaGVpZ2h0ICsgMjB9XG4gICAgICAgICAgICB5QXR0cmlidXRlPXt5QXR0cmlidXRlfVxuICAgICAgICAgICAgY291bnRyeUF0dHJpYnV0ZT17Y291bnRyeUF0dHJpYnV0ZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2c+XG4gICAgICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3dpZHRoLzIgLSA2MH0sIDQwKWB9PlxuICAgICAgICAgIDxNZW50YWxEaXNlYXNlc0JhckNoYXJ0XG4gICAgICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICAgICAgd2lkdGg9e3dpZHRoIC8gMiArIDYwfVxuICAgICAgICAgICAgaGVpZ2h0PXtsaW5lQ2hhcnRTaXplICogaGVpZ2h0ICsgMjB9XG4gICAgICAgICAgICB5ZWFyPXt5ZWFyfVxuICAgICAgICAgICAgaG92ZXJlZFZhbHVlPXtob3ZlcmVkVmFsdWV9XG4gICAgICAgICAgICBzZXRIb3ZlcmVkVmFsdWU9e3NldEhvdmVyZWRWYWx1ZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2c+ICAgICAgXG4gICAgICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgwLCAyODYpYH0+XG4gICAgICAgICAgPFN1aWNpZGVzTGluZUNoYXJ0XG4gICAgICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICAgICAgd2lkdGg9e3dpZHRoIC8gMn1cbiAgICAgICAgICAgIGhlaWdodD17bGluZUNoYXJ0U2l6ZSAqIGhlaWdodCArIDIwfVxuICAgICAgICAgICAgY291bnRyeUF0dHJpYnV0ZT17c3VpY2lkZXNDb3VudHJ5QXR0cmlidXRlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZz5cbiAgICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7d2lkdGgvMiAtIDEwMH0sIDI3NilgfT5cbiAgICAgICAgICA8VW5lbXBsb3ltZW50TGluZUNoYXJ0XG4gICAgICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICAgICAgd2lkdGg9e3dpZHRoIC8gMiArIDgwfVxuICAgICAgICAgICAgaGVpZ2h0PXtsaW5lQ2hhcnRTaXplICogaGVpZ2h0ICsgMjB9XG4gICAgICAgICAgICBjb3VudHJ5QXR0cmlidXRlPXt1bmVtcGxveW1lbnRDb3VudHJ5QXR0cmlidXRlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZz5cbiAgICAgIDwvc3ZnPlxuICAgIDwvPlxuICApO1xufTtcbmNvbnN0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKTtcblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCByb290RWxlbWVudCk7XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJjc3YiLCJsaW5lIiwiY3VydmVOYXR1cmFsIiwidGltZUZvcm1hdCIsInNjYWxlVGltZSIsImV4dGVudCIsInNjYWxlTGluZWFyIiwiUmVhY3QiLCJBeGlzQm90dG9tIiwiQXhpc0xlZnQiLCJNYXJrcyIsInhBeGlzTGFiZWxPZmZzZXQiLCJ5QXhpc0xhYmVsT2Zmc2V0IiwiZm9ybWF0Iiwic2NhbGVPcmRpbmFsIiwic2NhbGVCYW5kIiwibWF4IiwiQ29s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