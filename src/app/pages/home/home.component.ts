import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';
import { OlympicMedalsCount } from 'src/app/core/models/OlympicMedalsCount';
import { Olympic, Olympics } from 'src/app/core/models/Olympic';
import { PieChartValue } from 'src/app/core/models/PieChartValue';
import { ToastrService } from 'ngx-toastr';
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
  olympics: Olympic[] = [];
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

 constructor(
  private olympicService: OlympicService,
  private toastrService : ToastrService
  ) {
    Object.assign(this, { OlympicService } );  
 }

  ngOnInit(): void {
    this.subscription = this.olympicService.getOlympics().subscribe({
      next: (olympic : Olympics | undefined) => {
        if(olympic === undefined) return
        this.data = this.olympicsList.map((olympic : Olympic) => {return {name: olympic.country, value: this.olympicService.getTotalNbMedals(olympic)}});
      },
      error : (error : Error) => {
        this.showErrorToast(error);
      }
    })
  }
 
  showErrorToast(error : Error) : void {
    this.toastrService.error(error.message, error.name, {
      progressBar: true,
      closeButton: true,
      progressAnimation: 'decreasing',
      timeOut: 5000,
      newestOnTop: true,
      positionClass: 'toast-bottom-full-width',
      tapToDismiss: true
    });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
  
}