import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import studentsData from "../studentsData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineElement
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

  const navigate = useNavigate();
  const filteredProjectsData = removeDuplicateProjects(studentsData);
  const labels = filteredProjectsData.map((student) => student.project);

  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "Fun rate",
        data: [], // Initially empty
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Difficulty rate",
        data: [], // Initially empty
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  const removeDuplicatesArray = (array) =>
    array.filter((item, index) => array.indexOf(item) === index);

  const students = studentsData.map((data) => data.firstName);
  const allStudents = removeDuplicatesArray(students);

  const projects = studentsData.map((data) => data.project);

  const [activeChart, setActiveChart] = useState("");
  const [selectedStudents, setSelectedStudents] = useState(allStudents);
  const [chartType, setChartType] = useState("bar");

  const averageFunRates = calculateAverageRatesByProject(
    studentsData,
    "funRate",
    selectedStudents
  );

  const averageDifficultyRates = calculateAverageRatesByProject(
    studentsData,
    "difficultyRate",
    selectedStudents
  );

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

  useEffect(() => {
    // Calculate the initial average rates
    const averageFunRates = calculateAverageRatesByProject(
      studentsData,
      "funRate",
      selectedStudents
    );

    const averageDifficultyRates = calculateAverageRatesByProject(
      studentsData,
      "difficultyRate",
      selectedStudents
    );

    // Update the data state with the calculated average rates
    setData({
      ...data,
      datasets: [
        {
          ...data.datasets[0],
          data: Object.values(averageFunRates),
        },
        {
          ...data.datasets[1],
          data: Object.values(averageDifficultyRates),
        },
      ],
    });
  }, [studentsData, selectedStudents]);

  function calculateAverageRatesByProject(
    studentsData,
    rateType,
    selectedStudents
  ) {
    // Filter the data based on the rate type (funRate or difficultyRate)
    const filteredData = studentsData.filter((student) =>
      selectedStudents.includes(student.firstName)
    );

    // Create an object to store the project rates and counts
    const projectData = {};

    // Calculate the total rate and count for each project
    filteredData.forEach((student) => {
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

  const handleClickDifficulty = () => {
    if (activeChart !== "difficulty") {
      setActiveChart("difficulty");

      setData({
        ...data,
        datasets: [
          {
            ...data.datasets[0],
            data: [],
          },
          {
            ...data.datasets[1],
            data: Object.values(averageDifficultyRates),
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
            data: Object.values(averageFunRates),
          },
          {
            ...data.datasets[1],
            data: [],
          },
        ],
      });
    } else {
      return;
    }
  };

  const handleClickAll = () => {
    if (activeChart !== "all") {
      setActiveChart("all");

      setData({
        ...data,
        datasets: [
          {
            ...data.datasets[0],
            data: Object.values(averageFunRates),
          },
          {
            ...data.datasets[1],
            data: Object.values(averageDifficultyRates),
          },
        ],
      });
    } else {
      return;
    }
  };

  const handleCheckboxChange = (studentName) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentName)
        ? prevSelected.filter((name) => name !== studentName)
        : [...prevSelected, studentName]
    );

    const path = `/${studentName}`;

    navigate(path);
  };

  const handleBarChartClick = () => {
    setChartType("bar");
  };

  const handleLineChartClick = () => {
    setChartType("line");
  };

  return (
    <div className="container mx-auto">
      <h1 className="uppercase text-2xl lg:text-[64px] mt-10 lg:mt-20 text-indigo-800 font-bold text-center">
        Chart
      </h1>

      {chartType === "bar" ? (
        <Bar
          options={options}
          data={data}
          className="border border-gray-200 rounded my-8 p-5"
        />
      ) : (
        <Line options={options} data={data} />
      )}

      <div className="border border-gray-200 rounded my-8 p-5">
        <div className="space-x-3">
          {allStudents.map((studentName) => (
            <label key={studentName}>
              <input
                type="checkbox"
                checked={selectedStudents.includes(studentName)}
                onChange={() => handleCheckboxChange(studentName)}
                className="mr-1 text-gray-300"
              />
              {studentName}
            </label>
          ))}
        </div>

        <div className="mt-10 lg:flex lg:justify-between">
          <div className="space-x-3 mb-10 lg:mb-0">
            <button
              onClick={handleBarChartClick}
              className={`pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 ${
                chartType === "line" ? "opacity-30" : "" // Apply opacity class when chartType is "bar"
              }`}
            >
              Bar Chart
            </button>
            <button
              onClick={handleLineChartClick}
              className={`pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 ${
                chartType === "bar" ? "opacity-30" : "" // Apply opacity class when chartType is "bar"
              }`}
            >
              Line Chart
            </button>
          </div>

          <div className="space-x-3 flex flex-wrap">
            <button
              onClick={handleClickAll}
              className={`pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 ${
                activeChart !== "difficulty" || activeChart !== "fun"
                  ? "opacity-30"
                  : "" // Apply opacity class when chartType is "bar"
              }`}
            >
              All charts
            </button>

            <button
              onClick={handleClickFun}
              className={`pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 ${
                activeChart === "difficulty" ? "opacity-30" : "" // Apply opacity class when chartType is "bar"
              }`}
            >
              Fun chart
            </button>
            <button
              onClick={handleClickDifficulty}
              className={`pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 ${
                activeChart === "fun" ? "opacity-30" : "" // Apply opacity class when chartType is "bar"
              }`}
            >
              Difficulty chart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
