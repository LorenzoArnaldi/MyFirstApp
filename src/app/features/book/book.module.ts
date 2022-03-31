import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './component/book.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookDialogModule } from '../book-dialog/book-dialog.module';
import { BookRoutingModule } from './book-routing.module';



@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BookDialogModule,
    BookRoutingModule
  ]
})
export class BookModule { }
