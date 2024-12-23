import { useEffect, useState } from "react";
import { api_url } from "../utils/api";
import { GraphData } from "../types/graphdata";

export function useGraphData() {
  const [data, setData] = useState<GraphData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      let response: Response | null = null;
      try {
        response = await fetch(
          `${api_url}/api/graph_data/graph_data.json`
        );

        if (!response.ok) {
          if (response.status >= 500) {
            alert("The Viro3D server is currently unavailable");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
      }
    };

    fetchData();
  }, []);

  return { data };
}
