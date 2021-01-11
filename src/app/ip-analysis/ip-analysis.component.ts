import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterService } from '../_services/filter.service';

@Component({
  selector: 'app-ip-analysis',
  templateUrl: './ip-analysis.component.html',
  styleUrls: ['./ip-analysis.component.less']
})
export class IpAnalysisComponent implements OnInit {

  public loading: boolean = false;
  public ipData: any;

  public ipForm = new FormGroup({
    name: new FormControl(),
    ip: new FormControl(),
    amount: new FormControl()
  })

  constructor(private _filter: FilterService) { }

  ngOnInit(): void { }

  /**Zasubskrybowanie wyników filtra 'tshark host' */
  public subscribeIpResults() {
    this.loading = true;

    this.ipForm.patchValue({
      "name": "ipFilter"
    })

    this._filter.sendFilterParameters(this.ipForm.value)
      .subscribe((data: any) => {
        this.loading = false;
        this.ipData = data;
        console.log("Otrzymałem dane o pingowaniu hosta...", this.ipData);
      }, (err) => {
        this.loading = false;
        console.error("Coś poszło nie tak z pingowaniem hosta sieci...", err);
      })
  }
}