import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PdbeMolstar from "../components/ui/PdbeMolstar";
import ProteinInfo from "../components/ProteinInfo";
import FeatureBrowserContainer from "../components/FeatureBrowserContainer";
import { useStructureIndexData } from "../hooks/useStructureIndexData";
import { useGenomeCoordinates } from "../hooks/useGenomeCoordinates";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import PdbeMolstartLegend from "../components/ui/PdbeMolstarLegned";
import { isMobile } from "react-device-detect";
import { api_url } from "../utils/api";
import { useClusters } from "../hooks/useClusters";
import ClustersContainer from "../components/ClustersContainer";

const StructureIndex: React.FC = () => {

  const { filterParam, searchParam } = useParams();

  const { coordinates, isLoading: genomeLoading } = useGenomeCoordinates(
    "virus_name",
    filterParam ?? ""
  );

  const { clusters, isLoading: clustersLoading } = useClusters(
    searchParam ?? ""
  );

  const {
    proteinInfo,
    defaultModel,
    isESMFoldModelPresent,
    handleCollabFoldClick,
    handleESMFoldClick,
  } = useStructureIndexData(searchParam ?? "");

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <div className="min-h-screen xs:mt-24 sm:mt-32 xs:mb-4 sm:mb-32 sm:my-auto sm:mx-4 lg:mx-8 2xl:mx-24">
        {!proteinInfo ? (
          <div className="min-h-screen">
            <div className="flex items-center justify-center gap-12">
              <LoadingSpinner />
            </div>
          </div>
        ) : proteinInfo ? (
          <>
            <div className="desktop-back-button hidden lg:block py-2 ">
              {filterParam ? (
                <Link
                  to={`/proteinresultspage/virus_name/${encodeURIComponent(
                    filterParam
                  )}`}
                  className="text-xl px-2 py-2 rounded-md drop-shadow-md border-0  bg-[#4a95c0] hover:bg-[#4da9ca] text-white text-center"
                >
                  Virus Structure List
                </Link>
              ) : null}
            </div>
            {coordinates && !isMobile ? (
              <FeatureBrowserContainer
                filterParam={"virus_name"}
                searchParam={filterParam ?? ""}
                coordinates={coordinates}
                genomeLoading={genomeLoading}
                recordID={searchParam ?? ""}
                isolate={proteinInfo.Virus_isolate_designation}
              />
            ) : null}

            <div className="mobile-heading lg:hidden ">
              <h1 className="mx-12 text-2xl text-slate-500 ">
                {proteinInfo["genbank_name_curated"]}
              </h1>
            </div>
            <div className="flex flex-col gap-8">
              <div className="structuredata-container mb-2 sm:mt-12 xs:mt-8  xs:grid xs:grid-rows-2 xs:gap-8 md:gap-16 lg:flex lg:gap-2 xl:gap-16 lg:flex-row-1 ">
                {defaultModel === "CF" ? (
                  <div className="basis-1/2 mx-8 flex flex-col">
                    {isESMFoldModelPresent ? (
                      <div>
                        <button
                          className="border border-[#313645] bg-[#4a95c0] hover:bg-[#4da9ca] text-white w-full"
                          onClick={handleESMFoldClick}
                        >
                          Switch to ESMFold Model
                        </button>
                      </div>
                    ) : null}
                    <PdbeMolstar
                      defaultModel={defaultModel}
                      modelID={searchParam ?? ""}
                    />

                    <div className=" download-buttons-container flex flex-row ">
                      <a
                        className="border border-[#313645] bg-[#4a95c0] hover:bg-[#4da9ca] text-white text-center w-full"
                        href={`${api_url}/api/pdb/${defaultModel}-${searchParam}.cif`}
                      >
                        Download mmCIF
                      </a>
                      <a
                        className="border border-[#313645] bg-[#4a95c0] hover:bg-[#4da9ca] text-white text-center w-full"
                        href={`${api_url}/api/pdb/${defaultModel}-${searchParam}_relaxed.pdb`}
                      >
                        Download PDB
                      </a>
                    </div>
                    <PdbeMolstartLegend />
                  </div>
                ) : null}
                {defaultModel === "EF" ? (
                  <div className="xs:basis-1/2 xs:mx-8 flex flex-col">
                    {isESMFoldModelPresent ? (
                      <div>
                        <button
                          className="border border-[#313645]  bg-[#4a95c0] hover:bg-[#4da9ca] text-white w-full"
                          onClick={handleCollabFoldClick}
                        >
                          Switch to ColabFold Model
                        </button>
                      </div>
                    ) : null}
                    <PdbeMolstar
                      defaultModel={defaultModel}
                      modelID={searchParam ?? ""}
                    />
                    <div className=" download-buttons-container flex flex-row ">
                      <a
                        className="border border-[#313645] bg-[#4a95c0] hover:bg-[#4da9ca] text-white text-center w-full"
                        href={`${api_url}/api/pdb/${defaultModel}-${searchParam}.cif`}
                      >
                        Download mmCIF
                      </a>
                      <a
                        className="border border-[#313645] bg-[#4a95c0] hover:bg-[#4da9ca] text-white text-center w-full"
                        href={`${api_url}/api/pdb/${defaultModel}-${searchParam}_relaxed.pdb`}
                      >
                        Download PDB
                      </a>
                    </div>
                    <PdbeMolstartLegend />
                  </div>
                ) : null}
                <div className="sm:basis-1/2 sm:min-w-[30vw] font-extralight ">
                  <ProteinInfo
                    proteinInfo={proteinInfo}
                    defaultModel={defaultModel}
                  />
                </div>
              </div>
              <div className="">
              <div className="clusters-container w-full  mt-2">
                {clusters &&
                clusters?.clusters[0].cluster_members.length > 1 &&
                searchParam ? (
                  <ClustersContainer
                    clusters={clusters}
                    clustersLoading={clustersLoading}
                    searchParam={searchParam}
                  />
                ) : null}
              </div>
              </div>
            </div>
          </>
        ) : (
          <div className="results-container mt-24 flex flex-col items-center h-screen justify-center">
            <p className="mb-12 xs:text-4xl sm:text-5xl text-slate-500">
              Error: No data to display
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default StructureIndex;
