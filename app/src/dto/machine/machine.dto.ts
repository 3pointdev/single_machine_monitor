import { Type } from "class-transformer";
import { MachineExecutionType } from "config/constants";
import GraphDataDto from "../graph/graph.dto";
import PeakDto from "./peak.dto";

export default class MachineDto {
  public id: number;

  public mid: string;

  public program: string;

  public worker: string = "홍길동";

  public partCount: number;

  public planCount: number;

  public cycleTime: number = 0;

  public uptime: number = 0;

  public status: string;

  public execution: string = MachineExecutionType.READY;

  public isReceivePartCount: boolean = false;

  @Type(() => PeakDto)
  public peakData: PeakDto = new PeakDto();

  @Type(() => GraphDataDto)
  public graphData: GraphDataDto[] = [];
}
