import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransDetailsComponent } from './components/trans-details/trans-details.component';

const routes: Routes = [
  {
    path: '',
    component: TransDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule {}
