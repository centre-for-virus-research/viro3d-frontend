import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClustersData } from "../types/clustersdata";
import LoadingSpinner from "./ui/LoadingSpinner";
import { useZipDownload } from "../hooks/useZipDownload";
import { isMobile } from "react-device-detect";

type ClustersContainerProps = {
  clusters: ClustersData;
  clustersLoading: boolean;
  searchParam: string;
};

type SortConfig = {
  key: string;
  direction: "asc" | "desc";
};

const ClustersContainer: React.FC<ClustersContainerProps> = ({
  clusters,
  clustersLoading,
  searchParam,
}) => {
  const navigate = useNavigate();

  const { isLoading: downloadLoading, handleDownload } = useZipDownload(
    "cluster",
    clusters.clusters[0].cluster_representative ?? "",
    clusters.genbank_id
  );

  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);


  const sortedMembers = React.useMemo(() => {
    const members = [...clusters.clusters[0].cluster_members];
    if (sortConfig !== null) {
      members.sort((a, b) => {
        let aValue = a[sortConfig.key as keyof typeof a];
        let bValue = b[sortConfig.key as keyof typeof b];
  
        if (typeof aValue === "string" && typeof bValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
  
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return members;
  }, [clusters, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const clusterItems = sortedMembers.map((member) => {
    const isSelected = member.member_record_id === searchParam.toString();
    return (
      <tr
        key={member.member_record_id}
        onClick={() =>
          navigate(`/structureindex/${member.virus_name}/${member.member_record_id}`)
        }
        className={`cursor-pointer xs:text-xs md:text-base ${
          isSelected ? "bg-[#4a95c0] text-white" : "hover:bg-[#e6e6e6]"
        }
        ${isMobile ? "break-words" : ""}`}
      >
        <td className="text-left pl-2">{member.genbank_id}</td>
        <td className="text-left">{member.genbank_name_curated}</td>
        <td className="text-left">{member.virus_name}</td>
        <td className="text-left pl-2">{member.plDDT_score}</td>
        <td className="text-left pl-2">{member.protein_length}</td>
      </tr>
    );
  });

  return clustersLoading ? (
    <>
      <LoadingSpinner />
    </>
  ) : (
    <>
      <div className="border border-[#64748b] bg-[#f9f9f9] xs:mx-2 md:mx-0">
        <div className="overflow-hidden">
          <table className="w-full table-fixed border-collapse border-b border-[#64748b]">
          <caption className="p-5 md:text-xl xs:text-base font-semibold text-left rtl:text-right bg-[#e6e6e6] text-[#636262]">
            <div className="flex flex-row justify-between">
              <h1>Similar Structures</h1>
              <h2 className="xs:text-xs md:text-lg font-normal text-gray-500">(Click headers to sort data)</h2>
              </div>
              <div className="flex md:flex-row xs:flex-col justify-between">
                <p className="mt-1 md:text-lg xs:text-sm font-normal text-gray-500">
                  Clustered Based on FoldSeek Similarity Scores
                </p>
                {downloadLoading ? (
                  <p className="mt-1 md:text-lg xs:text-sm  font-normal text-gray-500">
                    Downloading...
                  </p>
                ) : (
                  <div className={`${isMobile ? "hidden" : ""} flex flex-row gap-2 mt-1 md:text-lg font-normal text-gray-500`}>
                    <p>Download All Similar Structures:</p>
                    <div className="flex flex-row gap-2">
                      <button
                        onClick={() => handleDownload("_relaxed.pdb")}
                        disabled={downloadLoading}
                        className="hover:text-[#56b3e6]  border-b-2 border-[#56b4e600] hover:border-[#56b3e6]"
                      >
                        PDBs
                      </button>
                      <button
                        onClick={() => handleDownload(".cif")}
                        disabled={downloadLoading}
                        className="hover:text-[#56b3e6] border-b-2 border-[#56b4e600] hover:border-[#56b3e6]"
                      >
                        mmCIFs
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </caption>
            <thead className="bg-[#e6e6e6] md:text-base xs:text-xs text-[#636262]">
              <tr>
                <th
                  className="w-1/5 pl-2 text-left cursor-pointer hover:text-[#56b3e6]"
                  onClick={() => handleSort("member_record_id")}
                >
                  Genbank ID {sortConfig?.key === "member_record_id" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="w-1/5 text-left  cursor-pointer hover:text-[#56b3e6]"
                  onClick={() => handleSort("genbank_name_curated")}
                >
                  Protein Name {sortConfig?.key === "genbank_name_curated" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="w-1/5 text-left  cursor-pointer hover:text-[#56b3e6]"
                  onClick={() => handleSort("virus_name")}
                >
                  Virus Name {sortConfig?.key === "virus_name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="w-1/5 text-left   cursor-pointer hover:text-[#56b3e6]"
                  onClick={() => handleSort("plDDT_score")}
                >
                  pLDDT Score {sortConfig?.key === "plDDT_score" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="w-1/5 text-left  cursor-pointer hover:text-[#56b3e6]"
                  onClick={() => handleSort("protein_length")}
                >
                  Length (No. of Residues) {sortConfig?.key === "protein_length" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="clusters-custom-scrollbar max-h-[50vh] overflow-y-auto">
          <table className="w-full text-slate-500 table-fixed border-collapse">
            <tbody>{clusterItems}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ClustersContainer;
