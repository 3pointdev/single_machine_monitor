import { MachineTextType } from "config/constants";
import { useRouter } from "next/router";
import MachineDto from "src/dto/machine/machine.dto";

export default function Machine({ data }: { data: MachineDto }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/monitor?id=${data.id}`)}
      className="flex flex-col gap-4 justify-around cursor-pointer rounded-lg w-full h-full text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
    >
      <p className="w-full text-center font-semibold text-4xl">{data.mid}</p>
      <p className="w-full text-center font-semibold text-2xl">
        {data.program ? data.program : "가공 없음"}
      </p>
      <p className="w-full text-center font-semibold text-2xl">{`생산량 : ${
        data.partCount ? data.partCount : 0
      } 개`}</p>
      <p className="w-full text-center font-semibold text-2xl">{`목표량 : ${
        data.planCount ? data.planCount : 0
      } 개`}</p>
      <p
        className={`w-full text-center font-semibold text-2xl ${data.execution}`}
      >{`상태 : ${MachineTextType[data.execution]}`}</p>
    </div>
  );
}
