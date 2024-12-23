import React from "react";
import { Link } from "react-router-dom";
import ResultToolTip from "./ui/ResultToolTip";
import { ProteinData } from "../types/proteindata";
import { BlastMatchData } from "../types/blastmatchdata";

type ProteinStructureResultsProps = {
  data: ProteinData | BlastMatchData;
  filterParam: string | undefined;
  searchParam: string | undefined;
};

const ProteinStructureResults: React.FC<ProteinStructureResultsProps> = ({
  data,
  filterParam,
  searchParam,
}) => {
  return filterParam !== "sequence_match" ? (
    <>
      <ul className="xs:px-4 sm:px-8 py-8 grid sm:grid-cols-2 xs:grid-cols-1 gap-4">
        {"protein_structures" in data &&
          data.protein_structures?.map((protein) => (
            <Link
              to={{
                pathname: `/structureindex/${encodeURIComponent(
                  protein.Virus_name_s_
                )}/${protein.record_id}`,
              }}
              key={protein.record_id}
            >
              <div className="result-card-by-virus-match hover:-translate-y-1 xs:text-xs transition ease-in-out drop-shadow-md  h-[100%] flex flex-row justify-between border-2 border-[#4a95c0] hover:border-[#50bde5] rounded-md bg-[#f9f9f9]">
                <div className="px-4 py-2 flex flex-col justify-evenly  basis-2/3">
                  <div className="">
                    <div className=" 2xl:text-2xl  lg:text-base xs:text-xs text-[#4a95c0] font-light">
                      {protein.genbank_name_curated.length > 60 ? (
                        <ResultToolTip
                          text={protein.genbank_name_curated}
                          textLength={60}
                        />
                      ) : (
                        <li>{protein.genbank_name_curated}</li>
                      )}
                    </div>
                  </div>
                  <div className=" sm:text-xs xl:text-sm 2xl:text-xl  font-thin break-all">
                    <li className="hidden md:block">
                      Peptide Category: {protein.pept_cat}
                    </li>
                    {protein.Virus_name_s_.length > 40 ? (
                      <ResultToolTip
                        text={protein.Virus_name_s_}
                        textLength={40}
                      />
                    ) : (
                      <li>{protein.Virus_name_s_}</li>
                    )}
                  </div>
                </div>
                <div className="basis-1/3 flex flex-col justify-end ">
                  <li className="lg:text-sm 2xl:text-2xl xs:text-xs text-white font-thin xs:py-1 xs:px-1 lg:px-2 lg:py-2 bg-[#4a95c0]">
                    pLDDT Score: {protein.colabfold_json_pLDDT}
                  </li>
                </div>
              </div>
            </Link>
          ))}
      </ul>
    </>
  ) : (
    <>
      <ul className="px-8 py-8 grid xs:grid-col-1 sm:grid-cols-2 gap-4">
        {"matches" in data &&
          data.matches?.map((match) => (
            <Link
              to={{
                pathname: `/structureindex/${match.protein_structure.Virus_name_s_}/${match.protein_structure.record_id}`,
              }}
              key={match.protein_structure.record_id}
            >
              <div className="result-card-by-sequence-match flex flex-col justify-between hover:-translate-y-1 xs:text-xs transition ease-in-out drop-shadow-md h-[100%]  border-2 border-[#4a95c0] hover:border-[#50bde5] rounded-md bg-[#f9f9f9]">
                <div className="flex flex-row justify-between">
                  <div className="basis-2/3">
                    {match.protein_structure.genbank_name_curated.length <
                    50 ? (
                      <ul className="sm:px-4 sm:py-2 xs:px-4 xs:py-2 2xl:text-2xl lg:text-base xs:text-xs text-[#4a95c0] font-light">
                        <li className="">
                          {match.protein_structure.genbank_name_curated}
                        </li>
                        <li className="text-slate-500 2xl:text-xl lg:text-sm xs:text-xs">
                          {match.protein_structure.Virus_name_s_}
                        </li>
                      </ul>
                    ) : (
                      <ul className="sm:px-4 sm:py-2 xs:px-4 xs:py-2 2xl:text-2xl lg:text-base xs:text-xs text-[#4a95c0] font-light">
                        <li className="">
                          <ResultToolTip
                            text={match.protein_structure.genbank_name_curated}
                            textLength={50}
                          />
                        </li>
                        <li className="text-slate-500 2xl:text-xl lg:text-sm xs:text-xs">
                          {match.protein_structure.Virus_name_s_}
                        </li>
                      </ul>
                    )}
                  </div>
                  <div className="py-2 px-2 basis-1/3 2xl:text-xl lg:text-sm xs:text-xs text-right text-slate-500">
                    pLDDT Score: {match.protein_structure.colabfold_json_pLDDT}
                  </div>
                </div>
                <div className="flex flex-row w-[100%] divide-x text-center font-thin 2xl:text-lg xs:text-xs text-white">
                  {searchParam ? (
                    <>
                      <li className="bg-[#4a95c0] xs:px-2 sm:py-2 basis-1/3">
                        evalue: {match.evalue}
                      </li>
                      <li className="bg-[#4a95c0] xs:px-2 sm:py-2 basis-1/3">
                        Blastp Score: {match.score}
                      </li>
                      <li className="bg-[#4a95c0] xs:px-2 sm:py-2 basis-1/3">
                        Seq. Identity:&nbsp;
                        {((match.positives / searchParam.length) * 100).toFixed(
                          0
                        )}
                        %
                      </li>
                    </>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
      </ul>
    </>
  );
};

export default ProteinStructureResults;
