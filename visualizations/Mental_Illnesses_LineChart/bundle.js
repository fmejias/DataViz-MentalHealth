(function (React$1, ReactDOM, d3, ReactDropdown) {
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
        return d;
      };
      d3.csv(csvUrl, row).then(setData);
    }, []);
    
    
    return data;
  };

  const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
    xScale.ticks().map(tickValue => (
      React.createElement( 'g', {
        className: "tick", key: tickValue, transform: `translate(${xScale(tickValue)},0)` },
        React.createElement( 'line', { y2: innerHeight }),
        React.createElement( 'text', { style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + tickOffset },
          tickFormat(tickValue)
        )
      )
    ));

  const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
    yScale.ticks(6).map(tickValue => (
      React.createElement( 'g', { className: "tick", transform: `translate(0,${yScale(tickValue)})` },
        React.createElement( 'line', { x2: innerWidth }),
        React.createElement( 'text', {
          key: tickValue, style: { textAnchor: 'end' }, x: -tickOffset, dy: ".32em" },
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
      fill: "none", stroke: "black", d: d3.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
      	.curve(d3.curveNatural)(data) })
    
    
  )
    
  );

  const width = 960;
  const height = 500;
  const margin = { top: 20, right: 30, bottom: 165, left: 90 };
  const xAxisLabelOffset = 50;

  // This is used to move the label from the y axis values
  const yAxisLabelOffset = 60;

  const attributes = [
      {value: "AlcoholUseDisorders", label: 'Alcohol Use Disorders'},
      {value: "DrugUseDisorders", label: 'Drug Use Disorders'},
      {value: "DepressiveDisorders", label: 'Depressive Disorders'},
      {value: "BipolarDisorder", label: 'Bipolar Disorder'},
      {value: "AnxietyDisorders", label: 'Anxiety Disorders'},
    	{value: "EatingDisorders", label: 'Eating Disorders'},
    	{value: "Schizophrenia", label: 'Schizophrenia'}
  ];

  const App = () => {
    const data = useData();
    
    // Mental disease menu
    const initialYAttribute = 'Schizophrenia';
    const [yAttribute, setYAttribute] = React$1.useState(initialYAttribute);
    const yValue = d => d[yAttribute];
    const yAxisLabel = "Percentage of the Population ";
    
    // Country Filter Menu
    const initialCountryAttribute = 'Costa Rica';
    const [countryAttribute, setCountryAttribute] = React$1.useState(initialCountryAttribute);

    if (!data) {
      return React$1__default.createElement( 'pre', null, "Loading..." );
    }
    
    // Get all countries names
    var countriesList = [];
    const getCountriesFromData = data.forEach(function(d) {
      countriesList.push(d.Entity);
    });
    
    // Get all unique countries names
    const uniqueCountriesList = Array.from(new Set(countriesList));
    
    const countriesDictionaryList = [];
    uniqueCountriesList.map(country => {
      countriesDictionaryList.push({
        value:   country,
        label: country
    	});
    });
    
    // Filter Costa Rica Data
    const filteredData = data.filter(function(d) 
  	{ 
  		if(d["Entity"] == countryAttribute){ 
        return d;
      } 
    });

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xValue = d => d.Year;
    const xAxisLabel = 'Years';
    const xAxisTickFormat = d3.timeFormat('%Y');

    const xScale = d3.scaleTime()
      .domain(d3.extent(filteredData, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = d3.scaleLinear()
      .domain(d3.extent(filteredData, yValue))
      .range([innerHeight, 0])
    	.nice();

    return (
      React$1__default.createElement( React$1__default.Fragment, null,
        React$1__default.createElement( 'div', { className: "menus-container" },
          React$1__default.createElement( 'span', { className: "dropdown-label" }, "Country"),
          React$1__default.createElement( ReactDropdown, { 
            options: countriesDictionaryList, value: countryAttribute, onChange: ({value}) => setCountryAttribute(value) }),
          React$1__default.createElement( 'span', { className: "dropdown-label" }, "Mental disease"),
          React$1__default.createElement( ReactDropdown, { 
            options: attributes, value: yAttribute, onChange: ({value}) => setYAttribute(value) })
      	),
        React$1__default.createElement( 'svg', { width: width, height: height },
          React$1__default.createElement( 'g', { transform: `translate(${margin.left},${margin.top})` },
            React$1__default.createElement( AxisBottom, {
              xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat, tickOffset: 7 }),
            React$1__default.createElement( 'text', {
              className: "axis-label", textAnchor: "middle", transform: `translate(${-yAxisLabelOffset},${innerHeight /
              2}) rotate(-90)` },
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
      )
    );
  };
  const rootElement = document.getElementById('root');
  ReactDOM.render(React$1__default.createElement( App, null ), rootElement);

}(React, ReactDOM, d3, ReactDropdown));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbInVzZURhdGEuanMiLCJBeGlzQm90dG9tLmpzIiwiQXhpc0xlZnQuanMiLCJNYXJrcy5qcyIsImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3N2IH0gZnJvbSAnZDMnO1xuXG5jb25zdCBjc3ZVcmwgPVxuICAnaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9mbWVqaWFzLzhkZjJhMjdmMTI4NTU3NmFlM2NmNGQ2N2MzMzY4MTQ0L3Jhdy9tZW50YWxfaGVhbHRoX2Rpc29yZGVyc191bmVtcGxveW1lbnRfYW5kX3N1aWNpZGVzLmNzdic7XG5cbmV4cG9ydCBjb25zdCB1c2VEYXRhID0gKCkgPT4ge1xuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHJvdyA9IGQgPT4ge1xuICAgICAgZC5ZZWFyID0gbmV3IERhdGUoZC5ZZWFyLCAwKTtcbiAgICAgIGQuU2NoaXpvcGhyZW5pYSA9ICtkLlNjaGl6b3BocmVuaWE7XG4gICAgICBkLkFsY29ob2xVc2VEaXNvcmRlcnMgPSArZC5BbGNvaG9sVXNlRGlzb3JkZXJzO1xuICAgICAgZC5EcnVnVXNlRGlzb3JkZXJzID0gK2QuRHJ1Z1VzZURpc29yZGVycztcbiAgICAgIGQuRGVwcmVzc2l2ZURpc29yZGVycyA9ICtkLkRlcHJlc3NpdmVEaXNvcmRlcnM7XG4gICAgICBkLkJpcG9sYXJEaXNvcmRlciA9ICtkLkJpcG9sYXJEaXNvcmRlcjtcbiAgICAgIGQuQW54aWV0eURpc29yZGVycyA9ICtkLkFueGlldHlEaXNvcmRlcnM7XG4gICAgICBkLkVhdGluZ0Rpc29yZGVycyA9ICtkLkVhdGluZ0Rpc29yZGVycztcbiAgICAgIHJldHVybiBkO1xuICAgIH07XG4gICAgY3N2KGNzdlVybCwgcm93KS50aGVuKHNldERhdGEpO1xuICB9LCBbXSk7XG4gIFxuICBcbiAgcmV0dXJuIGRhdGE7XG59OyIsImV4cG9ydCBjb25zdCBBeGlzQm90dG9tID0gKHsgeFNjYWxlLCBpbm5lckhlaWdodCwgdGlja0Zvcm1hdCwgdGlja09mZnNldCA9IDMgfSkgPT5cbiAgeFNjYWxlLnRpY2tzKCkubWFwKHRpY2tWYWx1ZSA9PiAoXG4gICAgPGdcbiAgICAgIGNsYXNzTmFtZT1cInRpY2tcIlxuICAgICAga2V5PXt0aWNrVmFsdWV9XG4gICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHt4U2NhbGUodGlja1ZhbHVlKX0sMClgfVxuICAgID5cbiAgICAgIDxsaW5lIHkyPXtpbm5lckhlaWdodH0gLz5cbiAgICAgIDx0ZXh0IHN0eWxlPXt7IHRleHRBbmNob3I6ICdtaWRkbGUnIH19IGR5PVwiLjcxZW1cIiB5PXtpbm5lckhlaWdodCArIHRpY2tPZmZzZXR9PlxuICAgICAgICB7dGlja0Zvcm1hdCh0aWNrVmFsdWUpfVxuICAgICAgPC90ZXh0PlxuICAgIDwvZz5cbiAgKSk7XG4iLCJleHBvcnQgY29uc3QgQXhpc0xlZnQgPSAoeyB5U2NhbGUsIGlubmVyV2lkdGgsIHRpY2tPZmZzZXQgPSAzIH0pID0+XG4gIHlTY2FsZS50aWNrcyg2KS5tYXAodGlja1ZhbHVlID0+IChcbiAgICA8ZyBjbGFzc05hbWU9XCJ0aWNrXCIgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKDAsJHt5U2NhbGUodGlja1ZhbHVlKX0pYH0+XG4gICAgICA8bGluZSB4Mj17aW5uZXJXaWR0aH0gLz5cbiAgICAgIDx0ZXh0XG4gICAgICAgIGtleT17dGlja1ZhbHVlfVxuICAgICAgICBzdHlsZT17eyB0ZXh0QW5jaG9yOiAnZW5kJyB9fVxuICAgICAgICB4PXstdGlja09mZnNldH1cbiAgICAgICAgZHk9XCIuMzJlbVwiXG4gICAgICA+XG4gICAgICAgIHt0aWNrVmFsdWV9XG4gICAgICA8L3RleHQ+XG4gICAgPC9nPlxuICApKTtcbiIsImltcG9ydCB7IGxpbmUsIGN1cnZlTmF0dXJhbCB9IGZyb20gJ2QzJztcblxuZXhwb3J0IGNvbnN0IE1hcmtzID0gKHtcbiAgZGF0YSxcbiAgeFNjYWxlLFxuICB5U2NhbGUsXG4gIHhWYWx1ZSxcbiAgeVZhbHVlLFxuICB0b29sdGlwRm9ybWF0LFxuICBjaXJjbGVSYWRpdXNcbn0pID0+IChcblxuPGcgY2xhc3NOYW1lPVwibWFya3NcIj5cblxuXHQ8cGF0aFxuICAgIGZpbGw9XCJub25lXCJcbiAgICBzdHJva2U9XCJibGFja1wiXG4gICAgZD17bGluZSgpXG4gICAgICAueChkID0+IHhTY2FsZSh4VmFsdWUoZCkpKVxuICAgICAgLnkoZCA9PiB5U2NhbGUoeVZhbHVlKGQpKSlcbiAgICBcdC5jdXJ2ZShjdXJ2ZU5hdHVyYWwpKGRhdGEpfSBcbiAgXG4gIC8+XG4gIHt9XG4gIFxuPC9nPlxuICBcbik7IiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VDYWxsYmFjaywgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBjc3YsIHNjYWxlTGluZWFyLCBzY2FsZVRpbWUsIG1heCwgZm9ybWF0LCB0aW1lRm9ybWF0LCBleHRlbnQgfSBmcm9tICdkMyc7XG5pbXBvcnQgeyB1c2VEYXRhIH0gZnJvbSAnLi91c2VEYXRhJztcbmltcG9ydCB7IEF4aXNCb3R0b20gfSBmcm9tICcuL0F4aXNCb3R0b20nO1xuaW1wb3J0IHsgQXhpc0xlZnQgfSBmcm9tICcuL0F4aXNMZWZ0JztcbmltcG9ydCB7IE1hcmtzIH0gZnJvbSAnLi9NYXJrcyc7XG5pbXBvcnQgUmVhY3REcm9wZG93biBmcm9tICdyZWFjdC1kcm9wZG93bic7XG5cbmNvbnN0IHdpZHRoID0gOTYwO1xuY29uc3QgaGVpZ2h0ID0gNTAwO1xuY29uc3QgbWFyZ2luID0geyB0b3A6IDIwLCByaWdodDogMzAsIGJvdHRvbTogMTY1LCBsZWZ0OiA5MCB9O1xuY29uc3QgeEF4aXNMYWJlbE9mZnNldCA9IDUwO1xuXG4vLyBUaGlzIGlzIHVzZWQgdG8gbW92ZSB0aGUgbGFiZWwgZnJvbSB0aGUgeSBheGlzIHZhbHVlc1xuY29uc3QgeUF4aXNMYWJlbE9mZnNldCA9IDYwO1xuXG5jb25zdCBhdHRyaWJ1dGVzID0gW1xuICAgIHt2YWx1ZTogXCJBbGNvaG9sVXNlRGlzb3JkZXJzXCIsIGxhYmVsOiAnQWxjb2hvbCBVc2UgRGlzb3JkZXJzJ30sXG4gICAge3ZhbHVlOiBcIkRydWdVc2VEaXNvcmRlcnNcIiwgbGFiZWw6ICdEcnVnIFVzZSBEaXNvcmRlcnMnfSxcbiAgICB7dmFsdWU6IFwiRGVwcmVzc2l2ZURpc29yZGVyc1wiLCBsYWJlbDogJ0RlcHJlc3NpdmUgRGlzb3JkZXJzJ30sXG4gICAge3ZhbHVlOiBcIkJpcG9sYXJEaXNvcmRlclwiLCBsYWJlbDogJ0JpcG9sYXIgRGlzb3JkZXInfSxcbiAgICB7dmFsdWU6IFwiQW54aWV0eURpc29yZGVyc1wiLCBsYWJlbDogJ0FueGlldHkgRGlzb3JkZXJzJ30sXG4gIFx0e3ZhbHVlOiBcIkVhdGluZ0Rpc29yZGVyc1wiLCBsYWJlbDogJ0VhdGluZyBEaXNvcmRlcnMnfSxcbiAgXHR7dmFsdWU6IFwiU2NoaXpvcGhyZW5pYVwiLCBsYWJlbDogJ1NjaGl6b3BocmVuaWEnfVxuXTtcblxuY29uc3QgYW1lcmljYW5Db3VudHJpZXMgPSBbXG4gICAge3ZhbHVlOiBcIkNvc3RhIFJpY2FcIiwgbGFiZWw6ICdDb3N0YSBSaWNhJ30sXG4gICAge3ZhbHVlOiBcIkFyZ2VudGluYVwiLCBsYWJlbDogJ0FyZ2VudGluYSd9LFxuICAgIHt2YWx1ZTogXCJHdWF0ZW1hbGFcIiwgbGFiZWw6ICdHdWF0ZW1hbGEnfSxcbiAgICB7dmFsdWU6IFwiSG9uZHVyYXNcIiwgbGFiZWw6ICdIb25kdXJhcyd9LFxuICAgIHt2YWx1ZTogXCJDb2xvbWJpYVwiLCBsYWJlbDogJ0NvbG9tYmlhJ30sXG4gIFx0e3ZhbHVlOiBcIkVjdWFkb3JcIiwgbGFiZWw6ICdFY3VhZG9yJ31cbl07XG5cbmNvbnN0IGdldExhYmVsID0gdmFsdWUgPT4ge1xuXHRmb3IobGV0IGkgPSAwOyBpIDwgYXR0cmlidXRlcy5sZW5ndGg7IGkrKyl7XG4gICAgaWYoYXR0cmlidXRlc1tpXS52YWx1ZSA9PT0gdmFsdWUpe1xuICAgICAgcmV0dXJuIGF0dHJpYnV0ZXNbaV0ubGFiZWw7XG4gICAgfVxufVxufTtcblxuY29uc3QgQXBwID0gKCkgPT4ge1xuICBjb25zdCBkYXRhID0gdXNlRGF0YSgpO1xuICBcbiAgLy8gTWVudGFsIGRpc2Vhc2UgbWVudVxuICBjb25zdCBpbml0aWFsWUF0dHJpYnV0ZSA9ICdTY2hpem9waHJlbmlhJztcbiAgY29uc3QgW3lBdHRyaWJ1dGUsIHNldFlBdHRyaWJ1dGVdID0gdXNlU3RhdGUoaW5pdGlhbFlBdHRyaWJ1dGUpO1xuICBjb25zdCB5VmFsdWUgPSBkID0+IGRbeUF0dHJpYnV0ZV07XG4gIGNvbnN0IHlBeGlzTGFiZWwgPSBcIlBlcmNlbnRhZ2Ugb2YgdGhlIFBvcHVsYXRpb24gXCI7XG4gIFxuICAvLyBDb3VudHJ5IEZpbHRlciBNZW51XG4gIGNvbnN0IGluaXRpYWxDb3VudHJ5QXR0cmlidXRlID0gJ0Nvc3RhIFJpY2EnO1xuICBjb25zdCBbY291bnRyeUF0dHJpYnV0ZSwgc2V0Q291bnRyeUF0dHJpYnV0ZV0gPSB1c2VTdGF0ZShpbml0aWFsQ291bnRyeUF0dHJpYnV0ZSk7XG5cbiAgaWYgKCFkYXRhKSB7XG4gICAgcmV0dXJuIDxwcmU+TG9hZGluZy4uLjwvcHJlPjtcbiAgfVxuICBcbiAgLy8gR2V0IGFsbCBjb3VudHJpZXMgbmFtZXNcbiAgdmFyIGNvdW50cmllc0xpc3QgPSBbXTtcbiAgY29uc3QgZ2V0Q291bnRyaWVzRnJvbURhdGEgPSBkYXRhLmZvckVhY2goZnVuY3Rpb24oZCkge1xuICAgIGNvdW50cmllc0xpc3QucHVzaChkLkVudGl0eSk7XG4gIH0pO1xuICBcbiAgLy8gR2V0IGFsbCB1bmlxdWUgY291bnRyaWVzIG5hbWVzXG4gIGNvbnN0IHVuaXF1ZUNvdW50cmllc0xpc3QgPSBBcnJheS5mcm9tKG5ldyBTZXQoY291bnRyaWVzTGlzdCkpO1xuICBcbiAgY29uc3QgY291bnRyaWVzRGljdGlvbmFyeUxpc3QgPSBbXTtcbiAgdW5pcXVlQ291bnRyaWVzTGlzdC5tYXAoY291bnRyeSA9PiB7XG4gICAgY291bnRyaWVzRGljdGlvbmFyeUxpc3QucHVzaCh7XG4gICAgICB2YWx1ZTogICBjb3VudHJ5LFxuICAgICAgbGFiZWw6IGNvdW50cnlcbiAgXHR9KTtcbiAgfSk7XG4gIFxuICAvLyBGaWx0ZXIgQ29zdGEgUmljYSBEYXRhXG4gIGNvbnN0IGZpbHRlcmVkRGF0YSA9IGRhdGEuZmlsdGVyKGZ1bmN0aW9uKGQpIFxuXHR7IFxuXHRcdGlmKGRbXCJFbnRpdHlcIl0gPT0gY291bnRyeUF0dHJpYnV0ZSl7IFxuICAgICAgcmV0dXJuIGQ7XG4gICAgfSBcbiAgfSk7XG5cbiAgY29uc3QgaW5uZXJIZWlnaHQgPSBoZWlnaHQgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcbiAgY29uc3QgaW5uZXJXaWR0aCA9IHdpZHRoIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG5cbiAgY29uc3QgeFZhbHVlID0gZCA9PiBkLlllYXI7XG4gIGNvbnN0IHhBeGlzTGFiZWwgPSAnWWVhcnMnO1xuICBjb25zdCB4QXhpc1RpY2tGb3JtYXQgPSB0aW1lRm9ybWF0KCclWScpO1xuXG4gIGNvbnN0IHhTY2FsZSA9IHNjYWxlVGltZSgpXG4gICAgLmRvbWFpbihleHRlbnQoZmlsdGVyZWREYXRhLCB4VmFsdWUpKVxuICAgIC5yYW5nZShbMCwgaW5uZXJXaWR0aF0pXG4gICAgLm5pY2UoKTtcblxuICBjb25zdCB5U2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihleHRlbnQoZmlsdGVyZWREYXRhLCB5VmFsdWUpKVxuICAgIC5yYW5nZShbaW5uZXJIZWlnaHQsIDBdKVxuICBcdC5uaWNlKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51cy1jb250YWluZXJcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZHJvcGRvd24tbGFiZWxcIj5Db3VudHJ5PC9zcGFuPlxuICAgICAgICA8UmVhY3REcm9wZG93biBcbiAgICAgICAgICBvcHRpb25zPXtjb3VudHJpZXNEaWN0aW9uYXJ5TGlzdH1cbiAgICAgICAgICB2YWx1ZT17Y291bnRyeUF0dHJpYnV0ZX1cbiAgICAgICAgICBvbkNoYW5nZT17KHt2YWx1ZX0pID0+IHNldENvdW50cnlBdHRyaWJ1dGUodmFsdWUpfVxuICAgICAgICAvPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkcm9wZG93bi1sYWJlbFwiPk1lbnRhbCBkaXNlYXNlPC9zcGFuPlxuICAgICAgICA8UmVhY3REcm9wZG93biBcbiAgICAgICAgICBvcHRpb25zPXthdHRyaWJ1dGVzfVxuICAgICAgICAgIHZhbHVlPXt5QXR0cmlidXRlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoe3ZhbHVlfSkgPT4gc2V0WUF0dHJpYnV0ZSh2YWx1ZSl9XG4gICAgICAgIC8+XG4gICAgXHQ8L2Rpdj5cbiAgICAgIDxzdmcgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0+XG4gICAgICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwke21hcmdpbi50b3B9KWB9PlxuICAgICAgICAgIDxBeGlzQm90dG9tXG4gICAgICAgICAgICB4U2NhbGU9e3hTY2FsZX1cbiAgICAgICAgICAgIGlubmVySGVpZ2h0PXtpbm5lckhlaWdodH1cbiAgICAgICAgICAgIHRpY2tGb3JtYXQ9e3hBeGlzVGlja0Zvcm1hdH1cbiAgICAgICAgICAgIHRpY2tPZmZzZXQ9ezd9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8dGV4dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXhpcy1sYWJlbFwiXG4gICAgICAgICAgICB0ZXh0QW5jaG9yPVwibWlkZGxlXCJcbiAgICAgICAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgkey15QXhpc0xhYmVsT2Zmc2V0fSwke2lubmVySGVpZ2h0IC9cbiAgICAgICAgICAgICAgMn0pIHJvdGF0ZSgtOTApYH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eUF4aXNMYWJlbH1cbiAgICAgICAgICA8L3RleHQ+XG4gICAgICAgICAgPEF4aXNMZWZ0IHlTY2FsZT17eVNjYWxlfSBpbm5lcldpZHRoPXtpbm5lcldpZHRofSB0aWNrT2Zmc2V0PXs3fSAvPlxuICAgICAgICAgIDx0ZXh0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJheGlzLWxhYmVsXCJcbiAgICAgICAgICAgIHg9e2lubmVyV2lkdGggLyAyfVxuICAgICAgICAgICAgeT17aW5uZXJIZWlnaHQgKyB4QXhpc0xhYmVsT2Zmc2V0fVxuICAgICAgICAgICAgdGV4dEFuY2hvcj1cIm1pZGRsZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3hBeGlzTGFiZWx9XG4gICAgICAgICAgPC90ZXh0PlxuICAgICAgICAgIDxNYXJrc1xuICAgICAgICAgICAgZGF0YT17ZmlsdGVyZWREYXRhfVxuICAgICAgICAgICAgeFNjYWxlPXt4U2NhbGV9XG4gICAgICAgICAgICB5U2NhbGU9e3lTY2FsZX1cbiAgICAgICAgICAgIHhWYWx1ZT17eFZhbHVlfVxuICAgICAgICAgICAgeVZhbHVlPXt5VmFsdWV9XG4gICAgICAgICAgICB0b29sdGlwRm9ybWF0PXt4QXhpc1RpY2tGb3JtYXR9XG4gICAgICAgICAgICBjaXJjbGVSYWRpdXM9ezN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9nPlxuICAgICAgPC9zdmc+XG4gICAgPC8+XG4gICk7XG59O1xuY29uc3Qgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpO1xuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIHJvb3RFbGVtZW50KTtcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsImNzdiIsImxpbmUiLCJjdXJ2ZU5hdHVyYWwiLCJSZWFjdCIsInRpbWVGb3JtYXQiLCJzY2FsZVRpbWUiLCJleHRlbnQiLCJzY2FsZUxpbmVhciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQUdBLE1BQU0sTUFBTTtFQUNaLEVBQUUsdUlBQXVJLENBQUM7QUFDMUk7RUFDTyxNQUFNLE9BQU8sR0FBRyxNQUFNO0VBQzdCLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBR0EsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QztFQUNBLEVBQUVDLGlCQUFTLENBQUMsTUFBTTtFQUNsQixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSTtFQUNyQixNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNuQyxNQUFNLENBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO0VBQ3pDLE1BQU0sQ0FBQyxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO0VBQ3JELE1BQU0sQ0FBQyxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO0VBQy9DLE1BQU0sQ0FBQyxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO0VBQ3JELE1BQU0sQ0FBQyxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUM7RUFDN0MsTUFBTSxDQUFDLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7RUFDL0MsTUFBTSxDQUFDLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQztFQUM3QyxNQUFNLE9BQU8sQ0FBQyxDQUFDO0VBQ2YsS0FBSyxDQUFDO0VBQ04sSUFBSUMsTUFBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FB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