import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './components/detail/detail.component';
import { ListingComponent } from './components/listing/listing.component';
import { TransFerRoutingModule } from './transfer-routing.module';

@NgModule({
  declarations: [ListingComponent, DetailComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TransFerRoutingModule,
  ],
})
export class TransFerModule {}
