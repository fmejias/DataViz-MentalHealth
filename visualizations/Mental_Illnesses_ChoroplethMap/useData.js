import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/fmejias/8df2a27f1285576ae3cf4d67c3368144/raw/mental_health_disorders_unemployment_and_suicides.csv';

const row = d => {
  d.Year = new Date(d.Year, 0);
  d.CountryPopulationWithMentalIllness = +d['TotalPercentageOfPopulation'];
  return d;
};

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};
