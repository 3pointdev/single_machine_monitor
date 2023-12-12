import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useEffect } from "react";
import { fetchLogin } from "src/redux/actions/fetchLogin";
import {
  changeLoginValue,
  selectLoginState,
} from "src/redux/reducers/auth/loginReducer";
import { useAppDispatch, useAppSelector } from "src/redux/reduxHook";

export default function LoginView() {
  const router = useRouter();
  const state = useAppSelector(selectLoginState);
  const dispatch = useAppDispatch();

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    dispatch(changeLoginValue({ id, value }));
  };

  const handleKeyLogin = (e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key === "Enter") {
      dispatch(fetchLogin(state.model));
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") !== null) {
      router.replace("/");
    }
  }, []);

  return (
    <section className="text-bg-gray-900 bg-gray-300 dark:bg-gray-800 dark:text-white w-screen min-h-screen h-full flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col justify-center items-center min-w-1/5">
        <h1 className="text-2xl font-bold">바로팩토리 코드뷰어</h1>
        <p className="text-sm">NC 코드 확인, 비교</p>
      </div>
      <div className=" flex gap-2 items-center justify-center">
        <label htmlFor="username" className="flex-shrink-0 w-16">
          ID
        </label>
        <input
          id="username"
          onChange={handleChangeValue}
          value={state.model.username || ""}
          className="w-full h-8 border rounded-md border-gray-800 bg-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-300 px-4 dark:text-gray-300 outline-none"
          autoFocus
          required
        />
      </div>
      <div className=" flex gap-2 items-center justify-center">
        <label htmlFor="password" className="flex-shrink-0 w-16">
          PW
        </label>
        <input
          id="password"
          type="password"
          onChange={handleChangeValue}
          onKeyDown={handleKeyLogin}
          value={state.model.password || ""}
          className="w-full h-8 border rounded-md border-gray-800 bg-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-300 px-4 dark:text-gray-300 outline-none"
          required
        />
      </div>
      <button
        onClick={() => dispatch(fetchLogin(state.model))}
        className="h-8 border rounded-md border-gray-800 bg-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-300 px-4 dark:text-gray-300"
      >
        로그인
      </button>
    </section>
  );
}
