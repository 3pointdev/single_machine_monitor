import { plainToInstance } from "class-transformer";
import { MachineExecutionType } from "config/constants";
import dayjs from "dayjs";
import GraphDataDto from "src/dto/graph/graph.dto";
import MachineDto from "src/dto/machine/machine.dto";
import PeakDto from "src/dto/machine/peak.dto";

class MapperModule {
  public initialMapper(plainData: any) {
    const mapping = {
      id: plainData.mkey,
      mid: plainData.mid,
      program: plainData.process?.includes("(")
        ? plainData.process.split("(")[1].replace(")", "")
        : plainData.process,
      worker: "홍길동",
      partCount: plainData.process_count,
      planCount: plainData.plan_count,
      cycleTime: 0,
      uptime: 0,
      status: plainData.status,
      execution:
        plainData.status === "on"
          ? MachineExecutionType.READY
          : MachineExecutionType.OFF,
      graphData: [],
      peak: new PeakDto(),
      isReceivePartCount: false,
    };

    return plainToInstance(MachineDto, mapping);
  }

  public statMapper(plainData: any, existingData: MachineDto) {
    let mapping = { ...existingData };
    const position = plainData.Data.path_position?.split(" ");
    const now = dayjs().format("HH:mm:ss");
    let graphDataArray: GraphDataDto[] = [
      {
        positionX: +position?.[0] || 0,
        positionY: +position?.[1] || 0,
        positionZ: +position?.[2] || 0,
        speedS1: +plainData.Data.S1speed,
        speedS2: +plainData.Data?.S2speed || 0,
        loadX: +plainData.Data.Xload,
        loadY: +plainData.Data?.Yload || 0,
        loadZ: +plainData.Data.Zload,
        loadS1: +plainData.Data.S1load,
        loadS2: +plainData.Data?.S2load || 0,
        time: new Date().getTime(),
      },
    ];

    console.log(dayjs(plainData.ModeTime).format("YYYY-MM-DD HH:mm:ss"));
    console.log(plainData.ModeTime);
    mapping = {
      id: +plainData.Id,
      mid: plainData.Mid,
      program: plainData.Program?.includes("(")
        ? plainData.Program.split("(")[1].replace(")", "")
        : plainData.Program,
      worker: existingData.worker,
      partCount: plainData.PartCount,
      planCount: plainData.PlanCount,
      cycleTime: (+dayjs() - plainData.ModeTime) / plainData.PartCount,
      uptime: 0,
      status: plainData.Power ? "on" : "power_off",
      execution: plainData.Power
        ? plainData.Execution
        : MachineExecutionType.OFF,
      isReceivePartCount: false,
      graphData: graphDataArray,
      peakData: {
        loadX: +plainData.Data.Xload,
        loadZ: +plainData.Data.Zload,
        loadS1: +plainData.Data.S1load,
        timeX: now,
        timeZ: now,
        timeS1: now,
      },
    };

    return plainToInstance(MachineDto, mapping);
  }

  public updateMapper(plainData: string[], existingData: MachineDto) {
    const now = dayjs().format("HH:mm:ss");
    let mapping = { ...existingData };
    let newGraphData = {
      ...mapping.graphData[mapping.graphData.length - 1],
      time: new Date().getTime(),
    };
    for (let i = 6; i < plainData.length; i = i + 2) {
      if (plainData[i] === "path_position") {
        const position = plainData[i + 1].split(" ");
        newGraphData.positionX = +position[0];
        newGraphData.positionY = +position[1];
        newGraphData.positionZ = +position[2];
      } else if (plainData[i] === "S1speed") {
        newGraphData.speedS1 = +plainData[i + 1];
      } else if (plainData[i] === "S2speed") {
        newGraphData.speedS2 = +plainData[i + 1];
      } else if (plainData[i] === "Xload") {
        newGraphData.loadX = +plainData[i + 1];
        if (+plainData[i + 1] > mapping.peakData.loadX) {
          mapping.peakData.loadX = +plainData[i + 1];
          mapping.peakData.timeX = now;
        }
      } else if (plainData[i] === "Yload") {
        newGraphData.loadY = +plainData[i + 1];
      } else if (plainData[i] === "Zload") {
        newGraphData.loadZ = +plainData[i + 1];
        if (+plainData[i + 1] > mapping.peakData.loadZ) {
          mapping.peakData.loadZ = +plainData[i + 1];
          mapping.peakData.timeZ = now;
        }
      } else if (plainData[i] === "S1load") {
        newGraphData.loadS1 = +plainData[i + 1];
        if (+plainData[i + 1] > mapping.peakData.loadS1) {
          mapping.peakData.loadS1 = +plainData[i + 1];
          mapping.peakData.timeS1 = now;
        }
      } else if (plainData[i] === "S2load") {
        newGraphData.loadS2 = +plainData[i + 1];
      }
    }

    for (let i = 0; i < mapping.graphData.length; i++) {
      const now = new Date().getTime();
      if (now - mapping.graphData[i].time > 1000 * 60) {
        mapping.graphData.shift();
      } else {
        break;
      }
    }

    const partCountIndex = plainData.indexOf("part_count");
    const executionIndex = plainData.indexOf("execution");
    if (partCountIndex != -1) {
      mapping.partCount = +plainData[partCountIndex + 1];

      mapping.isReceivePartCount = true;
    }

    if (executionIndex != -1) {
      if (existingData.status === "power_off") {
        mapping.execution = MachineExecutionType.OFF;
      } else {
        mapping.execution = plainData[executionIndex + 1];
      }
      if (
        plainData[executionIndex + 1] === MachineExecutionType.ACTIVE &&
        mapping.isReceivePartCount
      ) {
        mapping.peakData = new PeakDto();
      }
    }

    return plainToInstance(MachineDto, {
      ...mapping,
      graphData: [...mapping.graphData, newGraphData],
    });
  }
}

const mapperInstance = new MapperModule();
export default mapperInstance;
