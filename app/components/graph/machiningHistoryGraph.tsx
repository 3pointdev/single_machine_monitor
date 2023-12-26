import dayjs from "dayjs";
import mockData from "db/mock.json";
import { useEffect, useState } from "react";
import GraphBar from "./graphBar";

interface IData {
  time: ITime;
  partA: IHistory[];
  partB: IHistory[];
  partC: IHistory[];
  partD: IHistory[];
}

export interface IHistory {
  planCount: number;
  partCount: number;
  startedAt: string;
  endedAt: string;
  idleTime: number;
}

export interface ITime {
  lunchTime: string[];
  breakTime: string[];
}

export default function MachiningHistoryGraph() {
  const data: IData = mockData;
  const [processTime, setProcessTime] = useState({
    first: 0,
    secend: 0,
    third: 0,
    fourth: 0,
  });

  useEffect(() => {
    setProcessTime({
      first:
        ((+dayjs(`${data.partA[0].startedAt.split(" ")[0]} 10:00:00`) -
          +dayjs(data.partA[0].startedAt)) /
          9000000) *
        100,
      secend:
        ((+dayjs(data.partB[data.partB.length - 1].endedAt) -
          +dayjs(data.partB[0].startedAt)) /
          9000000) *
        100,
      third:
        ((+dayjs(data.partC[data.partC.length - 1].endedAt) -
          +dayjs(data.partC[0].startedAt)) /
          9000000) *
        100,
      fourth:
        ((+dayjs(data.partD[data.partD.length - 1].endedAt) -
          +dayjs(data.partD[0].startedAt)) /
          9000000) *
        100,
    });
  }, [data]);

  return (
    <div className="w-3/4 border-l">
      <div className="w-full h-1/4 border-b p-2 relative">
        <h3 className="absolute left-4">07:30</h3>
        <h3 className="absolute right-4">10:00</h3>
        <div
          className="flex items-end justify-between h-full float-right"
          style={{ width: processTime.first + "%" }}
        >
          {data.partA.map((item: IHistory, index: number) => {
            return (
              <GraphBar
                data={item}
                beforeData={data.partA[index - 1]}
                key={`graph_partA_${index}`}
                time={data.time}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full h-1/4 border-b p-2 relative">
        <h3 className="absolute left-4">10:00</h3>
        <h3 className="absolute right-4">12:30</h3>
        <div
          className="flex items-end justify-between h-full"
          style={{ width: processTime.secend + "%" }}
        >
          {data.partB.map((item: IHistory, index: number) => {
            return (
              <GraphBar
                data={item}
                beforeData={data.partB[index - 1]}
                key={`graph_partB_${index}`}
                time={data.time}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full h-1/4 border-b p-2 relative">
        <h3 className="absolute left-4">13:30</h3>
        <h3 className="absolute right-4">16:00</h3>
        <div
          className="flex items-end justify-between h-full"
          style={{ width: processTime.third + "%" }}
        >
          {data.partC.map((item: IHistory, index: number) => {
            return (
              <GraphBar
                data={item}
                beforeData={data.partC[index - 1]}
                key={`graph_partC_${index}`}
                time={data.time}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full h-1/4 p-2 relative">
        <h3 className="absolute left-4">16:00</h3>
        <h3 className="absolute right-4">18:30</h3>
        <div
          className="flex items-end justify-between h-full"
          style={{ width: processTime.fourth + "%" }}
        >
          {data.partD.map((item: IHistory, index: number) => {
            return (
              <GraphBar
                data={item}
                beforeData={data.partD[index - 1]}
                key={`graph_partD_${index}`}
                time={data.time}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
