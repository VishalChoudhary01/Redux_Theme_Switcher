import { FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { FaBars } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { toggleTheme } from "../App/themeSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [sideMenu, setSideMenu] = useState(false);
  const OpenedMenu = () => {
    setSideMenu(!sideMenu);
  };
  const themeMode = useSelector((state) => {
    console.log(state);
    return state.themeChanger.defaultTheme;
  });

  const dispatch = useDispatch();
  const handleThemeToggle = () => dispatch(toggleTheme());
  
  useEffect(() => {
    const htmlTarget = document.querySelector("html");
    htmlTarget.classList.remove("dark", "light");
    htmlTarget.classList.add(themeMode);
  }, [themeMode]);
  
  
  return (
    <div>
      <div>
        <nav className="w-full dark:bg-[#051923] dark:text-[#fff]  bg-[#6fffe9] text-[#1a1d1a] font-[Poppins] flex justify-center items-center py-4 px-6">
          <h2 className="flex-1 font-[Merriweather] font-bold text-2xl">
            V <span className="pl-1">Kr.</span>
          </h2>
          <ul className="lg:flex  hidden md:flex  justify-center items-center text-lg  font-medium gap-x-4 pr-6">
            <li>Home</li>
            <li>About</li>
            <li>Skills</li>
            <li>Projects</li>
            <li>Contacts</li>
          </ul>
          {themeMode === "light" ? (
            <FaMoon
              style={{ filter: "drop-shadow(0 0 1px #4444dd)" }}
              className="text-gray-800 transition-all cursor-pointer  hover:text-[#f2f5f4] mr-4"
              onClick={handleThemeToggle}
            />
          ) : (
            <FiSun
              className="hover:text-[#ffd60a] transition-all  cursor-pointer :text-[#FFF] mr-4"
              onClick={handleThemeToggle}
            />
          )}

          <button className="dark:bg-[#6fffe9] hover:bg-[#006494] dark:text-[#051923] bg-[#051923]  text-[#fff] transition-all hover:scale-105  dark:hover:bg-[#f3f5f5]  px-3 py-1 font-semibold rounded-md shadow shadow-[#fff] ">
            Hire Me
          </button>
          <FaBars
            style={{
              transition: "all ease-in 1.5s",
            }}
            className="lg:hidden  md:hidden ml-2"
            onClick={OpenedMenu}
          />
          <ul
            style={{
              transition: "all ease-out 1s",
            }}
            className={`fixed ${
              sideMenu ? "translate-x-0 " : "translate-x-full"
            }  top-0 right-0 min-h-svh w-[60%] md:hidden flex items-center  pt-[20%] gap-y-4 flex-col text-lg dark:bg-[#3b413ca9] bg-[#204a61b6]   backdrop-filter backdrop-blur-lg bg-opacity-30 `}
          >
            <RxCross1
              className={`relative text-white active:text-sky-500 -right-24 bottom-16 text-2xl
                        ${sideMenu ? "translate-x-0 " : "-translate-x-full"} `}
              onClick={OpenedMenu}
            />
            <li className="active:text-[#94D1BE] dark:text-[#6fffe9] text-white transition-all ">
              Home
            </li>
            <li className="active:text-[#94D1BE]  dark:text-[#6fffe9] text-white transition-all ">
              About
            </li>
            <li className="active:text-[#94D1BE]  dark:text-[#6fffe9] text-white transition-all ">
              Skills
            </li>
            <li className="active:text-[#94D1BE]  dark:text-[#6fffe9] text-white transition-all ">
              Projects
            </li>
            <li className="active:text-[#94D1BE]  dark:text-[#6fffe9] text-white transition-all ">
              Contacts
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
