import React from "react";
import AutocompleteDropdown from "./AutocompleteDropdown";
import { ProteinData } from "../../types/proteindata";
import { VirusData } from "../../types/virusdata";

type MobileSearchBarProps = {
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

const MobileSearchBar: React.FC<MobileSearchBarProps> = ({
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
    <form
    onSubmit={(e) => handleSubmit(e)}
    className="flex flex-col-1 mt-4 w-[100%] h-8  border-0 border-[#f9f9f9] rounded-full divide-x-2  bg-[#f9f9f9]"
  >
    <select
      id="search-filter"
      onChange={(e) => handleFilter(e)}
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
          onChange={(e) => handleText(e)}
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
  );
};

export default MobileSearchBar;