import { useState } from "react";

export default function IdleBar({
  width,
  time,
}: {
  width: number;
  time: string;
}) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={`h-full relative flex items-end ${isActive && "z-50"}`}>
      <div
        className="bg-yellow-600 shrink-0 h-1/3"
        style={{ width: `${width}px` }}
        onClick={() => setIsActive(!isActive)}
      />
      {isActive && (
        <div className="absolute left-0 top-0 z-50">
          <div className="h-12 w-24 bg-gray-600 rounded-lg px-2 py-1 text-sm font-medium">
            <p>준비교체시간</p>
            <p>{time}</p>
            <div className="left-1 w-0 h-0 border-l-0 border-t-[14px] border-r-[14px] border-l-transparent border-r-transparent border-gray-600" />
          </div>
          <div
            className="fixed w-screen h-screen block left-0 top-0 bg-transparent"
            onClick={() => setIsActive(!isActive)}
          />
        </div>
      )}
    </div>
  );
}
