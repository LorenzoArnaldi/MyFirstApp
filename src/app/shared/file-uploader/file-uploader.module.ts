import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './component/file-uploader.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../button/button.module';



@NgModule({
  declarations: [
    FileUploaderComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    FileUploaderComponent
  ]
})
export class FileUploaderModule { }
