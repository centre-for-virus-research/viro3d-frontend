import React from "react";
import { Link } from "react-router-dom";
import { VirusData } from "../types/virusdata";

type VirusResultsProps = {
  data: VirusData;
};

const VirusResults: React.FC<VirusResultsProps> = ({ data }) => {
  return (
    <>
      <ul className="px-8 py-auto grid sm:grid-cols-2 xs:grid-cols-1 gap-4">
        {data.viruses?.map((virus) => (
          <Link
            to={{
              pathname: `/proteinresultspage/virus_name/${encodeURIComponent(
                virus._id
              )}`,
            }}
            key={virus._id}
          >
            <div className="result-card hover:-translate-y-1 transition ease-in-out drop-shadow-md xs:min-h-[8vh] xs:max-h-[8vh] sm:min-h-[20vh] sm:max-h-[20vh] md:min-h-[12.5vh] md:max-h-[12.5vh] lg:min-h-[10vh] lg:max-h-[10vh] flex flex-col justify-between border-2 border-[#4a95c0] hover:border-[#50bde5] rounded-md bg-[#f9f9f9]">
              <div className="2xl:text-2xl lg:text-base xs:text-xs text-[#4a95c0] font-light">
                <li className="px-6  xs:py-2 text-[#4a95c0] text-center font-light">
                  {virus._id}
                </li>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default VirusResults;
