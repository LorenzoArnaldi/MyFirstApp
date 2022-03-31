import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from 'src/app/shared/card/models/dialog-data.models';

@Component({
  selector: 'mma-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss']
})
export class BookDialogComponent implements OnInit {
  @Input() modalità = this.data.mode;

  public bookForm: FormGroup = new FormGroup ({});
  // name = new FormControl('');
  // public insertVisible = this.data.mode;
  public _itemData: any;

  constructor(public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private fb: FormBuilder,
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    
    console.log("mode", this.data.mode)
    
    this._itemData = this.data.itemData;
    console.log('ITEM DATA',this._itemData);
    this.initbookForm();
  }

  public initbookForm() {
    switch (this.data.mode) {
      case "insert":
        this.bookForm = this.fb.group(
          {
            // if (mode = "edit") {
              "title": ['', Validators.required],
              "year": ['', Validators.required],
              "author": ['', Validators.required],
              "collection_id": [''],
              "image_url": [''],
              "file": [null],
              "description": [''],
              "genre": ['']
            // }
          }
        )
      break;

      case "edit":

        this.bookForm = this.fb.group(
          {
            // if (mode = "edit") {
              "book_id": this.fb.control(
              this._itemData.book_id
              ),
              "title": this.fb.control(this._itemData.title, Validators.required),
              "year": [this._itemData.year, Validators.required],
              "author": [this._itemData.author, Validators.required],
              "collection_id": [this._itemData.collection_id],
              "image_url": [this._itemData.image_url],
              "file": [null],
              "description": [this._itemData.description],
              "genre": [this._itemData.genre]
            // }
          }
        )
        console.log("RISULTATO BOOKfORM EDIT", this.bookForm.getRawValue())
        break;
    }
  }

  public stampa() {
    const dialogResponse = {
      mode: this.data.mode,
      data: this.bookForm.getRawValue()
    }
    this.dialogRef.close(dialogResponse);
  }

  public checkFormError(path: string, errorCode: string) {
    return this.bookForm.get(path).invalid && 
           this.bookForm.get(path).errors &&
           (this.bookForm.get(path).dirty || this.bookForm.get(path).touched) &&
           this.bookForm.get(path).hasError(errorCode);
  }

  public checkInserimento(modalità) {
    if (modalità = "insert")
    "valid";
    else null
  }

}