import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  const [company, setCompany] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    setCompany(window.localStorage.getItem("name"));
  }, []);

  const handleClickLogout = () => {
    window.localStorage.clear();
    router.replace("/login");
  };

  const handleClickMachineSelect = () => {
    router.replace("/");
  };

  return (
    <header className="w-full flex items-center justify-between text-bg-gray-900 bg-gray-300 dark:bg-gray-800 dark:text-white p-4">
      <button onClick={handleClickMachineSelect}>
        <p className="text-2xl font-semibold">{company}</p>
      </button>
      <h1 className="text-2xl font-semibold">Single Machine Monitor</h1>
      <button onClick={handleClickLogout}>
        <p>Logout</p>
      </button>
    </header>
  );
}
