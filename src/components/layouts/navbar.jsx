import { useEffect, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";

import dna from "@/assets/dna.png";
import { menus } from "@/data";
import { PAGINATION } from "@/config/pagination.config";

import { SearchModal } from "../elements/modal";
import { Button } from "../ui/button";

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { page, limit } = PAGINATION.DEFAULT;

  const Menu = openMenu ? <IoClose size={25} /> : <IoMenu size={25} />;

  function handleOpenMenu() {
    setOpenMenu((openMenu) => !openMenu);
  }
  function handleOpenModal() {
    setOpenModal((openModal) => !openModal);
  }

  // Implement keybind ctrl/command + "k" to open search modal
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        handleOpenModal();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Sync value between q state and q searchParams
  useEffect(() => {
    setQ(searchParams.get("q"));
  }, [searchParams]);

  return (
    <nav className="w-full border-b md:border-0">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <a href="/" className="flex items-center gap-2">
            <img src={dna} alt="dna logo" className="w-16" />
            <h1 className="text-3xl font-bold text-rose-600">DNA News</h1>
          </a>
          <div className="md:hidden">
            <Button
              className="text-rose-600 outline-none p-2 rounded-md focus:border-gray-500 focus:border"
              onClick={handleOpenMenu}
            >
              {Menu}
            </Button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            openMenu ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((menu, index) => (
              <li key={index} className="font-semibold hover:text-rose-600">
                <a href={menu.path}>{menu.title}</a>
              </li>
            ))}
            {/* MODAL SECTION FOR SEARCH BAR */}
            <SearchModal
              open={openModal}
              onOpenChange={setOpenModal}
              setValueInput={setQ}
              valueInput={q}
              action={{
                onClick: (e) => {
                  e.preventDefault();
                  if (!q) return;
                  if (q.length > 3) {
                    navigate(`/news?q=${q.trim()}&limit=${limit}&page=${page}`);
                    handleOpenModal();
                  }
                },
                onKeyUp: (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (!q) return;
                    if (q.length > 3) {
                      navigate(
                        `/news?q=${q.trim()}&limit=${limit}&page=${page}`
                      );
                      handleOpenModal();
                    }
                  }
                },
              }}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
};
