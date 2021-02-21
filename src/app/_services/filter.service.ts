import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FilterModel } from '../_models/filter.model';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public networkInterfaces: string[] = [];
  public availableFilters: { id: number, name: string, route: string }[] =
    [
      { id: 0, name: 'Analiza ruchu', route: 'traffic' },
      { id: 1, name: 'Pingowanie sieci', route: 'pinger' },
      { id: 2, name: 'Analiza portu TCP', route: 'tcp' },
      { id: 3, name: 'Śledzenie ruchu konkretnego adresu IP', route: 'ip' },
      { id: 4, name: 'Sprawdzanie otwarych portów i usług', route: 'nmap' }
    ]

  constructor(private _http: HttpClient) { }

  /**Wysłanie danych o filtrze i jego parametrach do backendu */
  sendFilterParameters(filter: FilterModel) {
    const filterBody = new FilterModel();
    filterBody.parseFromObject(filter);

    return this._http.post(`${API_URL}/readfilterparams`,
      new HttpParams({
        fromObject: {
          "name": filterBody.name,
          "ip": filterBody.ip,
          "port": filterBody.port,
          "protocole": filterBody.protocole,
          "amount": filterBody.amount,
          "interface": filterBody.interface
        }
      }))
  }

  /**Pobranie podstawowych informacji o parametrach sieciowych */
  getNetworkInfo() {
    return this._http.get(`${API_URL}/networkinfo`)
  }

  /**Zapisanie danych do pliku na dysku */
  public saveResultsToFile(results: Array<string>, name: string) {
    const blob = new Blob(results, { type: 'application/json' });
    saveAs(blob, `${name}_results.json`);
  }

  /**Usuwa zbędne znaki w dla listy pobranych urządzeń */
  public convertInterfacesList(interfaces: string[]) {
    for (let i = 0; i < interfaces.length; i++) {
      const interfaceName = interfaces[i].split('(').pop().split(')')[0];
      this.networkInterfaces.push(interfaceName);
    }
  }
}