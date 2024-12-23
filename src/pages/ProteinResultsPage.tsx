import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProteinStructureResults from "../components/ProteinStructureResults";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Pagination from "../components/ui/Pagination";
import FeatureBrowserContainer from "../components/FeatureBrowserContainer";
import { useGenomeCoordinates } from "../hooks/useGenomeCoordinates";
import { useProteins } from "../hooks/useProteins";
import { isMobile } from "react-device-detect";
import AdvancedSearch from "../components/ui/AdvancedSearch";

const ProteinResultsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [advancedSearch, setAdvancedSearch] = useState<string>("");

  const { filterParam, searchParam } = useParams();

  const { coordinates, isLoading: genomeLoading } = useGenomeCoordinates(
    filterParam ?? "",
    searchParam ?? ""
  );

  const { data, isLoading } = useProteins(
    filterParam ?? "",
    searchParam ?? "",
    currentPage,
    advancedSearch ?? ""
  );

  useEffect(() => {
    setCurrentPage(1)
  }, [searchParam]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const clearAdvancedSearch = () => {
    setAdvancedSearch("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen xs:mt-24 xs:mb-4 md:mb-12 sm:mt-40 my-auto xs:mx-4 xl:mx-16 2xl:mx-24">
      {filterParam === "virus_name" && coordinates?.segments && !isMobile ? (
        <FeatureBrowserContainer
          searchParam={searchParam}
          filterParam={filterParam}
          coordinates={coordinates}
          genomeLoading={genomeLoading}
          isolate={coordinates?.segments[0]["isolate_designation"]}
        />
      ) : null}
      <div className="results-container relative h-[100%] mt-8 text-5xl border drop-shadow-md rounded border-slate-300 text-slate-500 bg-[#e6e6e6]">
        <div className="button-row flex xs:flex-col sm:flex-row font-light text-[#4a95c0]">
          <p className="sm:basis-1/2 2xl:basis-2/3 px-8 mt-8 xs:text-lg md:text-xl xl:text-2xl 2xl:text-3xl break-words">
          Showing {data?.count} results for: "
          {searchParam?.substring(0, 40)}..."
          </p>
          {searchParam &&
            (filterParam === "protein_name" ||
              filterParam === "virus_name") && (
              <div className="sm:basis-1/2 2xl:basis-1/3 px-8 mt-8">
                <AdvancedSearch
                  advancedSearch={advancedSearch}
                  setAdvancedSearch={setAdvancedSearch}
                  clearAdvancedSearch={clearAdvancedSearch}
                  setCurrentPage={setCurrentPage}
                  filterParam={filterParam}
                  searchParam={searchParam}
                />
              </div>
            )}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center h-screen justify-center">
            <h2 className="mb-12 text-5xl text-slate-500">Searching...</h2>
            <LoadingSpinner />
          </div>
        ) : !data ? (
          <div className="flex flex-col items-center h-screen justify-center">
            <h2 className="mb-12 text-5xl text-slate-500">No Results</h2>
          </div>
        ) : (
          <>
            {data.detail ? (
              <div className="flex flex-col text-center items-center h-[50vh] justify-center">
                <div className="text-5xl text-slate-500">
                  {JSON.stringify(data.detail)}
                </div>
              </div>
            ) : (
              <>
                <div className="min-h-[50vh] mb-16">
                  <ProteinStructureResults
                    data={data}
                    filterParam={filterParam}
                    searchParam={searchParam}
                  />
                </div>
                {data.count > 10 && (
                  <div className="absolute bottom-0 right-0">
                    <Pagination
                      currentPage={currentPage}
                      resultCount={data.count}
                      handleNextPage={handleNextPage}
                      handlePrevPage={handlePrevPage}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProteinResultsPage;
