import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from './card/card.module';
import { PaginatorModule } from './paginator/paginator.module';
import { ButtonModule } from './button/button.module';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { TailwindCardModule } from './tailwind-card/tailwind-card.module';


const sharedComponents = [
];

const sharedModules = [
  CommonModule,
  CardModule,
  FormsModule,
  MaterialModule,
  ReactiveFormsModule,
  PaginatorModule,
  ButtonModule,
  FileUploaderModule,
  TailwindCardModule
];


@NgModule({
  declarations: [
    ...sharedComponents
  ],
  imports: [
    ...sharedModules
  ],
  exports: [
    ...sharedModules,
    ...sharedComponents
  ],
})
export class SharedModule {}
