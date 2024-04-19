import { Participation } from "./Participation";
export type Olympics = Array<Olympic>;
export interface Olympic {
    id: number;
    country: string;
    participations: Participation[];
  }