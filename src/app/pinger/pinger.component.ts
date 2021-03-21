import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilterService } from '../_services/filter.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartParams } from './chartParams';

@Component({
  selector: 'app-pinger',
  templateUrl: './pinger.component.html',
  styleUrls: ['./pinger.component.less']
})
export class PingerComponent implements OnInit, AfterViewChecked {

  @ViewChild("chart") chart: ElementRef;
  public loading: boolean = false;
  public pingerData: string[] = [];
  private pingerChartData: ChartDataSets[] = [];
  private pingerChartLabel: string[] = [];
  public chartParams: ChartParams = new ChartParams(null, null);
  public isChartReady: boolean = false;

  public pingerForm = new FormGroup({
    name: new FormControl(''),
    ip: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required)
  })

  constructor(public _filter: FilterService) { }

  ngOnInit(): void { }

  ngAfterViewChecked() {
    if (this.isChartReady) {
      this.chart.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /**Zasubskrybowanie wyników filtra 'ping' */
  public subscribePingerResults() {
    this.loading = true;

    this.pingerForm.patchValue({
      "name": "pingerFilter"
    })

    this._filter.sendFilterParameters(this.pingerForm.value)
      .subscribe((data: any) => {
        this.loading = false;
        const pingArray = [];
        for (let i = 0; i < data.Payload.pingerResults.length; i++) {
          pingArray.push(data.Payload.pingerResults[i].split('\n'));
        }
        this.prepareValuableData(pingArray);
        this.chartParams = new ChartParams(this.pingerChartData, this.pingerChartLabel);
      }, (err) => {
        this.loading = false;
        console.error("Coś poszło nie tak z pingowaniem sieci...", err);
      })
  }

  /**Usunięcie zbędnych wierszy z pliku tekstowego */
  private prepareValuableData(pingArray: Array<any>) {
    let count = 0;
    for (let i = 0; i < pingArray.length; i++) {
      for (let j = 0; j < pingArray[i].length; j++) {
        if (pingArray[i][j].charAt(0) === 'F') {
          this.pingerData.push((pingArray[i][j]));
          this.pingerChartData.push(pingArray[i][j].split('time').pop().split('ms')[0].substring(1));
          this.pingerChartLabel.push(String(count));
          count++
        }
      }
    }
    this.isChartReady = true;
  }
}