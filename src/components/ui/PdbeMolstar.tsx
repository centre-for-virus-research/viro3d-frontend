import React, { useEffect, createRef } from "react";
import { PDBeMolstarPlugin } from "pdbe-molstar/lib";
import { InitParams } from "pdbe-molstar/lib/spec";
import { api_url } from "../../utils/api";

type Model = {
  modelID: string;
  defaultModel: string;
};

const PDBeMolStar: React.FC<Model> = ({ defaultModel, modelID }) => {
  const viewerContainerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    function init() {
      const url = `${api_url}/api/pdb/${defaultModel}-${modelID}.cif`;

      const pluginInstance = new PDBeMolstarPlugin();

      //Set options (Checkout available options list in the documentation)
      const options: Partial<InitParams> = {
        customData: {
          url: url,
          format: "cif",
          binary: false,
        },
        hideCanvasControls: [
          "selection",
          "animation",
          "expand",
          "controlToggle",
          // 'controlInfo'
        ],
        alphafoldView: true,
        bgColor: { r: 242, g: 242, b: 242 },
        hideControls: true,
        sequencePanel: true,
        reactive: true,
        hideStructure: ["het", "water", "nonStandard", "carbs", "coarse"],
        //remove comment-out on line below to disable ball and stick from showing when you select a residue
        granularity: "residueInstances",
      };

      if (viewerContainerRef.current === null) return;

      //Call render method to display the 3D view
      pluginInstance.render(viewerContainerRef.current, options);
    }
    init();
  }, [modelID]);

  return (
    <>
      <div className="relative xs:h-[90%] md:h-[100%]  ">
        <div
          id="pdbeMolstar"
          ref={viewerContainerRef}
          style={{ border: "0px" }}
        ></div>
      </div>
    </>
  );
};

export default PDBeMolStar;
