import React, { useEffect, useRef } from "react";
import { ProteinData } from "../../types/proteindata";
import { VirusData } from "../../types/virusdata";
import { Link } from "react-router-dom";

type AutocompleteDropdownProps = {
  data: VirusData | ProteinData;
  isAutoCompleteOpen: boolean;
  setIsAutoCompleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterParam: string;
  suggestion: string;
  clearSuggestion: () => void;
};

const AutocompleteDropdown: React.FC<AutocompleteDropdownProps> = ({
  data,
  isAutoCompleteOpen,
  setIsAutoCompleteOpen,
  filterParam,
  suggestion,
  clearSuggestion,
}) => {
  const ref = useRef<HTMLUListElement | null>(null);

  const checkIfClickedOutside = (e: { target: any }) => {
    if (isAutoCompleteOpen && ref.current && !ref.current.contains(e.target)) {
      setIsAutoCompleteOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [checkIfClickedOutside]);

  return (
    <>
      {isAutoCompleteOpen && filterParam === "viruses" && suggestion && data ? (
        <ul
          key={`${filterParam}-${suggestion}`}
          ref={ref}
          className="autocomplete w-full lg:text-2xl xs:text-lg absolute z-50 max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {"viruses" in data &&
            data.viruses?.map((virus) => (
              <Link
                onClick={clearSuggestion}
                to={{
                  pathname: `/proteinresultspage/virus_name/${encodeURIComponent(
                    virus._id
                  )}`,
                }}
                key={virus._id}
              >
                <li className="hover:bg-slate-100 border-0 border-b">
                  {virus._id}
                </li>
              </Link>
            ))}
        </ul>
      ) : null}

      {isAutoCompleteOpen &&
      filterParam === "protein_name" &&
      suggestion &&
      data ? (
        <ul
          key={`${filterParam}-${suggestion}`}
          ref={ref}
          className="autocomplete w-full absolute z-50 max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {"protein_structures" in data &&
            data.protein_structures?.map((protein) => (
              <Link
                onClick={clearSuggestion}
                to={{
                  pathname: `/structureindex/${encodeURIComponent(
                    protein.Virus_name_s_
                  )}/${protein.record_id}`,
                }}
                key={protein.record_id}
              >
                <li className="hover:bg-slate-100 border-0 border-b">
                  {protein.Virus_name_abbreviation_s_ !== ""
                    ? `${protein.Virus_name_abbreviation_s_}: `
                    : `${protein.Virus_name_s_}: `}
                  {protein.genbank_name_curated}
                </li>
              </Link>
            ))}
        </ul>
      ) : null}
    </>
  );
};

export default AutocompleteDropdown;
