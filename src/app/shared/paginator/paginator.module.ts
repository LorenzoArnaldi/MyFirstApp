import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './component/paginator.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatButton } from '@angular/material/button';
import { ButtonModule } from '../button/button.module';





@NgModule({
  declarations: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    ButtonModule
  ],
  exports: [
    PaginatorComponent
  ]
})
export class PaginatorModule { }
