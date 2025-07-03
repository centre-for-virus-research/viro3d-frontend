import { useEffect, useState } from "react";
import { VirusData } from "../types/virusdata";
import { api_url } from "../utils/api";

export function useViruses(
  filterparam: string,
  id: string,
  currentpage: number
) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<VirusData | null>(null);

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `${api_url}/api/viruses/?qualifier=${id}&page_size=10&page_num=${currentpage}`
    )
      .then((res) => {
        if (!res.ok) {
          throw { status: res.status, message: res.statusText };
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setData(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        if (error.status >= 500) {alert("Viro3D server is currently unavailable, please try again later.")}
        setData(null);
        setIsLoading(false);
      });
  }, [filterparam, id, currentpage]);

  return { isLoading, data };
}
