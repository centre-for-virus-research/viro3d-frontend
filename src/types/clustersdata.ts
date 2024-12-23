export type ClustersData = {
    genbank_id: string;
    clusters: Cluster[];
  };

type Cluster = {
    cluster_representative: string;
    cluster_members: ClusterMember[];
}

type ClusterMember = {
    cluster_rep_id: string;
    member_record_id: string;
    protein_length: number;
    tax_id: number;
    species: string;
    plDDT_score: number;
    virus_name: string;
    family: string;
    host: string;
    genbank_name_curated: string;
    genbank_id: string;
    uniprot_id: string;
    nucleotide_accession_number: string;
}
