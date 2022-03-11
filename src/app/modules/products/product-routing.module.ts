import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewTbillComponent } from './components/add-new-tbill/add-new-tbill.component';
import { BondsProductComponent } from './components/bonds-product/bonds-product.component';
import { EditTbillComponent } from './components/edit-tbill/edit-tbill.component';
import { MutualFundsProductComponent } from './components/mutual-funds-product/mutual-funds-product.component';
import { ProdDetailComponent } from './components/prod-detail/prod-detail.component';
import { SharesProductComponent } from './components/shares-product/shares-product.component';
import { TbillsProductComponent } from './components/tbills-product/tbills-product.component';
import { ViewTbillDetailsComponent } from './components/view-tbill-details/view-tbill-details.component';


const routes: Routes = [
 {
     path: '',
     component: ProdDetailComponent
 },
 {
   path: 't-bill',
   component: TbillsProductComponent
 },
 {
   path: 'bond',
   component: BondsProductComponent
 },
 {
   path: 'shares',
   component: SharesProductComponent
 },
 {
   path: 'mutual-funds',
   component: MutualFundsProductComponent
 },
 {
   path: 't-bill/add-new-tbill',
   component: AddNewTbillComponent
 },
 {
   path: 't-bill/view-tbill',
   component: ViewTbillDetailsComponent
 },
 {
   path: 't-bill/edit-tbill',
   component: EditTbillComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
