import FullData from "db/full280.json";
import { useEffect, useState } from "react";

export default function Graph() {
  const dataArray = FullData;
  const [selectA, setSelectA] = useState(0);
  const [selectB, setSelectB] = useState(1);
  const [loadX, setLoadX] = useState([[], []]);

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

  if (loadX.length > 0)
    return (
      <article className="relative flex gap-1 text-gray-800 dark:text-gray-300 bg-gray-300 dark:bg-gray-800 w-screen h-[calc(100vh-60px)] p-4 py-14 overflow-auto">
        <div className="fixed w-screen h-12 left-0 top-14 flex item-center justify-around bg-gray-300 dark:bg-gray-800">
          <div className="w-full flex items-center justify-around">
            <p className="text-xl font-semibold">비교Cycle</p>
            <select
              className="w-1/3 text-xl font-semibold text-gray-800 dark:text-gray-300 bg-gray-300 dark:bg-gray-800"
              value={selectA}
              onChange={(e) => setSelectA(+e.target.value)}
            >
              {loadX.map((value, index) => {
                return <option key={`${index}_option`}>{index}</option>;
              })}
            </select>
          </div>
          <div className="w-full flex items-center justify-around">
            <p className="text-xl font-semibold">비교Cycle</p>
            <select
              className="w-1/3 text-xl font-semibold text-gray-800 dark:text-gray-300 bg-gray-300 dark:bg-gray-800"
              value={selectB}
              onChange={(e) => setSelectB(+e.target.value)}
            >
              {loadX.map((value, index) => {
                return (
                  <option value={index} key={`${index}_option`}>
                    {index}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <section className="w-1/2 h-max flex flex-col items-end">
          {loadX[selectA].map((load: number, innerIndex: number) => {
            return (
              <div
                key={`${innerIndex}_loadX`}
                className="h-1 my-1"
                style={{
                  width: `${load * 4}px`,
                  background: `rgb(${load * 3},${255 - load * 2},0)`,
                }}
              />
            );
          })}
        </section>
        <section className="w-1/2 h-max flex flex-col items-start overflow-auto">
          {loadX[selectB].map((load: number, innerIndex: number) => {
            return (
              <div
                key={`${innerIndex}_loadX`}
                className="h-1 my-1"
                style={{
                  width: `${load * 4}px`,
                  background: `rgb(${load * 3},${255 - load * 2},0)`,
                }}
              />
            );
          })}
        </section>
      </article>
    );
}
