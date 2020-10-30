import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';

const width = 960;
const height = 500;

const projection = geoNaturalEarth1()
  .scale(120)
  .rotate([0, 0])
  .center([0, 0])
  .translate([width / 2, height / 2 - 40]);

const path = geoPath(projection);
const graticule = geoGraticule();

const missingDataColor = 'black';

export const Marks = ({
  worldAtlas: { countries, interiors },
  rowByNumericCode,
  colorScale,
  colorValue,
}) => (
  <g className="marks">
    {countries.features.map((feature) => {
      const d = rowByNumericCode.get(feature.id);

      return (
        <path class={"country"}
          fill={d ? colorScale(colorValue(d)) : missingDataColor}
          d={path(feature)}
        >
          </path>
      );
    })}
    <path className="interiors" d={path(interiors)} />
  </g>
);
