import FullData from "db/full280.json";
import { useEffect, useState } from "react";

export default function Bar() {
  const dataArray = FullData;

  const [loadX, setLoadX] = useState([[]]);

  useEffect(() => {
    let receivePartCount = false;
    let partCount = 0;
    let loadX: any[][] = [[]];

    for (let i = 0; i < dataArray.length; i++) {
      // 가공시작 시 기록
      if (receivePartCount === true && dataArray[i]?.execution == "ACTIVE") {
        receivePartCount = false;
        loadX[partCount] = [];

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
    }
    setLoadX(loadX);
  }, []);

  return (
    <article className="flex flex-col gap-4 text-gray-800 dark:text-gray-300 bg-gray-300 dark:bg-gray-800 w-screen h-[calc(100vh-60px)] p-4 pb-12">
      <section className="w-full h-full relative">
        {loadX.map((loadArray: any[], index: number) => {
          return (
            <div
              key={`${index}_loadXArray`}
              className="absolute bottom-0 w-full h-full flex justify-between items-end"
            >
              {loadArray.map((load: number, innerIndex: number) => {
                return (
                  <div
                    key={`${innerIndex}_loadX`}
                    // className="w-full"
                    // className="w-full border"
                    className="w-[1px] border"
                    style={{
                      height: `${load * 6}px`,
                      //   background: `rgb(${load * 3},${255 - load * 2},0)`,
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </section>
    </article>
  );
}
