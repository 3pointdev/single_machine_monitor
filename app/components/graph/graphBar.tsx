import dayjs from "dayjs";
import { useEffect, useState } from "react";
import checkBreakTime from "src/modules/breakTime.module";
import ActiveBar from "./activeBar";
import BreakBar from "./breakBar";
import IdleBar from "./idleBar";
import { IHistory, ITime } from "./machiningHistoryGraph";

interface IProps {
  data: IHistory;
  beforeData: IHistory;
  time: ITime;
}

export default function BigGraphBar({ data, beforeData, time }: IProps) {
  const wideRange = 9;
  const [optionObject, setoptionObject] = useState({
    activeTime: "",
    idleTime: "",
    beforeLunchTime: "",
    afterLunchTime: "",
    beforeBreakTime: "",
    afterBreakTime: "",
    activeWidth: 0,
    idleWidth: 0,
    isLunchTime: false,
    isBreakTime: false,
    beforeLunchWidth: 0,
    afterLunchWidth: 0,
    beforeBreakWidth: 0,
    afterBreakWidth: 0,
  });

  useEffect(() => {
    const activeTime = +dayjs(data.endedAt) - +dayjs(data.startedAt);
    const idleTime = +dayjs(data.startedAt) - +dayjs(beforeData?.endedAt);
    const activeWidth = activeTime / 1000;
    const idleWidth = beforeData
      ? idleTime / 1000
      : data.idleTime > 0
      ? data.idleTime
      : 0;

    const breakTimeObject = checkBreakTime(
      time,
      data.startedAt,
      beforeData?.endedAt,
      wideRange
    );

    setoptionObject({
      activeTime: dayjs(activeTime).format("mm:ss"),
      idleTime: dayjs(idleTime).format("mm:ss"),
      activeWidth: activeWidth / wideRange,
      idleWidth: idleWidth / wideRange,
      ...breakTimeObject,
    });
  }, [data]);

  return (
    <>
      {optionObject.idleWidth > 0 &&
        !optionObject.isBreakTime &&
        !optionObject.isLunchTime && (
          <IdleBar
            width={optionObject.idleWidth}
            time={optionObject.idleTime}
          />
        )}
      {optionObject.isBreakTime && (
        <>
          <IdleBar
            width={optionObject.beforeBreakWidth}
            time={optionObject.beforeBreakTime}
          />
          <BreakBar width={56} title="휴게시간" />
          <IdleBar
            width={optionObject.afterBreakWidth}
            time={optionObject.afterBreakTime}
          />
        </>
      )}
      {optionObject.isLunchTime && (
        <>
          <IdleBar
            width={optionObject.beforeLunchWidth}
            time={optionObject.beforeLunchTime}
          />

          <BreakBar width={56} title="식사시간" />

          <IdleBar
            width={optionObject.afterLunchWidth}
            time={optionObject.afterLunchTime}
          />
        </>
      )}
      <ActiveBar
        width={optionObject.activeWidth}
        time={optionObject.activeTime}
      />
    </>
  );
}
