import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListingComponent } from './customer-listing.component';


const routes: Routes = [
  {
    path: '',
    component: CustomerListingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerListingRoutingModule { }
