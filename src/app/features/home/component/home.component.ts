import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  link: string;
}

@Component({
  selector: 'mma-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  tiles: Tile[] = [
    {text: 'theaters', cols: 1, rows: 1, color: 'accent', link:"film",},
    {text: 'audiotrack', cols: 1, rows: 1, color: 'accent', link:"music",},
    {text: 'live_tv', cols: 1, rows: 1, color: 'accent', link:"",},
    {text: 'auto_stories', cols: 1, rows: 1, color: 'accent', link:"book",},
  ];
  
  breakpoint: number = 4;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }

  navigateBy(url:string) {
    this.router.navigateByUrl(url)
  }
}
