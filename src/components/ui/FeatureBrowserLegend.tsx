import React from "react";

const FeatureBrowserLegend: React.FC = () => {
  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="inline-flex items-center">
          <span className="size-2 inline-block bg-[#ACCBE1] rounded-full me-2"></span>
          <span className="">Protein</span>
        </div>
        <div className="inline-flex items-center">
          <span className="size-2 inline-block bg-[#56b3e6] rounded-full me-2"></span>
          <span className="">Region</span>
        </div>
        <div className="inline-flex items-center">
          <span className="size-2 inline-block bg-[#91a8eb] rounded-full me-2"></span>
          <span className="">Mature Peptide</span>
        </div>
        <div className="inline-flex items-center">
          <span className="size-2 inline-block bg-[#41d4a2] rounded-full me-2"></span>
          <span className="">Currently Selected Protein</span>
        </div>
      </div>
    </>
  );
};

export default FeatureBrowserLegend;
