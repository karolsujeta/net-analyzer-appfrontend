import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilterService } from '../_services/filter.service';

@Component({
  selector: 'app-pinger',
  templateUrl: './pinger.component.html',
  styleUrls: ['./pinger.component.less']
})
export class PingerComponent implements OnInit {

  public loading: boolean = false;
  public pingerData: any;
  
  public pingerForm = new FormGroup({
    name: new FormControl(''),
    ip: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required)
  })

  constructor(private _filter: FilterService) { }

  ngOnInit(): void { }

  /**Zasubskrybowanie wyników filtra 'ping' */
  public subscribePingerResults() {
    this.loading = true;
    
    this.pingerForm.patchValue({
      "name": "pingerFilter"
    })
    
    this._filter.sendFilterParameters(this.pingerForm.value)
      .subscribe((data: any) => {
        this.loading = false;
        this.pingerData = data;
        console.log("Otrzymałem dane o pingowaniu...", this.pingerData);
      }, (err) => {
        this.loading = false;
        console.error("Coś poszło nie tak z pingowaniem sieci...", err);
      })
  }
}
