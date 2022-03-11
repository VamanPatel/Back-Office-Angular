import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { TbillsProductComponent } from './components/tbills-product/tbills-product.component';
import { BondsProductComponent } from './components/bonds-product/bonds-product.component';
import { SharesProductComponent } from './components/shares-product/shares-product.component';
import { MutualFundsProductComponent } from './components/mutual-funds-product/mutual-funds-product.component';
import { AddNewTbillComponent } from './components/add-new-tbill/add-new-tbill.component';
import { ViewTbillDetailsComponent } from './components/view-tbill-details/view-tbill-details.component';
import { AddBillModalComponent } from './modal/add-bill-modal/add-bill-modal.component';
import { EditTbillComponent } from './components/edit-tbill/edit-tbill.component';


@NgModule({
   declarations: [
      TbillsProductComponent,
      BondsProductComponent,
      SharesProductComponent,
      MutualFundsProductComponent,
      AddNewTbillComponent,
      ViewTbillDetailsComponent,
      AddBillModalComponent,
      EditTbillComponent
   ],
   imports: [
      CommonModule,
      NgbModule,
      FormsModule,
      ProductRoutingModule
   ],
   entryComponents: [
      AddBillModalComponent
   ]
})
export class ProductModule { }
