import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FilterModel } from '../_models/filter.model';


@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private backendApi: string = 'http://localhost:8000';
  public availableFilters: { id: number, name: string, route: string }[] =
    [
      { id: 0, name: 'Analiza ruchu', route: 'traffic' },
      { id: 1, name: 'Pingowanie sieci', route: 'pinger' },
      { id: 2, name: 'Analiza portu TCP', route: 'tcp' },
      { id: 3, name: 'Śledzenie ruchu konkretnego adresu IP', route: 'ip' },
    ]

  constructor(private _http: HttpClient) { }

  /**Wysłanie danych o filtrze i jego parametrach do backendu */
  sendFilterParameters(filter: FilterModel) {
    const filterBody = new FilterModel();
    filterBody.parseFromObject(filter);

    return this._http.post(this.backendApi + '/readfilterparams',
      new HttpParams({
        fromObject: {
          "name": filterBody.name,
          "ip": filterBody.ip,
          "port": filterBody.port,
          "amount": filterBody.amount
        }
      }))
  }
}
