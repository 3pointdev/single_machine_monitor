import FullData from "db/program.json";
import { useEffect, useState } from "react";

export interface IXload {
  execution?: string;
  Xload?: number;
  block?: string;
  part_count?: number;
}

export default function Program() {
  const dataArray: IXload[] = FullData;
  const [xLoad, setXLoad] = useState([]);

  useEffect(() => {
    let active = false;
    let countArray: any[][] = [[]];
    let partCount = 0;
    let before = {};
    for (let i = 0; i < dataArray.length; i++) {
      let data = dataArray[i];

      if (Object.keys(data).length === 0) {
        data = before;
      }

      // console.log(active, partCount, block);
      // if (data?.block !== undefined) {
      //   array[block + 1] = [{}];
      //   block = block + 1;
      // }

      if (data?.execution === "ACTIVE") {
        active = true;
        // block = 0;
      }

      if (data?.part_count !== undefined) {
        active = false;
        countArray[partCount + 1] = [];
        partCount = partCount + 1;
      }

      if (!active) continue;

      before = {
        execution: data?.execution,
        Xload: data?.Xload,
        part_count: data?.part_count,
      };
      countArray[partCount][countArray[partCount].length] = data;
    }

    countArray.pop();
    console.log(countArray);
    setXLoad(countArray);
  }, []);

  return (
    <article className="gap-4 text-gray-800 dark:text-gray-300 bg-gray-300 dark:bg-gray-800 w-screen h-[calc(100vh-60px)] p-4 pb-12 overflow-auto ">
      {xLoad.length > 1 && (
        <>
          <div className="relative flex gap-4">
            {xLoad.map((data: IXload[], index: number) => {
              return (
                <div
                  className="relative border w-full flex flex-col justify-start"
                  key={index}
                >
                  {data.map((item: IXload, index: number) => {
                    if (item?.block)
                      return <div key={index + "_data"}>{item.block}</div>;
                  })}
                </div>
              );
            })}
          </div>
          <div className="relative flex-col gap-4">
            {xLoad.map((data: IXload[], index: number) => {
              return (
                <div
                  className="relative border w-full h-20 flex items-end justify-between"
                  key={index + "data"}
                >
                  {data.map((item: IXload, index: number) => {
                    if (item?.block) console.log(item.block);
                    return (
                      <div
                        key={index + "_data"}
                        className="border"
                        style={{ height: item.Xload }}
                      ></div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </>
      )}
    </article>
  );
}
