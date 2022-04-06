import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './component/card.component';
import {MatCardModule} from '@angular/material/card';
import { ButtonModule } from '../button/button.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ButtonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule { }
