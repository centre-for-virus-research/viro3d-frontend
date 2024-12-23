import React from "react";
import { Link } from "react-router-dom";
import { api_url } from "../../utils/api";

type MobileNavLinksProps = {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
};

const MobileNavLinks: React.FC<MobileNavLinksProps> = ({
  toggleMobileMenu,
  isMobileMenuOpen,
}) => {
  return (
    <>
        {isMobileMenuOpen ? (
          <ul className="mobile-links sm:hidden flex p-4 md:p-0 flex-row justify-center xs:space-x-8 font-extralight xs:text-2xl text-[#4a95c0]">
            <button onClick={toggleMobileMenu} className="hover:text-[#50bde5]">
              <Link to="/">Home</Link>
            </button>
            <button onClick={toggleMobileMenu} className="hover:text-[#50bde5]">
              <Link to="/about">About</Link>
            </button>
            <button onClick={toggleMobileMenu} className="hover:text-[#50bde5]">
              <Link to={`${api_url}/docs`}>API</Link>
            </button>
          </ul>
        ) : null}
    </>
  );
};

export default MobileNavLinks;
