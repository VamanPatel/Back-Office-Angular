import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustDetailsComponent } from './components/cust-details/cust-details.component';
import { CustomerListingComponent } from './components/customer-listing/customer-listing.component';


const routes: Routes = [
  {
    path: 'customer-details/:id',
    component: CustDetailsComponent,
  },
  {
    path: 'list',
    component: CustomerListingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDetailRoutingModule { }
