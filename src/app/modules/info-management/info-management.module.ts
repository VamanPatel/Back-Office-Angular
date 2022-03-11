import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoManagementRoutingModule } from './info-management-routing.module';
import { TestimoniesComponent } from './components/testimonies/testimonies.component';
import { ProductComponent } from './components/product/product.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddTestimonyComponent } from './components/add-testimony/add-testimony.component';
import { WebComponent } from './components/web/web.component';
import { MobileComponent } from './components/mobile/mobile.component';
import { EditInfoManagementComponent } from './components/edit-info-management/edit-info-management.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { EditTestimonyComponent } from './components/edit-testimony/edit-testimony.component';

@NgModule({
   declarations: [
      TestimoniesComponent,
      ProductComponent,
      AddTestimonyComponent,
      WebComponent,
      MobileComponent,
      EditInfoManagementComponent,
      ImageViewerComponent,
      EditTestimonyComponent
   ],
   imports: [
      CommonModule,
      NgbModule,
      FormsModule,
      InfoManagementRoutingModule,
      CKEditorModule,
      ReactiveFormsModule,

   ],
})
export class InfoManagementModule { }
