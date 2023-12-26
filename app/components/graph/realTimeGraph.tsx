import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function RealTimeGraph({
  width,
  height,
  title,
  labelArray,
  data,
  dataTitle,
}: {
  title: string;
  width: number;
  height: number;
  labelArray: any[];
  data: number[][];
  dataTitle: string[];
}) {
  const options = {
    radius: 1,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: {
          usePointStyle: true,
          color: "#fff",
        },
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#fff",
          stepSize: 10,
        },
      },
      y2: {
        type: "linear" as const,
        position: "right" as const,
        grid: {
          display: false,
        },
        ticks: {
          padding: 10,
          color: "#00000000",
          stepSize: 100,
        },
      },
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 0,
    },
  };

  const labels = labelArray;

  const dataSet = {
    labels,
    datasets: [
      {
        label: dataTitle[0],
        data: data[0],
        borderColor: "rgb(200, 0, 0)",
        backgroundColor: "rgba(200, 0, 0, 0.5)",
      },
      {
        label: dataTitle[1],
        data: data[1],
        borderColor: "rgb(13, 200, 31)",
        backgroundColor: "rgba(21, 200, 44, 0.5)",
      },
    ],
  };

  return (
    <div className="border text-white bg-transparent relative pb-6">
      <h3 className="absolute px-4 text-white font-semibold">{title}</h3>
      <Line options={options} data={dataSet} width={width} height={height} />
      <ul className="absolute flex w-full items-center justify-between px-10 text-xs font-normal">
        <li>
          <p>60</p>
        </li>
        <li>
          <p>50</p>
        </li>
        <li>
          <p>40</p>
        </li>
        <li>
          <p>30</p>
        </li>
        <li>
          <p>20</p>
        </li>
        <li>
          <p>10</p>
        </li>
        <li>
          <p>0</p>
        </li>
      </ul>
    </div>
  );
}
