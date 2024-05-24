import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, map, filter } from 'rxjs/operators';
import { Olympic, Olympics } from '../models/Olympic';
import { Participation } from '../models/Participation';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympics | undefined>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(undefined);
        return caught;
      })
    );
  }

  getOlympics(): Observable<Olympics | undefined> {
    return this.olympics$.asObservable();
  }

  public getTotalNbMedals(olympic: Olympic) : number {
    if (olympic.participations.length === 0) return 0
    return olympic.participations.map((participation) => participation.medalsCount).reduce((a,b) => a+b);
  }

  getNumberOfJos(olympics: Olympic[]): number {
    var jos: Participation[] = [];
    // one loop for each olympic and inside a loop for each participation
    olympics.forEach(o => o.participations.forEach(p => {
      var participation = this.getParticipationById(p.id, jos);
      // to avoid duplicate values, this participation p is pushed inside jos only if it doesn't exist in jos
      if (!participation) {
        jos.push(p);
      }
    }));
    return jos.length;
  }  
  
  getNumberOfCountries(olympics: Olympic[]): number {
    var olympicList: Olympic[] = [];
    olympics.forEach(ol => {
      var olympic = this.getOlympicById(ol.id, olympicList);
      if (!olympic) {
        olympicList.push(ol);
      }
    });
    return olympicList.length;
  }

  getParticipationById(id: number, participations: Participation[]): Participation | undefined {
    var participation = undefined;
    if (participations) {
      participation = participations.find(p => p.id == id);
    }
    return participation;
  }  
  
  getMedalsCountByOlympicId(id: number, olympics: Olympic[]): number {
    var medalsCount = 0;
    var country = this.getOlympicById(id, olympics);
    if (country) {
      // loop for each participation
      country.participations.forEach(p => medalsCount += p.medalsCount);
    }
    return medalsCount;
  }

  getOlympicById(id: number, olympics: Olympic[]): Olympic | undefined {
    var olympic = undefined;
    if (olympics.length > 0) {
      olympic = olympics.find(o => o.id == id);
    }
    return olympic;
  }

  getOlympicByCountry(country: string, olympics: Olympic[]): Olympic | undefined {
    var olympic = undefined;
    if (olympics.length > 0) {
      olympic = olympics.find(o => o.country == country);
    }
    return olympic;
  }
}
