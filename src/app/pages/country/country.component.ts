import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ChartDetail } from 'src/app/core/models/ChartDetail';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  view: [number, number] = [700, 300];

  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Number of medals';
  timeline: boolean = true;
  chartDetails: ChartDetail[] = [];

  colorScheme: Color = {
    domain: ['#A10A28'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
