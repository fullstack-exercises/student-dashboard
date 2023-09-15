import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartWrapper from "../Components/ChartWrapper";
ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  return (
    <div>
      <ChartWrapper />
    </div>
  );
};

export default Home;
