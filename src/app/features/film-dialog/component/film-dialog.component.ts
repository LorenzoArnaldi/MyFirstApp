import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IDialogData } from 'src/app/shared/card/models/dialog-data.models';

@Component({
  selector: 'mma-film-dialog',
  templateUrl: './film-dialog.component.html',
  styleUrls: ['./film-dialog.component.scss']
})
export class FilmDialogComponent implements OnInit {
  @Input() modalità = this.data.mode;

  public filmForm: FormGroup = new FormGroup ({});
  // name = new FormControl('');
  // public insertVisible = this.data.mode;

  constructor(public dialogRef: MatDialogRef<FilmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private fb: FormBuilder,
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.initFilmForm();
    console.log("mode", this.data.mode)
  }

  public initFilmForm() {
    this.filmForm = this.fb.group(
      {
        // if (mode = "edit") {
          "nameFilm": ['', Validators.required],
          "dateProduction": ['', Validators.required],
          "nameAutor": ['', Validators.required],
          "groupFilm": [''],
        // }
      }
    )
  }

  public stampa() {
    console.log(this.filmForm.value)
  }

  public checkFormError(path: string, errorCode: string) {
    return this.filmForm.get(path).invalid && 
           this.filmForm.get(path).errors &&
           (this.filmForm.get(path).dirty || this.filmForm.get(path).touched) &&
           this.filmForm.get(path).hasError(errorCode);
  }

  public checkInserimento(modalità) {
    if (modalità = "insert")
    "valid";
    else null
  }

}
