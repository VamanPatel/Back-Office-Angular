import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogsDetailsComponent } from './components/logs-details/logs-details.component';


const routes: Routes = [
 {
     path: '',
     component: LogsDetailsComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
