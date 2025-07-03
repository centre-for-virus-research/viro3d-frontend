import React from "react";
import AutocompleteDropdown from "./AutocompleteDropdown";
import { ProteinData } from "../../types/proteindata";
import { VirusData } from "../../types/virusdata";

type SearchBarProps = {
    data: ProteinData | VirusData | null;
    isAutoCompleteOpen: boolean;
    suggestion: string;
    searchParam: string;
    filterParam: string;
    clearSearch: (event: React.MouseEvent<HTMLButtonElement>) => void;
    clearSuggestion: () => void;
    handleText: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void; 
    setIsAutoCompleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  };
  
const SearchBar: React.FC<SearchBarProps> = ({
  data,
  isAutoCompleteOpen,
  setIsAutoCompleteOpen,
  suggestion,
  clearSuggestion,
  handleSubmit,
  handleFilter,
  searchParam,
  filterParam,
  handleText,
  clearSearch,
}) => {
  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="hidden sm:flex flex-col-1 xs:w-[100%] sm:w-[45%] md:w-[55%] xl:w-[60%]   border-0 border-[#f9f9f9] rounded-full divide-x-4 xs:text-lg sm:text-base lg:text-2xl bg-[#f9f9f9]"
      >
        <select
          id="search-filter"
          onChange={(e) => handleFilter(e)}
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
              onChange={(e) => handleText(e)}
              placeholder={`${filterParam === "viruses" ? "SARS" : ""}${
                filterParam === "protein_name" ? "Glycoprotein" : ""
              }${filterParam === "sequence_match" ? "WEWSDVLWWIKKIAG" : ""}${
                filterParam === "genbank_id" ? "AKO90165.1" : ""
              }`}
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
    </>
  );
};

export default SearchBar;
