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

  const filteredProjectsData = removeDuplicateProjects(studentsData);
  const labels = filteredProjectsData.map((student) => student.project);

  function calculateAverageRatesByProject(studentsData, rateType) {
    // Create an object to store the project rates and counts
    const projectData = {};

    // Calculate the total rate and count for each project
    studentsData.forEach((student) => {
      const { project } = student;
      const rate = parseFloat(student[rateType]);

      if (!isNaN(rate)) {
        if (!projectData[project]) {
          projectData[project] = {
            totalRate: 0,
            count: 0,
          };
        }

        projectData[project].totalRate += rate;
        projectData[project].count++;
      }
    });

    // Calculate the average rate for each project
    const averageRates = {};

    for (const project in projectData) {
      const { totalRate, count } = projectData[project];
      averageRates[project] = totalRate / count;
    }

    return averageRates;
  }

  const averageFunRatesByProject = calculateAverageRatesByProject(
    studentsData,
    "funRate"
  );
  const averageDifficultyRatesByProject = calculateAverageRatesByProject(
    studentsData,
    "difficultyRate"
  );

  console.log("Average Fun Rates by Project:", averageFunRatesByProject);
  console.log(
    "Average Difficulty Rates by Project:",
    averageDifficultyRatesByProject
  );

  // General data
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "Fun rate",
        data: averageFunRatesByProject,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Difficulty rate",
        data: averageDifficultyRatesByProject,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  // General useful functions
  const removeDuplicatesArray = (array) =>
    array.filter((item, index) => array.indexOf(item) === index);

  // Students data
  const students = studentsData.map((data) => data.firstName);
  const allStudents = removeDuplicatesArray(students);

  const projects = studentsData.map((data) => data.project);

  // console.log(allStudents);

  // States
  const [activeChart, setActiveChart] = useState("difficulty");
  const [selectedStudents, setSelectedStudents] = useState(allStudents);

  const amountStudents = selectedStudents.length;
  const amountAssignments = removeDuplicatesArray(projects);

  console.log(amountAssignments);

  /// Remove duplicate projects and store them in a label const to use for the chart
  function removeDuplicateProjects(data) {
    const uniqueProjects = {};

    const filteredData = data.reduce((result, student) => {
      const key = `${student.project}`;

      if (!uniqueProjects[key]) {
        uniqueProjects[key] = true;
        result.push(student);
      }

      return result;
    }, []);

    return filteredData;
  }

  const handleClickDifficulty = () => {
    if (activeChart !== "difficulty") {
      setActiveChart("difficulty");
      setData({
        ...data,
        datasets: [
          {
            ...data.datasets[0],
            data: averageDifficultyRatesByProject,
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
            data: averageFunRatesByProject,
          },
        ],
      });
    } else {
      return;
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="uppercase text-2xl lg:text-[64px] mt-10 lg:mt-20 text-indigo-800 font-bold text-center">
        Chart
      </h1>
      <Bar options={options} data={data} />

      <button
        onClick={handleClickFun}
        className={`bg-blue-500 rounded p-3 text-white mr-2 `}
      >
        Fun chart
      </button>
      <button
        onClick={handleClickDifficulty}
        className={`bg-pink-500 rounded  p-3 text-white mr-2 `}
      >
        Difficulty chart
      </button>
    </div>
  );
}

export default Chart;
