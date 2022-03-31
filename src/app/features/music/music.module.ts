import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicComponent } from './component/music.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MusicRoutingModule } from './music-routing.module';



@NgModule({
  declarations: [
    MusicComponent
  ],
  imports: [
    CommonModule,
    MusicRoutingModule,
    SharedModule
  ],
  exports: [
    MusicComponent
  ]
})
export class MusicModule { }
