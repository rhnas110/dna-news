import { useContext, useEffect, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import dna from "@/assets/dna.png";

import { SearchNewsContext } from "@/context/SearchNewsContext";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [q, setQ] = useState("");
  const { query, handleQuery } = useContext(SearchNewsContext);

  const Menu = openMenu ? <IoClose size={25} /> : <IoMenu size={25} />;

  const menus = [
    { title: "Trending", path: "/" },
    { title: "About", path: "/about" },
  ];

  function handleOpenMenu() {
    setOpenMenu((openMenu) => !openMenu);
  }
  function handleOpenDialog() {
    setOpenDialog((openDialog) => !openDialog);
  }

  //   Implement keybind ctrl/command + "k" to open search modal
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        handleOpenDialog();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <nav className="w-full border-b md:border-0">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <a href="/" className="flex items-center gap-2">
            <img src={dna} alt="dna logo" className="w-16" />
            <h1 className="text-3xl font-bold text-rose-600">DNA News</h1>
          </a>
          <div className="md:hidden">
            <button
              className="text-rose-600 outline-none p-2 rounded-md focus:border-gray-500 focus:border"
              onClick={handleOpenMenu}
            >
              {Menu}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            openMenu ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li key={idx} className="font-semibold hover:text-rose-600">
                <a href={item.path}>{item.title}</a>
              </li>
            ))}
            {/* MODAL SECTION FOR SEARCH BAR */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button className="bg-rose-600 hover:bg-rose-700 flex gap-x-2 w-full md:w-auto">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Search ...</span>
                  <kbd className="bg-transparent pointer-events-none ml-auto flex h-5 flex-none select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-semibold opacity-100">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-stone-800">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Lagi nyari berita apa nih?
                  </DialogTitle>
                </DialogHeader>
                <div className="flex w-full max-w-sm items-center space-x-2 my-4">
                  <Input
                    type="text"
                    placeholder="Harga bensin mobil tesla ..."
                    className="text-primary"
                    onChange={(e) => setQ(e.target.value)}
                    defaultValue={query}
                  />
                  <Button
                    onClick={() => {
                      handleQuery(q.trim());
                      handleOpenDialog();
                    }}
                  >
                    Cari
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </ul>
        </div>
      </div>
    </nav>
  );
};
