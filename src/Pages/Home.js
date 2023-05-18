import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartWrapper from "../Components/ChartWrapper";
import StudentCheckboxes from "../Components/StudentCheckboxes";
ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  return (
    <div>
      <h2>Student Grades</h2>
      <ChartWrapper />
      <StudentCheckboxes />
    </div>
  );
};

export default Home;
