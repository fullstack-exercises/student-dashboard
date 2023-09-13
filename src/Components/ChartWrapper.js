import React, { useState } from "react";
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

function Chart() {
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

  const labels = studentsData.map((student) => student.project);

  const [data, setData] = useState({
    labels: labels,
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
  });

  const [activeChart, setActiveChart] = useState("difficulty");

  const handleClickDifficulty = () => {
    if (activeChart !== "difficulty") {
      setActiveChart("difficulty");
      setData({
        ...data,
        datasets: [
          {
            ...data.datasets[0],
            data: studentsData.map((student) => student.difficultyRate),
          },
          {
            ...data.datasets[1],
            data: [],
          },
        ],
      });
    }
  };

  const handleClickFun = () => {
    if (activeChart !== "fun") {
      setActiveChart("fun");
      setData({
        ...data,
        datasets: [
          {
            ...data.datasets[0],
            data: [],
          },
          {
            ...data.datasets[1],
            data: studentsData.map((student) => student.funRate),
          },
        ],
      });
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="uppercase text-2xl lg:text-[64px] mt-10 lg:mt-20 text-indigo-800 font-bold text-center">
        Chart
      </h1>
      <Bar options={options} data={data} />

      <button
        onClick={handleClickDifficulty}
        className={`bg-pink-500 rounded p-3 text-white mr-2 ${
          activeChart === "difficulty" ? "bg-opacity-100" : "bg-opacity-30"
        }`}
      >
        Difficulty chart
      </button>

      <button
        onClick={handleClickFun}
        className={`bg-blue-500 rounded p-3 text-white mr-2 ${
          activeChart === "fun" ? "bg-opacity-100" : "bg-opacity-30"
        }`}
      >
        Fun chart
      </button>
    </div>
  );
}

export default Chart;
