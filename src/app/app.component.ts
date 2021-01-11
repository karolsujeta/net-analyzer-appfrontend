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
  public route: string;

  constructor(
    public _filter: FilterService,
    private _router: Router) {

    this._router.events.subscribe(() => {
      this.route = this._router.url;
    })
  }

  /**Przeniesienie do szczegółów wybranego filtru */
  openFilter(route: string) {
    this._router.navigate([route]);
  }
}
