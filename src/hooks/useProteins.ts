import { useEffect, useState } from "react";
import { ProteinData } from "../types/proteindata";
import { api_url } from "../utils/api";

export function useProteins(
  filterparam: string,
  id: string,
  currentpage: number,
  advanced?: string
) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ProteinData | null>(null);

  useEffect(() => {
    setIsLoading(true);
    if (filterparam === "virus_name") {
      fetch(
        `${api_url}/api/proteins/${filterparam}_exact/?qualifier=${id}${
          advanced ? `&filter=${advanced}` : ``
        }&page_size=10&page_num=${currentpage}`
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
          console.error(error);
          if (error.status >= 500) {alert("Viro3D server is currently unavailable, please try again later.")}
          setData(null);
          setIsLoading(false);
        });
    } else {
      fetch(
        `${api_url}/api/proteins/${filterparam}/?qualifier=${id}${
          advanced ? `&filter=${advanced}` : ``
        }&page_size=10&page_num=${currentpage}`
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
          console.error(error.status);
          if (error.status >= 500) {alert("Viro3D server is currently unavailable, please try again later.")}
          setData(null);
          setIsLoading(false);
        });
    }
  }, [filterparam, id, currentpage, advanced]);

  return { isLoading, data };
}
