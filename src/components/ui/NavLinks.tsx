import React from "react";
import { Link } from "react-router-dom";
import { api_url } from "../../utils/api";

const NavLinks: React.FC = ({}) => {
  return (
    <>
      <div className="desktop-links xs:hidden sm:block">
        <ul className=" flex md:flex-row 2xl:space-x-16 xl:space-x-8 md:space-x-4 xs:space-x-2 font-extralight xs:text-sm md:text-base lg:text-2xl 2xl:text-3xl text-[#4a95c0]">
          <button className="hover:text-[#50bde5]">
            <Link to="/">Home</Link>
          </button>
          <button className="hover:text-[#50bde5]">
            <Link to="/about">About</Link>
          </button>
          <button className="hover:text-[#50bde5]">
            <Link to={`${api_url}/docs`}>API</Link>
          </button>
        </ul>
      </div>
    </>
  );
};

export default NavLinks;
