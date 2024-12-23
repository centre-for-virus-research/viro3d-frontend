import React, { useState } from "react";

type TooltipProps = {
  text: string;
  textLength: number;
};

const ResultToolTip: React.FC<TooltipProps> = ({ text, textLength }) => {
  const [showTooltip, setShowToolTip] = useState<boolean>(false);
  return (
    <>
      <div
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
        className="tooltip-container"
      >
        <h1 className="cursor-default ">{text.substring(0, textLength)}...</h1>
        <div
          className={`fixed -top-10 -left-10 z-10 bg-[#64748b] rounded px-2 py-2 text-2xl opacity-95 text-[#FFFFFF]  ${
            showTooltip ? "" : "hidden"
          }`}
        >
          {text}
        </div>
      </div>
    </>
  );
};

export default ResultToolTip;
