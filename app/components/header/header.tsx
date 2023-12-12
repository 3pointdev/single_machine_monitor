import { useEffect, useState } from "react";

export default function Header() {
  const [company, setCompany] = useState<string>("");

  useEffect(() => {
    setCompany(window.localStorage.getItem("name"));
  }, []);

  const handleClickLogout = () => {
    window.localStorage.clear();
  };

  return (
    <header className="w-full flex items-center justify-between text-bg-gray-900 bg-gray-300 dark:bg-gray-800 dark:text-white p-4">
      <p>{company}</p>
      <h1 className="text-xl font-semibold">Code Viewer</h1>
      <button>
        <p>Logout</p>
      </button>
    </header>
  );
}
