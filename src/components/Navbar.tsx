import React, { lazy, Suspense, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useAutocomplete } from "../hooks/useAutocomplete";
import NavLinks from "./ui/NavLinks";
import SearchBar from "./ui/SearchBar";
const MobileNavLinks = lazy(() => import("./ui/MobileNavLinks"));
const MobileSearchBar = lazy(() => import("./ui/MobileSearchBar"));

type Link = {
  title: string;
  href: string;
};

const Navbar: React.FC = () => {
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [filterParam, setFilterParam] = useState("viruses");

  const { data } = useAutocomplete(filterParam, suggestion, 0);

  const navigate = useNavigate();

  const clearSuggestion = () => {
    setSuggestion("");
  };

  const handleText = (e: { target: { value: string } }) => {
    setSearchParam(encodeURIComponent(e.target.value));
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = debounce((search) => {
    if (
      (search.length > 4 && filterParam === "protein_name") ||
      (search.length > 2 && filterParam === "viruses")
    ) {
      setSuggestion(search);
      setIsAutoCompleteOpen(true);
    } else {
      setIsAutoCompleteOpen(false);
    }
  }, 0);

  const handleFilter = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFilterParam(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchParam.length > 0) {
      clearSuggestion();
      setIsMobileMenuOpen(false);

      if (filterParam === "viruses") {
        navigate(`/resultspage/${filterParam}/${searchParam}`);
      } else {
        navigate(`/proteinresultspage/${filterParam}/${searchParam}`);
      }
    }
  };

  const clearSearch = () => {
    setSearchParam("");
    setSuggestion("");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setFilterParam("viruses");
    setSearchParam("");
  };

  return (
    <>
      <nav
        id="navbar"
        className={`absolute top-0 left-0 right-0 z-50 border-b-2 border-[#d6d5d5] text-[#4a95c0] drop-shadow-md bg-[#e6e6e6e7] transition-transform duration-300 transform `}
      >
        <div className="flex items-center xs:justify-center sm:justify-between xs:gap-8 xs:py-2  sm:mx-auto sm:px-4 sm:py-2">
          <Link onClick={clearSuggestion} to={`/`}>
            <img
              className="xs:w-[25vw] sm:w-[15vw] md:w-[12vw] lg:w-[10vw] xl:w-[8.5vw]"
              src="/Cvrbioinformatics.png"
              alt="CVR Bioinformatics Logo"
            ></img>
          </Link>
          <SearchBar
            data={data}
            isAutoCompleteOpen={isAutoCompleteOpen}
            setIsAutoCompleteOpen={setIsAutoCompleteOpen}
            suggestion={suggestion}
            clearSuggestion={clearSuggestion}
            handleSubmit={handleSubmit}
            handleFilter={handleFilter}
            searchParam={searchParam}
            filterParam={filterParam}
            handleText={handleText}
            clearSearch={clearSearch}
          />
          <NavLinks />
          <div>
            {!isMobileMenuOpen ? (
              <button
                className="sm:hidden text-[#4a95c0]"
                onClick={toggleMobileMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="sm:hidden py-2 text-[#4a95c0]"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  height="2.5em"
                  width="2.5em"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9.293l3.646-3.647a.5.5 0 11.708.708L10.707 10l3.647 3.646a.5.5 0 01-.708.708L10 10.707l-3.646 3.647a.5.5 0 11-.708-.708L9.293 10 5.646 6.354a.5.5 0 11.708-.708L10 9.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        {isMobileMenuOpen ? (
          <div className=" z-10 h-[20vh] w-full">
            <Suspense fallback={null}>
              <MobileNavLinks
                toggleMobileMenu={toggleMobileMenu}
                isMobileMenuOpen={isMobileMenuOpen}
              />
            </Suspense>
            <div className="mobilesearchbar pl-4 pr-4 ">
              <Suspense fallback={null}>
                <MobileSearchBar
                  data={data}
                  isAutoCompleteOpen={isAutoCompleteOpen}
                  setIsAutoCompleteOpen={setIsAutoCompleteOpen}
                  suggestion={suggestion}
                  clearSuggestion={clearSuggestion}
                  handleSubmit={handleSubmit}
                  handleFilter={handleFilter}
                  searchParam={searchParam}
                  filterParam={filterParam}
                  handleText={handleText}
                  clearSearch={clearSearch}
                />
              </Suspense>
            </div>
          </div>
        ) : null}
      </nav>
    </>
  );
};

export default Navbar;
