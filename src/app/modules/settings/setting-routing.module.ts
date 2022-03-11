import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingDetailsComponent } from './components/setting-details/setting-details.component';


const routes: Routes = [
 {
     path: '',
     component: SettingDetailsComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
