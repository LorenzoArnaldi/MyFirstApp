import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './component/card.component';
import {MatCardModule} from '@angular/material/card';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ButtonModule,
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule { }
