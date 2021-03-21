import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterService } from '../_services/filter.service';

@Component({
  selector: 'app-tcp-analysis',
  templateUrl: './protocole-analysis.component.html',
  styleUrls: ['./protocole-analysis.component.less']
})
export class ProtocoleAnalysisComponent implements OnInit {

  public loading: boolean = false;
  public protocoleData: string[] = [];

  public protocoleForm = new FormGroup({
    name: new FormControl(''),
    protocole: new FormControl(''),
    amount: new FormControl(''),
    interface: new FormControl('')
  })

  constructor(public _filter: FilterService) { }

  ngOnInit(): void {
  }

  /**Zasubskrybowanie winików filtra */
  subscribeProtocoleFilterResults() {
    this.loading = true;

    this.protocoleForm.patchValue({
      name: "protocoleFilter"
    })

    this._filter.sendFilterParameters(this.protocoleForm.value)
      .subscribe((data: any) => {
        this.protocoleData = data.Payload.protocoleResults.split("\n");
        this.loading = false;
        console.log("Otrzymałem dane dotyczące protokołu", this.protocoleData)
      }, (err) => {
        this.loading = false;
        console.error("Coś poszło nie tak z pobraniem danych...", err);
      })
  }
}
