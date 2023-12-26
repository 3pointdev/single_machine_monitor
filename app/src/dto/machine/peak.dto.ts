import dayjs from "dayjs";

export default class PeakDto {
  public loadX: number = 0;
  public loadZ: number = 0;
  public loadS1: number = 0;
  public timeX: string = dayjs().format("HH:mm:ss");
  public timeZ: string = dayjs().format("HH:mm:ss");
  public timeS1: string = dayjs().format("HH:mm:ss");
}
