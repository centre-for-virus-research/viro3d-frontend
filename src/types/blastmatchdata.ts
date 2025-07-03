import { ProteinStructure } from "./proteinstructure";

export type BlastMatchData = {
  matches: Match[];
  sequence: string;
  detail?: string;
};

type Match = {
  evalue: number;
  gaps: number;
  positives: number;
  protein_structure: ProteinStructure;
  score: number;
  structure_id: string;
};
