import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartWrapper from "../Components/ChartWrapper";
import { useParams } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const { studentName } = useParams();

  return (
    <div>
      <ChartWrapper />
    </div>
  );
};

export default Chart;
