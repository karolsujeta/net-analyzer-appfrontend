import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilterService } from '../_services/filter.service';

@Component({
  selector: 'app-traffic-analysis',
  templateUrl: './traffic-analysis.component.html',
  styleUrls: ['./traffic-analysis.component.less']
})
export class TrafficAnalysisComponent implements OnInit {

  public loading: boolean = false;
  public trafficData: string;

  public trafficForm = new FormGroup({
    name: new FormControl(''),
    amount: new FormControl('', Validators.required)
  })

  constructor(private _filter: FilterService) { }

  ngOnInit(): void { }

  /**Zasubskrybowanie wyników filtru 'tshark' */
  subscribeTrafficFilterResults() {
    this.loading = true;

    this.trafficForm.patchValue({
      "name": "trafficFilter"
    })

    this._filter.sendFilterParameters(this.trafficForm.value)
      .subscribe((trafficResults: any) => {
        this.trafficData = trafficResults;
        this.loading = false;
        console.log("Otrzymałem dane o ruchu w sieci...", trafficResults);
      }, (err) => {
        this.loading = false;
        console.error("Coś poszło nie tak z pobraniem danych o ruchu w sieci...", err);
      })
  }
}
