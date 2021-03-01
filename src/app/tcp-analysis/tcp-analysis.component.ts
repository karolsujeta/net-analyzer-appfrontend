import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterService } from '../_services/filter.service';

@Component({
  selector: 'app-tcp-analysis',
  templateUrl: './tcp-analysis.component.html',
  styleUrls: ['./tcp-analysis.component.less']
})
export class TcpAnalysisComponent implements OnInit {

  public loading: boolean = false;
  public tcpData: string[] = [];

  public tcpForm = new FormGroup({
    name: new FormControl(''),
    port: new FormControl(''),
    protocole: new FormControl(''),
    amount: new FormControl(''),
    interface: new FormControl('')
  })

  constructor(public _filter: FilterService) { }

  ngOnInit(): void {
  }

  /**Zasubskrybowanie winików filtra 'tshark tcp.port' */
  subscribeTcpFilterResults() {
    this.loading = true;

    this.tcpForm.patchValue({
      name: "tcpFilter"
    })

    this._filter.sendFilterParameters(this.tcpForm.value)
      .subscribe((tcpResults: any) => {
        this.tcpData = tcpResults.Payload.tcpResults.split("\n");
        this.loading = false;
        console.log("Otrzymałem dane dotyczące ruchu portu TCP", tcpResults)
      }, (err) => {
        this.loading = false;
        console.error("Coś poszło nie tak z pobraniem danych o ruchu na porcie TCP w sieci...", err);
      })
  }
}
