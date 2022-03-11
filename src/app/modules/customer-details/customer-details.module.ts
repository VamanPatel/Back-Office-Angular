import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDetailRoutingModule } from './customer-detail-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CustDetailsComponent } from './components/cust-details/cust-details.component';
import { CustomerListingComponent } from './components/customer-listing/customer-listing.component';
import { FormsModule } from '@angular/forms';
import { LoadingDirective } from '../../loading/loading.directive';
@NgModule({
   declarations: [
      CustDetailsComponent,
      CustomerListingComponent,
      LoadingDirective
   ],
   imports: [
      CommonModule,
      NgbModule,
      CustomerDetailRoutingModule,
      FormsModule
   ],
})
export class CustomerDetailsModule {



}
