import { Component, OnInit } from '@angular/core';
import { MusicDialogComponent } from '../../music-dialog/component/music-dialog.component';

@Component({
  selector: 'mma-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  img = "https://material.angular.io/assets/img/examples/shiba2.jpg";

  data = [
    {
      title: "Pippo",
      author: "Papaerino",
      img_url: this.img,
      description: "This is an example",
      component: MusicDialogComponent
    },
    {
      title: "Topolino",
      author: "Walt Disney",
      img_url: this.img,
      description: "This is an example 2",
      component: MusicDialogComponent
    },
    {
      title: "Topolino",
      author: "Walt Disney",
      img_url: this.img,
      description: "This is an example 2",
      component: MusicDialogComponent
    }

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
