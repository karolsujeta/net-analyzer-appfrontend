import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from './_services/filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Network Analyzer';
  public loading: boolean = false;
  public route: string;
  public configResults: string[] = [];
  public nmapResults: string[] = [];

  constructor(
    public _filter: FilterService,
    private _router: Router) {

    this._router.events.subscribe(() => {
      this.route = this._router.url;
    })
  }

  ngOnInit() {
    this.subscribeNetworkInfo();
  }
  
  /**Przeniesienie do szczegółów wybranego filtru */
  openFilter(route: string) {
    this._router.navigate([route]);
  }

  /**Zasubskrybowanie podstawowych informacji o parametrach sieciowych */
  subscribeNetworkInfo() {
    this.loading = true;
    this._filter.getNetworkInfo()
      .subscribe((info: any) => {
        this.nmapResults = info.Payload.nmapResults.split('\n');
        this.configResults = info.Payload.configResults.split('\n');
        this._filter.convertInterfacesList(info.Payload.interfacesResults.split('\n'));
        this.loading = false;
        console.log("NmapResults:", this.nmapResults, "interfacesResults:", this._filter.networkInterfaces, "configResults:", this.configResults);
      }, (err) => {
        this.loading = false;
        console.error("Coś poszło nie tak z zasubskrybowaniem informacji o parametrach sieciowych...", err);
      })
  }
}
