import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mma-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() dataB: any;

  constructor() { }

  ngOnInit(): void {
  }

}
