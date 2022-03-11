import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TransactionRoutingModule } from './transaction-routing.module';


@NgModule({
   declarations: [
   ],
   imports: [
      CommonModule,
      NgbModule,
      FormsModule,
      TransactionRoutingModule
   ],
})
export class TransactionModule {}