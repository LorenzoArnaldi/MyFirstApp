import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IDialogData } from '../models/dialog-data.models';

@Component({
  selector: 'mma-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() data: any;
  @Input() dialogComponentType: any;

  @Output() dataEmitter = new EventEmitter<any>();
  @Output() deleteEmitter = new EventEmitter<any>();



  dataB =  { title: "Dettaglio" };
  dataB2 =  { title: "Elimina" };

  component : any;

  constructor(public dialog: MatDialog) { }

  openEditDialog() {
    const matDialogConfig = new MatDialogConfig();
    const itemData: IDialogData = {mode:"edit", itemData: this.data}
    matDialogConfig.width = '50%';
    matDialogConfig.data = itemData;
    const dialogRef = this.dialog.open(this.dialogComponentType, matDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`, result);
      if (result) this.dataEmitter.emit(result);
    });
  }

  delete() {
    this.deleteEmitter.emit(this.data);
  }

  ngOnInit(): void {
    console.log(this.dialogComponentType)
    //this.component = this.data? this.data.component:null; //se data è diverso da null, assegnata data a data.component
  }

}
