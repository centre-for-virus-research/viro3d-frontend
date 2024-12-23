import React, { useState, useTransition } from "react";
import TabButton from "../components/ui/TabButton";
import { isMobile } from "react-device-detect";

const About: React.FC = () => {
  const TAB_DATA = [
    {
      title: "Data Collection and Structure Prediction",
      id: "Data Collection and Structure Prediction",
      content: (
        <p className="xs:text-xl lg:text-2xl text-[#6d828d]">
          Viro3D’s dataset includes 6,721 GenBank nucleotide sequences from
          4,407 virus isolates (representing 3,106 virus species). This
          constitutes all viruses with invertebrate and/or vertebrate host
          annotations from the ICTV Virus Metadata Resource VMR MSL38 v2 (
          <a
            href="https://academic.oup.com/nar/article/46/D1/D708/4508876"
            target="_blank"
            rel="noreferrer"
            className=" font-semibold text-[#4a95c0] hover:text-[#50bde5] underline"
          >
            Lefkowitz et al. 2018
          </a>
          ). From these genomes, 71,269 protein records were extracted,
          including 4,070 mature peptides from polyproteins and 11,786 protein
          regions from larger proteins, ensuring broad and detailed
          representation.
        </p>
      ),
    },

    {
      title: "Modeling Approaches",
      id: "Modeling Approaches",
      content: (
        <div className="flex flex-col xs:text-xl lg:text-2xl text-[#6d828d] justify-evenly gap-8">
          <h2>
            To predict protein structures, we applied two cutting-edge
            computational methods to the same sequence set:
          </h2>
          <dl className="flex flex-col gap-4">
            <dt className="text-[#4a95c0] font-bold">
              1. AlphaFold2-ColabFold:{" "}
            </dt>
            <dd className="">
              {" "}
              We generated multiple sequence alignments (MSAs) using MMseqs2 (
              <a
                href="https://www.nature.com/articles/nbt.3988"
                target="_blank"
                rel="noreferrer"
                className=" font-semibold text-[#4a95c0] hover:text-[#50bde5] underline"
              >
                Steinegger and Soeding 2017
              </a>
              ) run against diverse databases including colabfold_envdb_202108,
              pdb100_230517 and uniref30_2302. These MSAs were used as input to
              LocalColabFold v.1.5.2 (
              <a
                href="https://www.nature.com/articles/s41592-022-01488-1"
                target="_blank"
                rel="noreferrer"
                className=" font-semibold text-[#4a95c0] hover:text-[#50bde5] underline"
              >
                Mirdita et al. 2022
              </a>
              ,{" "}
              <a
                href="https://www.nature.com/articles/s41586-021-03819-2"
                target="_blank"
                rel="noreferrer"
                className=" font-semibold text-[#4a95c0] hover:text-[#50bde5] underline"
              >
                Jumper et al. 2021
              </a>
              ) allowing structural prediction for 85,162 protein sequences. For
              each sequence, five models were produced, and the highest-ranked
              structure was refined using Amber force field relaxation (
              <a
                href="https://pubs.acs.org/doi/10.1021/acs.jcim.3c01153"
                target="_blank"
                rel="noreferrer"
                className=" font-semibold text-[#4a95c0] hover:text-[#50bde5] underline"
              >
                Case et al. 2023
              </a>
              ).{" "}
            </dd>
            <dt className="text-[#4a95c0] font-bold">2. ESMFold </dt>
            <dd>
              {" "}
              Structures were also predicted with ESMFold, an alternative
              approach built on the protein language model ESM-2 v.1.0.3 ({" "}
              <a
                href="https://www.science.org/doi/10.1126/science.ade2574"
                target="_blank"
                rel="noreferrer"
                className=" font-semibold text-[#4a95c0] hover:text-[#50bde5] underline"
              >
                Lin et al. 2023
              </a>
              ). This resulted in 84,964 structural predictions, which were also
              refined by relaxation using the Amber force field.{" "}
            </dd>
          </dl>
          <p>
            This dual modelling approach maximized the number of accurate
            predictions and yielded a final set of 85,162 reliable protein
            structures. The Viro3D database contains all AlphaFold2-ColabFold
            models and the ESMFold models that achieved higher confidence than
            their AlphaFold2-ColabFold counterparts.{" "}
          </p>
        </div>
      ),
    },

    {
      title: "Web resource implementation",
      id: "Web resource implementation",
      content: (
        <div className="flex flex-col xs:text-xl lg:text-2xl text-[#6d828d] justify-evenly gap-8">
          <dl className="flex flex-col gap-4">
            <dt className="text-3xl text-[#4a95c0] font-bold">Frontend</dt>
            <dd className="">
              {" "}
              The basis of Viro3D's frontend was developed with{" "}
              <a
                href="https://github.com/facebook/react"
                target="_blank"
                rel="noreferrer"
                className=" font-semibold text-[#4a95c0] hover:text-[#50bde5] underline"
              >
                React
              </a>{" "}
              and{" "}
              <a
                href="https://github.com/microsoft/TypeScript"
                target="_blank"
                rel="noreferrer"
                className=" font-semibold text-[#4a95c0] hover:text-[#50bde5] underline"
              >
                Typescript
              </a>
              . Some extra libraries were also used for certain key features:{" "}
            </dd>
            <p>
              {" "}
              <a
                href="https://github.com/molstar/pdbe-molstar"
                target="_blank"
                rel="noreferrer"
                className=" font-semibold text-[#4a95c0] hover:text-[#50bde5] underline"
              >
                PDBE-Molstar Molecular Viewer
              </a>{" "}
              provides the interactive 3D render of our protein structures
            </p>
            <p>
              <a
                href="https://github.com/sodaviz"
                target="_blank"
                rel="noreferrer"
                className=" font-semibold text-[#4a95c0] hover:text-[#50bde5] underline"
              >
                Sodaviz
              </a>{" "}
              is a Genomic Annotation Visualizer. We use it to display the
              genome of each virus in our database and allow the user to browse
              protein structures by clicking on the gene it's encoded by.
            </p>
            <p>
              <a
                href="https://github.com/konvajs/konva"
                target="_blank"
                rel="noreferrer"
                className=" font-semibold text-[#4a95c0] hover:text-[#50bde5] underline"
              >
                KonvaJS
              </a>{" "}
              is an HTML5 Canvas JavaScript framework. We used it to construct
              the interactive map, seen on the homepage.
            </p>
            <dt className="text-3xl text-[#4a95c0] font-bold mt-8">API</dt>
            <dd className="">
              {" "}
              Our API was developed using{" "}
              <a
                href="https://github.com/fastapi/fastapi"
                target="_blank"
                rel="noreferrer"
                className=" font-semibold text-[#4a95c0] hover:text-[#50bde5] underline"
              >
                FastAPI
              </a>
              , a Python-based framework.
            </dd>
            <p>
              {" "}
              The{" "}
              <a
                href="https://github.com/biopython/biopython"
                target="_blank"
                rel="noreferrer"
                className=" font-semibold text-[#4a95c0] hover:text-[#50bde5] underline"
              >
                Biopython
              </a>{" "}
              library was also incorporated. We took advantage of its NCBI
              Blastp command-line wrapper to provide the searching by protein
              structure sequence feature.
            </p>
            <dt className="text-3xl text-[#4a95c0] font-bold mt-8">Database</dt>
            <dd className="">
              {" "}
              We used a self-hosted{" "}
              <a
                href="https://github.com/mongodb/mongo"
                target="_blank"
                rel="noreferrer"
                className=" font-semibold text-[#4a95c0] hover:text-[#50bde5] underline"
              >
                MongoDB
              </a>{" "}
              Community Edition database. This is a document-oriented,
              non-relational database program.{" "}
            </dd>
          </dl>
        </div>
      ),
    },
    {
      title: "Limitations and Feedback",
      id: "Limitations and Feedback",
      content: (
        <div className="flex flex-col gap-4 xs:text-xl lg:text-2xl text-[#6d828d]">
          <p>
            We regard Viro3D as a work in progress. The 4,407 viruses included
            in phase one represent only a fraction of the virosphere and do not
            include any viruses of plants, bacteria or archaea. We anticipate
            expanding the Viro3D in the coming months and years. The structural
            models are derived from sequence annotations, which are sometimes
            incorrect and incomplete, and can come with outdated or
            non-informative labels. We have done our best to eliminate these
            problems but, inevitably, some remain. It is important to remember
            that the structures are predictions and need to be interpreted with
            care. Each model comes with confidence metrics (pLDDT and pTM) and
            are shown in the molecular viewer with residues colour-coded by
            pLDDT score. We welcome comments, feedback and suggestions. Please
            let us know how to improve Viro3D:
          </p>
          <a
            href="mailto:cvr-webresource-support@lists.cent.gla.ac.uk"
            target="_blank"
            rel="noreferrer"
            className=" hover:text-[#50bde5] underline"
          >
            cvr-webresource-support@lists.cent.gla.ac.uk
          </a>
          <p className="xs:text-xl lg:text-2xl text-[#6d828d]">
            If you find this resource valuable and would like to support Viro3D,
            please consider sending a letter of support, on your institution’s
            letterhead, to the e mail address above. Your endorsement will
            strengthen our funding applications and allow us to enhance and
            expand Viro3D.
          </p>
        </div>
      ),
    },
    {
      title: "Funding",
      id: "Funding",
      content: (
        <p className="xs:text-xl lg:text-2xl text-[#6d828d]">
          Viro3D was funded by UK Medical Research Council (MRC) support to the
          MRC-University of Glasgow Centre for Virus Research (CVR Integrative
          Viral Genomics and Bioinformatics Platform: MC_UU_00034/5, CVR
          Preparedness Platform: MC_UU_00034/6 and CVR Structure-to-Function of
          Virions Programme: MC_UU_00034/1). This research is jointly funded by
          the MRC and the Foreign Commonwealth and Development Office (FCDO)
          under the MRC/FCDO Concordat agreement. Additional support from the
          Wellcome Trust and Royal Society (Sir Henry Dale Fellowship:
          107653/Z/15/Z), Medical Research Foundation (Emerging Leaders Prize)
          and the Darwin Trust of Edinburgh. We thank Prof. Emma Thomson and
          Prof. Massimo Palmarini for their support of the Viro3D project.
        </p>
      ),
    },
  ];

  const [tab, setTab] = useState<string>(
    "Data Collection and Structure Prediction"
  );
  const [, startTransition] = useTransition();

  const handeTabChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="" id="/">
      <div className="xs:mt-24 xs:mb-12 lg:mt-32 xs:mx-4 lg:mx-18 xl:mx-36 min-h-screen xs:px-8 lg:px-24 py-24 bg-[#f2f2f2] border drop-shadow-md rounded border-slate-300">
        <div className="mt-4 md:mt-0 flex flex-col gap-8 h-full">
          <h1 className="xs:text-3xl lg:text-6xl text-[#4a95c0] font-bold  mb-8">
            About
          </h1>
          <p className="xs:text-xl lg:text-3xl text-[#6d828d]">
            Viro3D is a comprehensive, searchable and browsable database of
            viral protein structure predictions, containing over 85,000
            structural models from more than 4,400 human and animal viruses. The
            database is designed to support fundamental research into viral
            protein structure, function, and evolution, as well as to explore
            the contribution of viruses to overall protein structure diversity.
            For a detailed technical description and an example of what can be
            discovered using Viro3D please see our pre-print:
          </p>
          <a
            href="https://www.biorxiv.org/content/10.1101/2024.12.19.629443v1"
            target="_blank"
            rel="noreferrer"
            className={`xs:text-xl lg:text-3xl text-[#4a95c0] hover:text-[#50bde5] xs:text-center md:text-left hover:underline ${isMobile ? "underline" : ""} font-semibold`}
          >
            Viro3D: a comprehensive database of virus protein structure
            predictions
          </a>
          <div className="flex xs:text-lg lg:text-xl xs:flex-col xs:gap-4 lg:flex-row justify-evenly mt-8 mb-8">
            <TabButton
              selectTab={() =>
                handeTabChange("Data Collection and Structure Prediction")
              }
              active={tab === "Data Collection and Structure Prediction"}
            >
              Data Collection and Structure Prediction
            </TabButton>
            <TabButton
              selectTab={() => handeTabChange("Modeling Approaches")}
              active={tab === "Modeling Approaches"}
            >
              Modeling Approaches
            </TabButton>
            <TabButton
              selectTab={() => handeTabChange("Web resource implementation")}
              active={tab === "Web resource implementation"}
            >
              Web Resource Implementation
            </TabButton>
            <TabButton
              selectTab={() => handeTabChange("Limitations and Feedback")}
              active={tab === "Limitations and Feedback"}
            >
              Limitations and Feedback
            </TabButton>
            <TabButton
              selectTab={() => handeTabChange("Funding")}
              active={tab === "Funding"}
            >
              Funding
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA?.find((t) => t.id === tab)?.content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
