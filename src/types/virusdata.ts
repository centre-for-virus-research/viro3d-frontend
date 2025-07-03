export type VirusData = {
  search_term: string;
  count: number;
  viruses: {
    _id: string;
  }[];
  detail?: string;
};
