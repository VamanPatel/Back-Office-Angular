import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTestimonyComponent } from './components/add-testimony/add-testimony.component';
import { EditInfoManagementComponent } from './components/edit-info-management/edit-info-management.component';
import { InfoManagementDetailsComponent } from './components/info-management-details/info-management-details.component';
import { MobileComponent } from './components/mobile/mobile.component';
import { ProductComponent } from './components/product/product.component';
import { TestimoniesComponent } from './components/testimonies/testimonies.component';
import { WebComponent } from './components/web/web.component';
import { EditTestimonyComponent } from './components/edit-testimony/edit-testimony.component';


const routes: Routes = [
  {
    path: '',
    component: InfoManagementDetailsComponent
  },
  {
    path: 'testimonies',
    component: TestimoniesComponent
  },
  {
    path: 'testimonies/add-testimony',
    component: AddTestimonyComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'web',
    component: WebComponent
  },
  {
    path: 'mobile',
    component: MobileComponent
  },
  {
    path: 'edit-info-management',
    component: EditInfoManagementComponent
  },
  {
    path: 'testimonies/edit/:id',
    component: EditTestimonyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoManagementRoutingModule { }
