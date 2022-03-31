import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilmDialogComponent } from './component/film-dialog.component';



@NgModule({
  declarations: [
    FilmDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    FilmDialogComponent
  ]
})
export class FilmDialogModule { }
