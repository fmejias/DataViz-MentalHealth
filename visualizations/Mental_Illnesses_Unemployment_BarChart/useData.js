import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/fmejias/8df2a27f1285576ae3cf4d67c3368144/raw/mental_health_disorders_unemployment_and_suicides.csv';

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
      d.Unemployment = +d.Unemployment;
      d.TotalPercentageOfPopulation = +d.TotalPercentageOfPopulation;
      return d;
    };
    csv(csvUrl, row).then(setData);
  }, []);
  
  return data;
};