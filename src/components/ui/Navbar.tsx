import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useAutocomplete } from "../../hooks/useAutocomplete";
import AutocompleteDropdown from "./AutocompleteDropdown";
import { api_url } from "../../utils/api";

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
          <form
            onSubmit={handleSubmit}
            className="hidden sm:flex flex-col-1 xs:w-[100%] sm:w-[45%] md:w-[55%] xl:w-[60%]   border-0 border-[#f9f9f9] rounded-full divide-x-4 xs:text-lg sm:text-base lg:text-2xl bg-[#f9f9f9]"
          >
            <select
              id="search-filter"
              onChange={handleFilter}
              className="bg-[#f9f9f9] rounded-full xs:text-lg sm:text-sm md:text-xl xl:text-2xl text-slate-500 sm:px-4 xl:px-6 text-center"
            >
              <option value="viruses">Virus Name</option>
              <option value="protein_name">Protein Name</option>
              <option value="sequence_match">Sequence</option>
              <option value="genbank_id">Protein ID</option>
            </select>
            <div className="input-container relative w-full">
              <div className=" flex items-center">
                <input
                  value={decodeURIComponent(searchParam)}
                  onChange={handleText}
                  placeholder={`${
                    filterParam === "viruses" ? "SARS" : ""
                  }${filterParam === "protein_name" ? "Glycoprotein" : ""}${
                    filterParam === "sequence_match" ? "WEWSDVLWWIKKIAG" : ""
                  }${filterParam === "genbank_id" ? "AKO90165.1" : ""}`}
                  className="text-slate-500 pl-4 outline-none sm:h-8 xl:h-10 2xl:h-12 w-full border-none xs:text-lg lg:text-2xl bg-[#f9f9f9]"
                  type="text"
                />
                {searchParam && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="mr-2 text-[#9ca3af] xs:text-sm md:text-xl hover:text-[#777d88] border-0 rounded-full hover:bg-[#4343431e]"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      height="1.5em"
                      width="1.5em"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9.293l3.646-3.647a.5.5 0 11.708.708L10.707 10l3.647 3.646a.5.5 0 01-.708.708L10 10.707l-3.646 3.647a.5.5 0 11-.708-.708L9.293 10 5.646 6.354a.5.5 0 11.708-.708L10 9.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
                <button className="border-0 px-2 py-1 mr-2 xs:text-sm sm:text-lg md:text-xl xl:text-2xl text-[#9ca3af] hover:text-[#777d88] rounded-full  hover:bg-[#4343431e]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 19.585938 21.585938 C 20.137937 22.137937 21.033938 22.137938 21.585938 21.585938 C 22.137938 21.033938 22.137938 20.137938 21.585938 19.585938 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
                  </svg>
                </button>
              </div>
              {data ? (
                <AutocompleteDropdown
                  data={data}
                  isAutoCompleteOpen={isAutoCompleteOpen}
                  setIsAutoCompleteOpen={setIsAutoCompleteOpen}
                  filterParam={filterParam}
                  suggestion={suggestion}
                  clearSuggestion={clearSuggestion}
                />
              ) : null}
            </div>
          </form>
          <ul className="xs:hidden sm:block flex md:flex-row 2xl:space-x-16 xl:space-x-8 md:space-x-4 xs:space-x-2 font-extralight xs:text-sm md:text-base lg:text-2xl 2xl:text-3xl text-[#4a95c0]">
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
            <ul className="sm:hidden flex p-4 md:p-0 flex-row justify-center xs:space-x-8 font-extralight xs:text-2xl text-[#4a95c0]">
              <button
                onClick={toggleMobileMenu}
                className="hover:text-[#50bde5]"
              >
                <Link to="/">Home</Link>
              </button>
              <button
                onClick={toggleMobileMenu}
                className="hover:text-[#50bde5]"
              >
                <Link to="/about">About</Link>
              </button>
              <button
                onClick={toggleMobileMenu}
                className="hover:text-[#50bde5]"
              >
                <Link to={`${api_url}/docs`}>API</Link>
              </button>
            </ul>
            <div className="pl-4 pr-4 ">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col-1 mt-4 w-[100%] h-8  border-0 border-[#f9f9f9] rounded-full divide-x-2  bg-[#f9f9f9]"
              >
                <select
                  id="search-filter"
                  onChange={handleFilter}
                  className="bg-[#f9f9f9] rounded-full text-sm w-[50%] text-slate-500 px-2 text-center"
                >
                  <option value="viruses">Virus Name</option>
                  <option value="protein_name">Protein Name</option>
                  <option value="sequence_match">Sequence</option>
                  <option value="genbank_id">Protein ID</option>
                </select>
                <div className="input-container relative w-full">
                  <div className=" flex items-center">
                    <input
                      value={decodeURIComponent(searchParam)}
                      onChange={handleText}
                      className="text-slate-500 pl-4 outline-none rounded-full  w-full border-none text-lg  bg-[#f9f9f9]"
                      type="text"
                    />
                    {searchParam && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="mr-2 text-[#9ca3af] xs:text-sm md:text-xl hover:text-[#777d88] border-0 rounded-full hover:bg-[#4343431e]"
                      >
                        <svg
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          height="1.5em"
                          width="1.5em"
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
                  {data ? (
                    <AutocompleteDropdown
                      data={data}
                      isAutoCompleteOpen={isAutoCompleteOpen}
                      setIsAutoCompleteOpen={setIsAutoCompleteOpen}
                      filterParam={filterParam}
                      suggestion={suggestion}
                      clearSuggestion={clearSuggestion}
                    />
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </nav>
    </>
  );
};

export default Navbar;
