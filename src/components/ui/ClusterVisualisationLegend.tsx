import React from "react";

type ClusterVisualisationLegendProps = {
  handleLegendPopUpClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ClusterVisualisationLegend: React.FC<ClusterVisualisationLegendProps> = ({handleLegendPopUpClick}) => {

  return (
    <>
        <div className="flex flex-col mx-2 my-2 px-2 py-2 border-0 xl:text-lg lg:text-base xs:text-xs rounded bg-[#e6e6e6de] gap-2">
        <button onClick={handleLegendPopUpClick} className="text-[#6d828d] xl:text-xl lg:text-lg border-b hover:border-[#505f66] hover:text-[#505f66]">Hide Legend</button>
          <div className="inline-flex items-center">
            <span className="size-4 inline-block bg-[#8b81b9] rounded-full me-2"></span>
            <span className="">Duplodnaviria</span>
          </div>
          <div className="inline-flex items-center">
            <span className="size-4 inline-block bg-[#b87795] rounded-full me-2"></span>
            <span className="">Monodnaviria</span>
          </div>
          <div className="inline-flex items-center">
            <span className="size-4 inline-block bg-[#5cb7a8] rounded-full me-2"></span>
            <span className="">Riboviria</span>
        </div>
        <div className="inline-flex items-center">
            <span className="size-4 inline-block bg-[#117733] rounded-full me-2"></span>
            <span className="">Ribozyviria</span>
        </div>
        <div className="inline-flex items-center">
            <span className="size-4 inline-block bg-[#ddc454] rounded-full me-2"></span>
            <span className="">Varidnaviria</span>
          </div>
          <div className="inline-flex items-center">
            <span className="size-4 inline-block bg-gray-500 rounded-full me-2"></span>
            <span className="">Unclassified</span>
          </div>
        </div>
    </>
  );
};

export default ClusterVisualisationLegend;
