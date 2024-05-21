import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';
import { OlympicMedalsCount } from 'src/app/core/models/OlympicMedalsCount';
import { Olympic, Olympics } from 'src/app/core/models/Olympic';
import { PieChartValue } from 'src/app/core/models/PieChartValue';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public data!: Array<PieChartValue>;
  public olympics$ = new BehaviorSubject<Olympic | undefined>(undefined);
  public olympicsList!: Array<Olympic>;
  id!: number;
  country!: string;
  medalsCount!: number;
  olympics!: Array<Olympic>;
  Participation: any[] | undefined;
  single: any[] | undefined;
  view: [number, number] = window.innerWidth < 800 ? [window.innerWidth,window.innerWidth] : [window.innerWidth/3,window.innerWidth/3];
  subscription: Subscription | undefined;
  olympicMedalsCounts: OlympicMedalsCount[] = [];
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string | any = 'below';
  tooltipDisabled : boolean = true;
  maxLabelLength : number = 22;
  faMedalIcon = faMedal;
  joLabel: string = 'Number of JOs';
  joCount: number = 0;
  countriesLabel: string = 'Number of countries';
  countriesCount: number = 0;

 constructor(
  private olympicService: OlympicService,
  ) {
    Object.assign(this, { OlympicService } );  
 }

  ngOnInit(): void {
    this.subscription = this.olympicService.getOlympics().subscribe({
      next: (olympics : Olympics | undefined) => {
        if(olympics === undefined) return;
        this.olympics = olympics.map((olympic) => new Olympic(olympic))
        this.data = this.olympics.map((olympic : Olympic) => {return {name: olympic.country, value: this.olympicService.getTotalNbMedals(olympic)}});
      },
      error : (error : Error) => {
      }
    })
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
  
}