import { useEffect, useState } from "react";
import { Coordinates } from "../types/coordinates";
import { api_url } from "../utils/api";

export function useGenomeCoordinates(filterparam: string, id: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (filterparam === "virus_name") {
      setIsLoading(true);
      fetch(
        `${api_url}/api/genome_coordinates/${filterparam}/?qualifier=${encodeURIComponent(
          id
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCoordinates(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setCoordinates(null);
          setIsLoading(false);
        });
    }
  }, [filterparam, id]);

  return { coordinates, isLoading };
}
