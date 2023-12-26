import { useState } from "react";

export default function BreakBar({ width, title }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={`h-full relative flex items-end ${isActive && "z-50"}`}>
      <p
        className="bg-transparent shrink-0 text-sm text-center"
        style={{ width: `${width}px` }}
        onClick={() => setIsActive(!isActive)}
      >
        {title}
      </p>
    </div>
  );
}
