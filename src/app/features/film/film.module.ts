import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmComponent } from './component/film.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilmRoutingModule } from './film-routing.module';
import { FilmDialogModule } from '../film-dialog/film-dialog.module';



@NgModule({
  declarations: [
    FilmComponent
  ],
  imports: [
    CommonModule,
    FilmRoutingModule,
    SharedModule,
    FilmDialogModule
  ],
  exports: [
    FilmComponent
  ]
})
export class FilmModule { }
