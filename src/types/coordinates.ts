import * as soda from "@sodaviz/soda";

export type Coordinates = {
  qualifier: string;
  segments: Segment[];
};

type Segment = {
  nt_acc: string;
  coordinates: CustomAnnotation[];
  genome_length_bp: number;
  isolate_designation: string;
  segment: string;
};

interface CustomAnnotation extends soda.Annotation {
  family: string;
  gene_name: string;
  virus_name: string;
  pept_cat: string;
  nt_acc: string;
  segment: string;
  join: string;
  strand: soda.Orientation;
}
