import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { IpAnalysisComponent } from './ip-analysis/ip-analysis.component';
import { NmapAnalysisComponent } from './nmap-analysis/nmap-analysis.component';
import { PingerComponent } from './pinger/pinger.component';
import { TcpAnalysisComponent } from './tcp-analysis/tcp-analysis.component';
import { TrafficAnalysisComponent } from './traffic-analysis/traffic-analysis.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'traffic', component: TrafficAnalysisComponent },
  { path: 'pinger', component: PingerComponent },
  { path: 'tcp', component: TcpAnalysisComponent },
  { path: 'ip', component: IpAnalysisComponent },
  { path: 'nmap', component: NmapAnalysisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
