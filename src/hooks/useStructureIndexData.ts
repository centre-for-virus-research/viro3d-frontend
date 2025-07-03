import { useEffect, useState } from "react";
import { api_url } from "../utils/api";
import { ProteinStructure } from "../types/proteinstructure";

export function useStructureIndexData(id: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [proteinInfo, setProteinInfo] = useState<ProteinStructure | null>(null);
  const [defaultModel, setDefaultModel] = useState<string>("CF");
  const [isESMFoldModelPresent, setIsESMFoldModelPresent] = useState<boolean>(false);

  const handleCollabFoldClick = () => {
    setDefaultModel("CF");
  };

  const handleESMFoldClick = () => {
    setDefaultModel("EF");
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`${api_url}/api/proteins/recordid/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw { status: res.status, message: res.statusText };
      }
      return res.json();
    })
      .then(async (data) => {
        setProteinInfo(data.protein_structure);
        if (
          (await data.protein_structure.esmfold_log_pLDDT) > 50 &&
          data.protein_structure.esmfold_log_pLDDT >
            data.protein_structure.colabfold_json_pLDDT
        ) {
          setDefaultModel("CF");
          setIsESMFoldModelPresent(true);
        } else {
          setDefaultModel("CF");
          setIsESMFoldModelPresent(false);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        if (error.status >= 500) {alert("Viro3D server is currently unavailable, please try again later.")}        
        setProteinInfo(null);
        setIsLoading(false);
      });
  }, [id]);

  return {
    isLoading,
    proteinInfo,
    defaultModel,
    isESMFoldModelPresent,
    handleCollabFoldClick,
    handleESMFoldClick,
  };
}
