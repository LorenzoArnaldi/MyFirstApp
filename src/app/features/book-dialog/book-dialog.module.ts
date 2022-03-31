import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDialogComponent } from './component/book-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    BookDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    BookDialogComponent
  ]
})
export class BookDialogModule { }
