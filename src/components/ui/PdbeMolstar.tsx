import React, { useEffect, useRef, useState } from "react";
import { api_url } from "../../utils/api";

type Model = {
  modelID: string;
  defaultModel: string;
};

declare global {
  interface Window {
    PDBeMolstarPlugin: any;
  }
}

const PDBeMolStar: React.FC<Model> = ({ defaultModel, modelID }) => {
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const scriptId = "pdbe-molstar-script";

    // Prevent loading the script more than once
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.ebi.ac.uk/pdbe/pdbe-molstar/build/pdbe-molstar-plugin.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => console.error("Failed to load PDBeMolstar plugin script");
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !viewerContainerRef.current || !window.PDBeMolstarPlugin) return;

    const url = `${api_url}/api/pdb/${defaultModel}-${modelID}.cif`;
    const pluginInstance = new window.PDBeMolstarPlugin();

    const options = {
      customData: {
        url,
        format: "cif",
        binary: false,
      },
      hideCanvasControls: ["selection", "animation", "expand", "controlToggle"],
      alphafoldView: true,
      bgColor: { r: 242, g: 242, b: 242 },
      hideControls: true,
      sequencePanel: true,
      reactive: true,
      hideStructure: ["het", "water", "nonStandard", "carbs", "coarse"],
      granularity: "residueInstances",
    };

    pluginInstance.render(viewerContainerRef.current, options);
  }, [scriptLoaded, modelID]);

  return (
    <div className="relative xs:h-[90%] md:h-[100%]">
      <div id="pdbeMolstar" ref={viewerContainerRef} style={{ border: "0px" }} />
    </div>
  );
};

export default PDBeMolStar;
