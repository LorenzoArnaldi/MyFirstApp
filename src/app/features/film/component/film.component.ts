import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FilmDialogComponent } from '../../film-dialog/component/film-dialog.component';
import { GetFilmsRequest } from '../models/film-request.model';
import { FilmService } from '../services/film.service';
import {UserSessionService} from '../../../core/user-session/service/user-session.service';
import { UserData } from 'src/app/core/user-session/models/user-session.models';
import { FilmDialogData } from 'src/app/shared/card/models/dialog-data.models';
@Component({
  selector: 'mma-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  img = "https://material.angular.io/assets/img/examples/shiba2.jpg";

  data = [
    {
      title: "Pippo",
      author: "Papaerino",
      img_url: this.img,
      description: "This is an example",
      component: FilmDialogComponent
    },
    {
      title: "Topolino",
      author: "Walt Disney",
      img_url: this.img,
      description: "This is an example 2",
      component: FilmDialogComponent
    },
    {
      title: "Topolino",
      author: "Walt Disney",
      img_url: this.img,
      description: "This is an example 2",
      component: FilmDialogComponent
    }

  ];

  dialogComponentType: any;

  private userId: string;

  constructor(
    public dialog: MatDialog,
    private filmService: FilmService,
    private userSessionService : UserSessionService
    ) { }

  ngOnInit(): void {
    this.dialogComponentType = FilmDialogComponent;
    const userData: UserData = this.userSessionService.getUserData();
    this.userId = userData.user_id;
    this.getFilmList();

  }

  openAddDialog() {
    const matDialogConfig = new MatDialogConfig();
    const filmData: FilmDialogData = {mode:"insert", filmData: null}
    matDialogConfig.width = '50%';
    matDialogConfig.data = filmData;
    const dialogRef = this.dialog.open(this.dialogComponentType, matDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public getFilmList(){
    const request: GetFilmsRequest = {user_id: this.userId};
    this.filmService.getFilms(request).subscribe(
      (response) => {
        console.log('GET FILMS REPONSE', response);
      }
    )
  }

}
