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
import { useRef } from "react";
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

export default function MultipleTrackingGraph({
  dataArray,
  label,
}: {
  dataArray: any[][];
  label: any[];
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  if (dataArray === undefined || label === undefined) return <></>;

  const options = {
    // radius: 1,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: true,
          color: "#ffffff50",
        },
        ticks: {
          color: "#fff",
          stepSize: 20,
        },
        max: 200,
        min: 0,
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

  const labels = label;

  const dataSet = {
    labels,
    datasets: [
      ...dataArray.map((countData, index) => {
        const number = index * 4;
        return {
          label: `${index}번째 가공`,
          data: countData,
          borderColor: `rgb(${number}, ${255 - number}, ${number})`,
          backgroundColor: `rgba(${number}, ${255 - number}, ${number}, 0.5)`,
        };
      }),
    ],
  };

  return (
    <div className="w-full h-full" ref={boxRef}>
      {boxRef.current && (
        <Line
          options={options}
          data={dataSet}
          width={boxRef.current.clientWidth}
          height={boxRef.current.clientHeight}
        />
      )}
    </div>
  );
}
