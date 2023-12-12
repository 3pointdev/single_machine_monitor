import { useEffect } from "react";
import { socketConnect, socketDisconnect } from "src/redux/actions/socket";
import { useAppDispatch } from "src/redux/reduxHook";

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(socketConnect(() => {}));

    return () => {
      dispatch(socketDisconnect());
    };
  }, []);

  return (
    <article className="bg-gray-300 dark:bg-gray-800 w-screen h-[calc(100vh-60px)] px-4 py-8 overflow-hidden"></article>
  );
}
