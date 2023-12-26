import { ITime } from "components/graph/machiningHistoryGraph";
import dayjs from "dayjs";

export default function checkBreakTime(
  time: ITime,
  start: string,
  beforeEnd: string,
  wideRange: number
) {
  if (beforeEnd === undefined) {
    return {
      isLunchTime: false,
      beforeLunchWidth: 0,
      afterLunchWidth: 0,
      isBreakTime: false,
      beforeBreakWidth: 0,
      afterBreakWidth: 0,
      beforeBreakTime: "",
      afterBreakTime: "",
      beforeLunchTime: "",
      afterLunchTime: "",
    };
  }

  const startTime = dayjs(start);
  const endTime = dayjs(beforeEnd);
  const firstBreakTime = [dayjs(time.breakTime[0]), dayjs(time.breakTime[1])];
  const secondBreakTime = [dayjs(time.breakTime[2]), dayjs(time.breakTime[3])];
  const lunchTime = [dayjs(time.lunchTime[0]), dayjs(time.lunchTime[1])];

  if (
    (firstBreakTime[0] < endTime && firstBreakTime[1] > endTime) ||
    (firstBreakTime[0] < startTime && firstBreakTime[1] > startTime) ||
    (firstBreakTime[0] > endTime && firstBreakTime[1] < startTime)
  ) {
    const beforeBreak = +firstBreakTime[0] - +endTime;
    const afterBreak = +startTime - +firstBreakTime[1];

    return {
      isLunchTime: false,
      isBreakTime: true,
      beforeLunchWidth: 0,
      afterLunchWidth: 0,
      beforeLunchTime: "",
      afterLunchTime: "",
      beforeBreakTime: dayjs(beforeBreak).format("mm:ss"),
      afterBreakTime: dayjs(afterBreak).format("mm:ss"),
      beforeBreakWidth: beforeBreak > 0 ? beforeBreak / 1000 / wideRange : 0,
      afterBreakWidth:
        +startTime - +firstBreakTime[1] > 0
          ? (+startTime - +firstBreakTime[1]) / 1000 / wideRange
          : 0,
    };
  } else if (
    (secondBreakTime[0] < endTime && secondBreakTime[1] > endTime) ||
    (secondBreakTime[0] < startTime && secondBreakTime[1] > startTime) ||
    (secondBreakTime[0] > endTime && secondBreakTime[1] < startTime)
  ) {
    const beforeBreak = +secondBreakTime[0] - +endTime;
    const afterBreak = +startTime - +secondBreakTime[1];
    return {
      isLunchTime: false,
      beforeLunchWidth: 0,
      afterLunchWidth: 0,
      isBreakTime: true,
      beforeBreakTime: dayjs(beforeBreak).format("mm:ss"),
      afterBreakTime: dayjs(afterBreak).format("mm:ss"),
      beforeLunchTime: "",
      afterLunchTime: "",
      beforeBreakWidth: beforeBreak > 0 ? beforeBreak / 1000 / wideRange : 0,
      afterBreakWidth: afterBreak > 0 ? afterBreak / 1000 / wideRange : 0,
    };
  } else if (
    (lunchTime[0] < endTime && lunchTime[1] > endTime) ||
    (lunchTime[0] < startTime && lunchTime[1] > startTime) ||
    (lunchTime[0] > endTime && lunchTime[1] < startTime)
  ) {
    const beforeLunch = +lunchTime[0] - +endTime;
    const afterLunch = +startTime - +lunchTime[1];
    return {
      isLunchTime: true,
      beforeLunchWidth: beforeLunch > 0 ? beforeLunch / 1000 / wideRange : 0,
      afterLunchWidth: afterLunch > 0 ? afterLunch / 1000 / wideRange : 0,
      isBreakTime: false,
      beforeBreakTime: "",
      afterBreakTime: "",
      beforeLunchTime: dayjs(beforeLunch).format("mm:ss"),
      afterLunchTime: dayjs(afterLunch).format("mm:ss"),
      beforeBreakWidth: 0,
      afterBreakWidth: 0,
    };
  }
}
