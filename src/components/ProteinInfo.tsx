import React, { useEffect } from "react";
import Tooltip from "./ui/Tooltip";
import { ProteinStructure } from "../types/proteinstructure";

type ProteinInfoProps = {
  proteinInfo: ProteinStructure;
  defaultModel: string;
};

const ProteinInfo: React.FC<ProteinInfoProps> = ({
  proteinInfo,
  defaultModel,
}) => {
  const autoScroll = () => {
    const cont = document.getElementById("segment-container");
    const element = document.getElementById(proteinInfo?.nt_acc);

    if (!cont || !element) return;

    const rect = element.getBoundingClientRect();
    const containerRect = cont.getBoundingClientRect();

    cont.scrollTo({
      top: 0,
      left: rect.left - containerRect.left + cont.scrollLeft - 500,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    autoScroll();
  }, [proteinInfo]);

  return !proteinInfo ? (
    <>Loading...</>
  ) : (
    <>
      <div className="table-container xs:my-8  xs:mx-8 sm:ml-8">
        <div className="heading-container relative xs:text-2xl 2xl:text-4xl  min-h-[10vh]">
          {proteinInfo["genbank_name_curated"].length < 70 ? (
            <h1 className="hidden sm:block mb-6  text-slate-500 ">
              {proteinInfo["genbank_name_curated"]}
            </h1>
          ) : (
            <Tooltip text={proteinInfo["genbank_name_curated"]} />
          )}
          <div>
            {defaultModel === "CF" ? (
              <div className="flex flex-col gap-4">
                <div className=" flex flex-row ">
                  <dt className="font-light basis-2/3 text-slate-500  ">
                    ColabFold pLDDT Score:
                  </dt>
                  <dd className="font-extralight basis-1/3 text-slate-500  ">
                    {proteinInfo["colabfold_json_pLDDT"]}
                  </dd>
                </div>
                <div className=" flex flex-row">
                  <dt className="font-light basis-2/3 text-slate-500  ">
                    pTM Score:
                  </dt>
                  <dd className="font-extralight basis-1/3 text-slate-500  ">
                    {proteinInfo["colabfold_json_pTM"]}
                  </dd>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className=" flex flex-row">
                  <dt className="font-light basis-2/3 text-slate-500  ">
                    ESMFold pLDDT Score:
                  </dt>
                  <dd className="font-extralight basis-1/3 text-slate-500  ">
                    {proteinInfo["esmfold_log_pLDDT"]}
                  </dd>
                </div>
                <div className=" flex flex-row">
                  <dt className="font-light basis-2/3 text-slate-500  ">
                    pTM Score:
                  </dt>
                  <dd className="font-extralight basis-1/3 text-slate-500  ">
                    {proteinInfo["esmfold_log_pTM"]}
                  </dd>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="body-container xs:text-base lg:text-xl 2xl:text-2xl text-slate-500">
          <hr className=" h-0.5 my-8 bg-slate-500"></hr>
          <dl className="grid grid-cols-2 xs:gap-2 2xl:gap-4">
            <dt className="font-extralight">Uniprot ID:</dt>
            <dd className="underline">
              <a
                className="hover:text-[#56b3e6]"
                target="blank"
                rel="noopener noreferrer"
                href={`https://www.uniprot.org/uniprotkb/${proteinInfo["uniprot_id"]}/entry`}
              >
                {proteinInfo["uniprot_id"]}
              </a>
            </dd>
            <dt className="font-extralight">Genbank ID:</dt>
            <dd className="underline">
              <a
                className="hover:text-[#56b3e6]"
                target="blank"
                rel="noopener noreferrer"
                href={`https://www.ncbi.nlm.nih.gov/protein/${proteinInfo["genbank_id"]}`}
              >
                {proteinInfo["genbank_id"]}
              </a>
            </dd>
            <dt className="font-extralight">Tax ID:</dt>
            <dd className="underline">
              <a
                className="hover:text-[#56b3e6]"
                target="blank"
                rel="noopener noreferrer"
                href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id= ${proteinInfo["taxid"]}`}
              >
                {proteinInfo["taxid"]}
              </a>
            </dd>
            <dt className="font-extralight">Nucleotide Accession Number:</dt>
            <dd className="underline">
              <a
                className="hover:text-[#56b3e6]"
                target="blank"
                rel="noopener noreferrer"
                href={`https://www.ncbi.nlm.nih.gov/nuccore/${proteinInfo["nt_acc"]}`}
              >
                {proteinInfo["nt_acc"]}
              </a>
            </dd>
            <dt className="font-extralight">Virus Name:</dt>
            <dd>{proteinInfo.Virus_name_s_}</dd>
            <dt className="font-extralight">Species:</dt>
            <dd>{proteinInfo["Species"]}</dd>
            <dt className="font-extralight">Family:</dt>
            <dd>{proteinInfo["Family"]}</dd>
            {proteinInfo["host"] !== "" ? (
              <>
                <dt className="font-extralight">Host:</dt>
                <dd>{proteinInfo["host"]}</dd>
              </>
            ) : null}
            <dt className="font-extralight">Length (No. of Residues):</dt>
            <dd>{proteinInfo["protlen"]}</dd>
          </dl>
        </div>
      </div>
    </>
  );
};

export default ProteinInfo;
