import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LogsRoutingModule } from './logs-routing.module';


@NgModule({
   declarations: [
   ],
   imports: [
      CommonModule,
      NgbModule,
      FormsModule,
      LogsRoutingModule
   ],
})
export class LogsModule {}
