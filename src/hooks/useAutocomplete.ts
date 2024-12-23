import { useEffect, useState } from "react";
import { api_url } from "../utils/api";
import { ProteinData } from "../types/proteindata";
import { VirusData } from "../types/virusdata";

export function useAutocomplete(
  filterParam: string,
  id: string,
  currentpage: number
) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ProteinData | VirusData | null>(null);
  const [resultCount, setResultCount] = useState<ProteinData | VirusData | null>(null);

  useEffect(() => {
    if (filterParam === "viruses" && id) {
      setIsLoading(true);
      setData(null);
      fetch(
        `${api_url}/api/viruses/?qualifier=${id}&page_size=10&page_num=${currentpage}`
      )
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          setResultCount(data.count);
          setData(data);
        })
        .catch((error) => {
          console.error(error);
          setData(null);
          setIsLoading(false);
        });
    } else if (filterParam === "protein_name" && id) {
      setIsLoading(true);
      setData(null);
      fetch(
        `${api_url}/api/proteins/protein_name/?qualifier=${id}&page_size=10&page_num=${currentpage}`
      )
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          setResultCount(data.count);
          setData(data);
        })
        .catch((error) => {
          console.error(error);
          setData(null);
          setIsLoading(false);
        });
    }
  }, [id, currentpage]);

  return { isLoading, data, resultCount };
}
