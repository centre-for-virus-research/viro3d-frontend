import React, { useState } from "react";

type TooltipProps = {
  text: string;
};

const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  const [showTooltip, setShowToolTip] = useState<boolean>(false);
  return (
    <>
      <div
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
        className="tooltip-container xs:hidden lg:block"
      >
        <h1 className="mb-6 cursor-default text-slate-500 text-4xl">
          {text.substring(0, 60)}...
        </h1>
        <div
          className={`absolute top-20 bg-[#64748b] rounded px-2 py-2 text-3xl opacity-95 text-[#FFFFFF]  ${
            showTooltip ? "" : "hidden"
          }`}
        >
          {text}
        </div>
      </div>
    </>
  );
};

export default Tooltip;
