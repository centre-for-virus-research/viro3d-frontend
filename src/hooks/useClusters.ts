import { useEffect, useState } from "react";
import { ClustersData } from "../types/clustersdata";
import { api_url } from "../utils/api";

export function useClusters(
  id: string,
) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [clusters, setClusters] = useState<ClustersData | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${api_url}/api/clusters/genbank_id/?qualifier=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setClusters(data);
      })
      .catch((error) => {
        console.error(error);
        setClusters(null);
        setIsLoading(false);
      });
  }, [id]);

  return { isLoading, clusters };
}