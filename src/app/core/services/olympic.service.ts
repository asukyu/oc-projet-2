import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, map, filter } from 'rxjs/operators';
import { Olympic, Olympics } from '../models/Olympic';

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

  getMedalsCountByOlympicId(id: number, olympics: Olympic[]): number {
    var medalsCount = 0;
 //   const country = this.getOlympicById(id, olympics);
 //   if (country != null) {
      // loop for each participation
//      country.participations.forEach(p => medalsCount += p.medalsCount);
 //   }
    return medalsCount;
  }
/*  getOlympicById(id: number, olympics: Olympic[]):Observable<Olympic>
    {
      return this.olympics$.asObservable().pipe(
        filter(value => Array.isArray(value) && value.length > 0),
        map( olympics => {
          let filtered = olympics.filter( olympic => olympic.id == id );
          if (filtered.length != 1) {
            throw new Error('Country not found')
          }
          return filtered[0];
        })
      );
  } */
}
