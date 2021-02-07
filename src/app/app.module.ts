import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PingerComponent } from './pinger/pinger.component';
import { IpAnalysisComponent } from './ip-analysis/ip-analysis.component';
import { TcpAnalysisComponent } from './tcp-analysis/tcp-analysis.component';
import { TrafficAnalysisComponent } from './traffic-analysis/traffic-analysis.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    PingerComponent,
    IpAnalysisComponent,
    TcpAnalysisComponent,
    TrafficAnalysisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
