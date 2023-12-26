import MultipleTrackingGraph from "components/multipleTrackingGraph/multipleTrackingGraph";
import FullData from "db/full280.json";
import { useEffect, useState } from "react";

export default function Graph() {
  const dataArray = FullData;

  const [dataObject, setDataObject] = useState({
    label: [],
    loadX: [[]],
    loadZ: [[]],
    loadS1: [[]],
  });

  useEffect(() => {
    let receivePartCount = false;
    let partCount = 0;
    let loadX: any[][] = [[]];
    let loadZ: any[][] = [[]];
    let loadS1: any[][] = [[]];

    for (let i = 0; i < dataArray.length; i++) {
      // 가공시작 시 기록
      if (receivePartCount === true && dataArray[i]?.execution == "ACTIVE") {
        receivePartCount = false;
        loadX[partCount] = [];
        loadZ[partCount] = [];
        loadS1[partCount] = [];
        continue;
      }

      // 가공완료, 수정 중 상태에서는 기록 스킵
      if (receivePartCount) {
        continue;
      }

      // 가공완료, 수정 중 상태에서는 기록 스킵
      if (dataArray[i]?.part_count !== undefined) {
        receivePartCount = true;
        partCount = dataArray[i]?.part_count;

        continue;
      }

      if (dataArray[i]?.Xload !== undefined) {
        loadX[partCount].push(dataArray[i].Xload);
      } else {
        loadX[partCount].push(
          loadX[partCount][loadX[partCount].length - 1] || 0
        );
      }
      if (dataArray[i]?.Zload !== undefined) {
        loadZ[partCount].push(dataArray[i].Zload);
      } else {
        loadZ[partCount].push(
          loadZ[partCount][loadZ[partCount].length - 1] || 0
        );
      }
      if (dataArray[i]?.S1load !== undefined) {
        loadS1[partCount].push(dataArray[i].S1load);
      } else {
        loadS1[partCount].push(
          loadS1[partCount][loadS1[partCount].length - 1] || 0
        );
      }
    }

    const length = Math.floor(loadX[0].length);
    const baseLabel = new Array(length).fill(0, 0, length);

    setDataObject({
      loadX,
      loadZ,
      loadS1,
      label: baseLabel.map((value, index) => index),
    });
  }, []);

  return (
    <article className="flex flex-col gap-4 text-gray-800 dark:text-gray-300 bg-gray-300 dark:bg-gray-800 w-screen h-[calc(100vh-60px)] p-4 pb-12">
      <section className="w-full h-1/3 py-2 border-b">
        <MultipleTrackingGraph
          dataArray={dataObject.loadX}
          label={dataObject.label}
        />
      </section>
      <section className="w-full h-1/3 py-2 border-b">
        <MultipleTrackingGraph
          dataArray={dataObject.loadZ}
          label={dataObject.label}
        />
      </section>
      <section className="w-full h-1/3">
        <MultipleTrackingGraph
          dataArray={dataObject.loadS1}
          label={dataObject.label}
        />
      </section>
    </article>
  );
}
