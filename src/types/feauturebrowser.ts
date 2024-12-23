import * as soda from "@sodaviz/soda";
import { Annotation, Chart } from "@sodaviz/soda";

export interface AnnotationDatum<A extends Annotation, C extends Chart<any>> {
  a: A;
  c: C;
}

export interface CustomAnnotation extends soda.Annotation {
  family: string;
  gene_name: string;
  virus_name: string;
  pept_cat: string;
  nt_acc: string;
  segment: string;
  join: string;
  strand: soda.Orientation;
}

export interface CustomRenderParams extends soda.RenderParams {
  annotations: CustomAnnotation[];
  recordID: string;
  browserWidth: string;
  genome_length_bp: number;
}
