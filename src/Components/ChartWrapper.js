import React, { useState, useEffect } from "react";
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

  // const amountStudents = selectedStudents.length;
  // const amountAssignments = removeDuplicatesArray(projects);

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

  const handleCheckboxChange = (studentName) => {
    if (selectedStudents.includes(studentName)) {
      setSelectedStudents((prevSelected) =>
        prevSelected.filter((name) => name !== studentName)
      );
    } else {
      setSelectedStudents((prevSelected) => [...prevSelected, studentName]);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="uppercase text-2xl lg:text-[64px] mt-10 lg:mt-20 text-indigo-800 font-bold text-center">
        Chart
      </h1>

      <div>
        {allStudents.map((studentName) => (
          <label key={studentName}>
            <input
              type="checkbox"
              checked={selectedStudents.includes(studentName)}
              onChange={() => handleCheckboxChange(studentName)}
            />
            {studentName}
          </label>
        ))}
      </div>

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
