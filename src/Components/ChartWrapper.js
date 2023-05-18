import React from "react";
import studentsData from "../studentsData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// console.log(studentsData.difficultyRate);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = studentsData.map((student) => student.name);

const data = {
  labels,
  datasets: [
    {
      label: "Difficulty rate",
      data: studentsData.map((student) => student.difficultyRate),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Fun rate",
      data: studentsData.map((student) => student.funRate),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

console.log(data);

function Chart() {
  return (
    <div className="container mx-auto">
      <h1 className="uppercase text-2xl lg:text-[64px] mt-10 lg:mt-20 text-indigo-800 font-bold text-center">
        Chart
      </h1>
      <Bar options={options} data={data} />
    </div>
  );
}

export default Chart;
