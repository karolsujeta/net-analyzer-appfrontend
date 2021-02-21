import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterService } from '../_services/filter.service';

@Component({
  selector: 'app-nmap-analysis',
  templateUrl: './nmap-analysis.component.html',
  styleUrls: ['./nmap-analysis.component.less']
})
export class NmapAnalysisComponent implements OnInit {

  public addressPortsLoading: boolean = false;
  public connectedDevicesLoading: boolean = false;
  public traceRouteLoading: boolean = false;
  public topPortsBasicLoading: boolean = false;
  public topPortsAdvancedLoading: boolean = false;
  public addressPortsToggle: boolean = false;
  public connectedDevicesToggle: boolean = false;
  public traceRouteToggle: boolean = false;
  public topPortsBasicToggle: boolean = false;
  public topPortsAdvancedToggle: boolean = false;
  public addressPortsData: string[] = [];
  public connectedDevicesPortData: string[] = [];
  public traceRouteData: string[] = [];
  public topPortsBasicData: string[] = [];
  public topPortsAdvancedData: string[] = [];
  public isFilterPicked: boolean = false;

  public nmapForm = new FormGroup({
    name: new FormControl(''),
    ip: new FormControl(''),
    amount: new FormControl()
  })

  constructor(public _filter: FilterService) { }

  ngOnInit(): void { }

  /**Uruchamia odpowiedni widok na podstawie wybranego przez użytkownika filtra */
  public selectNmapFilter(event: any) {
    const filterType: string = event.target.value;

    switch (filterType) {
      case "addressPorts":
        this.addressPortsToggle = true;
        this.connectedDevicesToggle = false;
        this.traceRouteToggle = false;
        this.topPortsBasicToggle = false;
        this.topPortsAdvancedToggle = false;
        this.isFilterPicked = true;
        break;

      case "connectedDevices":
        this.connectedDevicesToggle = true;
        this.addressPortsToggle = false;
        this.traceRouteToggle = false;
        this.topPortsBasicToggle = false;
        this.topPortsAdvancedToggle = false;
        this.isFilterPicked = true;
        break;

      case "traceRoute":
        this.traceRouteToggle = true;
        this.connectedDevicesToggle = false;
        this.addressPortsToggle = false;
        this.topPortsBasicToggle = false;
        this.topPortsAdvancedToggle = false;
        this.isFilterPicked = true;
        break;

      case "topPortsBasic":
        this.topPortsBasicToggle = true;
        this.addressPortsToggle = false;
        this.connectedDevicesToggle = false;
        this.traceRouteToggle = false;
        this.topPortsAdvancedToggle = false;
        this.isFilterPicked = true;
        break;

      case "topPortsAdvanced":
        this.topPortsAdvancedToggle = true;
        this.topPortsBasicToggle = false;
        this.addressPortsToggle = false;
        this.connectedDevicesToggle = false;
        this.traceRouteToggle = false;
        this.isFilterPicked = true;
        break;
    }
  }


  /**Sprawdza otwarte porty wskazanego hosta lub adresu IP */
  public checkAddressPorts() {
    this.addressPortsLoading = true;

    this.nmapForm.patchValue({
      "name": "addressPorts"
    })

    this._filter.sendFilterParameters(this.nmapForm.value)
      .subscribe((res: any) => {
        this.addressPortsLoading = false;
        this.addressPortsData = res.Payload.addressPortsResults.split("\n");
        console.log("Pobrałem informacje o otwartych portach hosta", res);
      }, (err) => {
        this.addressPortsLoading = false;
        console.error("Coś poszło nie tak z pobraniem informacji o otwartych portach hosta", err);
      })

  }

  /**Sprawdza otwarte porty urządzeń podłączonych do routera */
  public checkConnectedDevicesPorts() {
    this.connectedDevicesLoading = true;

    this.nmapForm.patchValue({
      "name": "connectedDevicesPorts"
    })

    this._filter.sendFilterParameters(this.nmapForm.value)
      .subscribe((res: any) => {
        this.connectedDevicesLoading = false;
        this.connectedDevicesPortData = res.Payload.connectedDevicesPortsResults.split("\n");
        console.log("Pobrałem informacje o otwartych portach podłączonych do routera urządzeń", res);
      }, (err) => {
        this.connectedDevicesLoading = false;
        console.error("Coś poszło nie tak z pobraniem informacji o portach podłączonych do routera urządzeń", err);
      })
  }

  /**Sprawdza trace-route danego hosta/IP */
  public checkTraceRoute() {
    this.traceRouteLoading = true;

    this.nmapForm.patchValue({
      "name": "traceRoute"
    })

    this._filter.sendFilterParameters(this.nmapForm.value)
      .subscribe((res: any) => {
        this.traceRouteLoading = false;
        this.traceRouteData = res.Payload.traceRouteResults.split("\n");
        console.log("Pobrałem informacje o trace-route danego hosta/IP", res);
      }, (err) => {
        this.traceRouteLoading = false;
        console.error("Coś poszło nie tak z pobraniem informacji o trace-route danego hosta/IP", err);
      })
  }

  /**Sprawdza top-ports(basic) danego hosta/IP */
  public checkTopPortsBasic() {
    this.topPortsBasicLoading = true;

    this.nmapForm.patchValue({
      "name": "topPortsBasic"
    })

    this._filter.sendFilterParameters(this.nmapForm.value)
      .subscribe((res: any) => {
        this.topPortsBasicLoading = false;
        this.topPortsBasicData = res.Payload.topPortsBasicResults.split("\n");
        console.log("Pobrałem informacje o top-portach danego hosta/IP", res);
      }, (err) => {
        this.topPortsBasicLoading = false;
        console.error("Coś poszło nie tak z pobraniem informacji o top-portach danego hosta/IP", err);
      })
  }

  /**Sprawdza top=ports(advanced) danego hosta/IP */
  public checkTopPortsAdvanced() {
    this.topPortsAdvancedLoading = true;

    this.nmapForm.patchValue({
      "name": "topPortsAdvanced"
    })

    this._filter.sendFilterParameters(this.nmapForm.value)
      .subscribe((res: any) => {
        this.topPortsAdvancedLoading = false;
        this.topPortsAdvancedData = res.Payload.topPortsAdvancedResults.split("\n");
        console.log("Pobrałem informacje o top-portach danego hosta/IP", res);
      }, (err) => {
        this.topPortsAdvancedLoading = false;
        console.error("Coś poszło nie tak z pobraniem informacji o top-portach danego hosta/IP", err);
      })
  }
}
