import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TailwindCardComponent } from './component/tailwind-card.component';



@NgModule({
  declarations: [
    TailwindCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TailwindCardComponent
  ]
})
export class TailwindCardModule { }
