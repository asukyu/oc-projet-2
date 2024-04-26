import { DtrParticipation, Participation } from "./Participation";
export type Olympics = Array<DtrOlympic>;
export type DtrOlympic = IOlympic | undefined | null;

export interface IOlympic {
    id: number;
    country: string;
    participations: Participation[];
  }

  export class Olympic { 
    id : number;
    country : string;
    participations : Array<Participation>;    constructor(
        $olympic : DtrOlympic
    ) {
        this.id = $olympic!.id;
        this.country = $olympic!.country;
        this.participations = $olympic!.participations.map((value : DtrParticipation) => new Participation(value));
    }
}