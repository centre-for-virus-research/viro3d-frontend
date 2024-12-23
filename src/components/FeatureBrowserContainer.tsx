import React, { useState, useEffect } from "react";
import FeatureBrowser from "./ui/FeatureBrowser";
import LoadingSpinner from "./ui/LoadingSpinner";
import FeatureBrowserLegend from "./ui/FeatureBrowserLegend";
import ControlsPopUp from "./ui/ControlsPopUp";
import InfoIcon from "./ui/InfoIcon";
import { useZipDownload } from "../hooks/useZipDownload";
import { Coordinates } from "../types/coordinates";

type FeatureBrowserContainerProps = {
  coordinates: Coordinates;
  genomeLoading: boolean;
  searchParam: string | undefined;
  recordID?: string;
  isolate: string;
  filterParam: string;
};

const FeatureBrowserContainer: React.FC<FeatureBrowserContainerProps> = ({
  coordinates,
  genomeLoading,
  searchParam,
  recordID,
  isolate,
}) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
  const [currentIsolate, setCurrentIsolate] = useState<string>("");
  const [isolateDesignations, setIsolateDesignations] = useState<
    string[] | null
  >(null);

  const { isLoading: downloadLoading, handleDownload } = useZipDownload(
    'virus',
    searchParam ?? ""
  );

  const handlePopUp = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };

  const areSegmentsUnique = (coords: { qualifier?: string; segments: any }) => {
    const seenSegments = new Set();

    for (const segment of coords.segments) {
      if (seenSegments.has(segment.segment)) {
        return false;
      }
      seenSegments.add(segment.segment);
    }

    return true;
  };

  useEffect(() => {
    if (coordinates) {
      const array = [
        ...new Set(
          coordinates?.segments?.map((segment) => segment.isolate_designation)
        ),
      ];

      setIsolateDesignations(array);
    }
  }, [coordinates]);

  useEffect(() => {
    setCurrentIsolate(isolate);
  }, [isolate]);

  const handleChange = (e: { target: { value: string } }) => {
    let segmentIndex = coordinates.segments.find(
      (segment) => segment.isolate_designation === e.target.value
    );
    setCurrentIsolate(segmentIndex?.isolate_designation || "");
  };

  return genomeLoading ? (
    <>
      <div className="xs:hidden  sm:flex items-center justify-center gap-12">
        <h2 className="text-5xl text-slate-500">Loading Genome Browser...</h2>
        <LoadingSpinner />
      </div>
    </>
  ) : (
    <>
      <div className="hidden sm:block text-slate-500 ">
        {/* The dropdown menu is rendered when:
        	- The user has selected a non-segmented virus with multiple nucleotide accession numbers (nt_acc) associated with it
        	- The user has selected a segmented virus where some/all segments are associated with multiple nucleotide accession numbers (nt_acc)
      	If the areSegmentsUnique function returns false, this means there are multiple segments with the same name, but associated with different nt_acc's
    	*/}
        <div className="isolate-dropdown-menu flex flex-col items-center">
          <h1 className="text-center mb-6 text-2xl">{searchParam} Genome</h1>
          {(coordinates?.segments?.length > 1 &&
            coordinates.segments[0].segment === "Non-segmented") ||
          (coordinates.segments[0].segment !== "Non-segmented" &&
            !areSegmentsUnique(coordinates)) ? (
            <select
              id="search-filter"
              className="bg-[#f9f9f9] hover:text-[#56b3e6] border-b-2 border-[#56b4e600] hover:border-[#56b3e6] text-xl text-center  text-slate-500 mb-4"
              onChange={handleChange}
            >
              {isolateDesignations?.map((segment) => (
                <option
                  key={segment}
                  value={`${segment}`}
                  selected={currentIsolate === segment}
                >
                  Isolate: {segment}
                </option>
              ))}
            </select>
          ) : null}
        </div>
        {/* These feature browsers are mapped when:
        	- The user has selected a SEGMENTED virus where each segment only has ONE nt_acc associated with it e.g Influenza A virus
        	- The ternary operator checks:
          	- If the user has selected a segmented virus. If a virus is non-segmented, it will always have a segment value of "non-segmented", so we just check if this is FALSE
          	- If each segment has a unique name. If they do not, that means each segment is associated with a distinct nt_acc - so we check if the areSegmentsUnique function returns TRUE
    	*/}
        <div className="relative">
          {coordinates?.segments?.length > 1 &&
          coordinates.segments[0].segment !== "Non-segmented" &&
          areSegmentsUnique(coordinates) ? (
            <div
              id="segment-container"
              className="genome-browser-custom-scrollbar overflow-x-auto flex flex-grow divide-x-2 divide-[#bec4cc]"
            >
              {coordinates.segments?.map((segment) => (
                <div
                  key={segment.coordinates[0].nt_acc}
                  id={segment.coordinates[0].nt_acc}
                  className="drop-shadow-md"
                >
                  <h2 className="text-center ">
                    Segment: {segment.coordinates[0].segment}
                  </h2>
                  <FeatureBrowser
                    annotations={segment.coordinates}
                    recordID={recordID ?? ""}
                    browserWidth={"min-w-[50vw]"}
                    genome_length_bp={segment.genome_length_bp}
                  />
                </div>
              ))}
            </div>
          ) : null}
          {/* These feature browsers are mapped when:
        	- The user has selected a SEGMENTED virus where some/all segments have more than one nt_acc associated with them e.g infectious pancreatic necrosis virus
        	- The ternary operator checks:
          	- If the user has selected a segmented virus. If a virus is non-segmented, it will always have a segment value of "non-segmented", so we just check if this is FALSE
          	- If each segment has a unique name. If they do not, that means each segment is associated with a distinct nt_acc - so we check if the areSegmentsUnique function returns FALSE
      	(the dropdown menu will be rendered in this instance)
    	*/}
          {coordinates.segments[0].segment !== "Non-segmented" &&
          !areSegmentsUnique(coordinates) ? (
            <div
              id="segment-container"
              className="genome-browser-custom-scrollbar overflow-x-auto flex flex-grow "
            >
              {coordinates.segments?.map((segment) => (
                <div
                  key={segment.coordinates[0].nt_acc}
                  id={segment.coordinates[0].nt_acc}
                  className={`drop-shadow-md ${
                    currentIsolate !== segment.isolate_designation
                      ? "hidden"
                      : ""
                  }`}
                >
                  <h2 className="text-center ">
                    Segment: {segment.coordinates[0].segment}
                  </h2>
                  <FeatureBrowser
                    annotations={segment.coordinates}
                    recordID={recordID ?? ""}
                    browserWidth={"min-w-[50vw]"}
                    genome_length_bp={segment.genome_length_bp}
                  />
                </div>
              ))}
            </div>
          ) : null}
          {/* These feature browsers are mapped when:
        	- The user has selected a NON-SEGMENTED virus where there is MORE THAN ONE nt_acc associated with this ONE virus e.g chikungunya virus
        	- The ternary operator checks:
          	- If the user has selected a segmented virus. If a virus is non-segmented, it will always have a segment value of "non-segmented", so we just check if this is TRUE
          	- If the length of coordinates.segments > 1 - this means there is more than one nt_acc number associated with the virus
    	(the dropdown menu will be rendered in this instance)
    	*/}
          {coordinates.segments[0].segment === "Non-segmented" &&
          coordinates.segments.length > 1 ? (
            <div
              id="segment-container"
              className="genome-browser-custom-scrollbar overflow-x-auto flex-col flex-grow divide-[#bec4cc]"
            >
              {coordinates.segments?.map((segment) => (
                <div
                  key={segment.coordinates[0].nt_acc}
                  id={segment.nt_acc}
                  className={`drop-shadow-md ${
                    currentIsolate !== segment.isolate_designation
                      ? "hidden"
                      : ""
                  }`}
                >
                  <FeatureBrowser
                    annotations={segment.coordinates}
                    recordID={recordID ?? ""}
                    browserWidth={"min-w-[50vw]"}
                    genome_length_bp={segment.genome_length_bp}
                  />
                </div>
              ))}
            </div>
          ) : null}
          {/* This singular feature browser is rendered when:
        	- The user has selected a NON-SEGMENTED virus and there is only one nt_acc associated with it
        	- The ternary operator checks:
          	- If the user has selected a NON-SEGMENTED virus. If a virus is non-segmented, it will always have a segment value of "non-segmented", so we just check if this is TRUE
          	- If the length of coordinates.segments = 1; this means there is one nt_acc number associated with the virus => only one browser needs to be rendered
    	*/}
          {coordinates.segments.length === 1 ? (
            <div className="drop-shadow-md border-b-0 border-[#64748b] ">
              <FeatureBrowser
                annotations={coordinates?.segments[0]?.coordinates}
                recordID={recordID ?? ""}
                browserWidth={"min-w-[50vw]"}
                genome_length_bp={coordinates?.segments[0]?.genome_length_bp}
              />
            </div>
          ) : null}
          {isPopUpOpen ? <ControlsPopUp handleClick={handlePopUp} /> : null}
        </div>
        <div className="mt-1 flex flex-row justify-between">
          <FeatureBrowserLegend />
          <div className="flex flex-row gap-4 ">
            {downloadLoading ? (
              <p>Downloading...</p>
            ) : (
              <>
                <div className="flex flex-row gap-2">
                  <p>Download All Structures:</p>
                  <div className="flex flex-row gap-2">
                    <button
                      onClick={() => handleDownload("_relaxed.pdb")}
                      disabled={downloadLoading}
                      className="hover:text-[#56b3e6] border-b-2 border-[#56b4e600] hover:border-[#56b3e6]"
                    >
                      PDBs
                    </button>
                    <button
                      onClick={() => handleDownload(".cif")}
                      disabled={downloadLoading}
                      className="hover:text-[#56b3e6] border-b-2 border-[#56b4e600] hover:border-[#56b3e6]"
                    >
                      mmCIFs
                    </button>
                  </div>
                </div>
              </>
            )}
            <button
              onClick={handlePopUp}
              className="block"
              data-modal-target="default-modal"
              data-modal-show="default-modal"
              type="button"
            >
              <InfoIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureBrowserContainer;
