import { ProteinStructure } from "./proteinstructure";

export type ProteinData = {
  virus_name: string;
  count: number;
  protein_structures: ProteinStructure[];
  detail?: string;
};
