import * as soda from "@sodaviz/soda";
import { Annotation, Chart } from "@sodaviz/soda";

export interface AnnotationDatum<A extends Annotation, C extends Chart<any>> {
  a: A;
  c: C;
}

export interface CustomRenderParams extends soda.RenderParams {
  annotations: CustomAnnotation[];
  recordID: string;
  browserWidth: string;
  genome_length_bp: number;
}

export interface Viro3DRenderParams extends soda.RenderParams {
  annotations: Viro3DAnnotationGroup[];
  recordID: string;
  browserWidth: string;
  genome_length_bp: number;
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

  /**
 * The custom AnnotationGroup object that keeps track of width of a spliced gene. This will be used to update the feature browser layout to prevent spliced genes from being rendered across multiple rows.
 */
export class Viro3DAnnotationGroup extends soda.AnnotationGroup<CustomAnnotation> {
  groupWidth: number;

  constructor(conf: soda.AnnotationGroupConfig<CustomAnnotation>) {
    super(conf)
    this.id = this.annotations[0].family
    this.start = this.annotations.reduce((prev, curr) => prev.start < curr.start ? prev : curr).start;
    this.end = this.annotations.reduce((prev, curr) => prev.end > curr.end ? prev : curr).end;
    this.groupWidth = this.end - this.start;
  }
}

export class Viro3DChart extends soda.Chart<Viro3DRenderParams> {
  constructor(config: soda.ChartConfig<Viro3DRenderParams>) {
    super(config);

    this.updateLayout = function (this, params): void {
      let layout = soda.greedyGraphLayout(params.annotations, 0, alignedWidthSort);
      for (const group of params.annotations) {
        for (const ann of group.annotations) {
          layout.rowMap.set(ann.id, layout.rowMap.get(group.id)!)
        }
      }
      this.layout = layout;
    };

    function alignedWidthSort(
      verts: string[],
      graph: soda.AnnotationGraph<Viro3DAnnotationGroup>
    ) {
      verts.sort((v1: string, v2: string) => {
        if (
          graph.getAnnotationFromId(v1).groupWidth >
          graph.getAnnotationFromId(v2).groupWidth
        ) {
          return -1;
        } else {
          return 1;
        }
      });
    }
  }
}