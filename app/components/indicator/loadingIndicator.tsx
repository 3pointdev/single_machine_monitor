import { selectIndicatorState } from "src/redux/reducers/indicator/indicatorReducer";
import { useAppSelector } from "src/redux/reduxHook";

export default function LoadingIndicator() {
  const state = useAppSelector(selectIndicatorState);

  return (
    <div
      className={`z-50 ${
        state.activeCount > 0
          ? "opacity-90 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-screen h-screen fixed bg-gray-300/60 dark:bg-gray-800/60" />
      <div className="fixed right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
        <div className="p-4 bg-gradient-to-tr animate-spin from-green-500 to-blue-500 via-purple-500 rounded-full">
          <div className="rounded-full bg-gray-300 dark:bg-gray-800">
            <div className="w-24 h-24 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
