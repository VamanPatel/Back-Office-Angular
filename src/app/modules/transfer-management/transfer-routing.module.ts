import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { ListingComponent } from './components/listing/listing.component';

const routes: Routes = [
  {
    path: '',
    component: ListingComponent,
  },
  {
    path: 'transfer-detail',
    component: DetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransFerRoutingModule {}
