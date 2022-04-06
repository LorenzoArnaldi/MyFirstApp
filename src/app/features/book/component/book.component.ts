import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserData } from 'src/app/core/user-session/models/user-session.models';
import { UserSessionService } from 'src/app/core/user-session/service/user-session.service';
import { BookDialogData } from 'src/app/shared/card/models/dialog-data.models';
import { BookDialogComponent } from '../../book-dialog/component/book-dialog.component';
import { BookItemModel } from '../models/book-item.model';
import { DeleteBookRequest, GetBookRequest, GetBooksRequest, InsertBookRequest, UpdateBookRequest } from '../models/book-request.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'mma-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() genericListBook: BookItemModel;
  listItems: any[];

  // img = "https://material.angular.io/assets/img/examples/shiba2.jpg";

  // data = [
  //   {
  //     title: "Pippo",
  //     author: "Papaerino",
  //     img_url: this.img,
  //     description: "This is an example",
  //     component: BookDialogComponent
  //   },
  //   {
  //     title: "Topolino",
  //     author: "Walt Disney",
  //     img_url: this.img,
  //     description: "This is an example 2",
  //     component: BookDialogComponent
  //   },
  //   {
  //     title: "Topolino",
  //     author: "Walt Disney",
  //     img_url: this.img,
  //     description: "This is an example 2",
  //     component: BookDialogComponent
  //   }

  // ];

  dialogComponentType: any;

  private userId: string;
  private bookId: string;

  constructor(
    public dialog: MatDialog,
    private bookService: BookService,
    private userSessionService : UserSessionService
    ) { }

  ngOnInit(): void {
    this.dialogComponentType = BookDialogComponent;
    const userData: UserData = this.userSessionService.getUserData();
    this.userId = userData.user_id;
    this.getBookList();
  }

  openAddDialog() {
    const matDialogConfig = new MatDialogConfig();
    const filmData: BookDialogData = {mode:"insert", filmData: null}
    matDialogConfig.width = '25%';
    matDialogConfig.data = filmData;
    const dialogRef = this.dialog.open(this.dialogComponentType, matDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`, result);
      const bookId = result.data.book_id;
      const _data = result.data;

      delete _data.book_id;

      const request: InsertBookRequest = {
        book_id: bookId,
        user_id: this.userId,
        data: _data
      };
      this.bookService.insertNewBook(request)
        .subscribe(
          res => console.log('INSERT NEW BOOK RESPONSE', res)
        )
        this.getBookList();
    });
  }

  public updateBook(event) {
    console.log(event);
    const bookId = event.data.book_id;
    const _data = event.data;

    delete _data.book_id;

    const request: UpdateBookRequest = {
      book_id: bookId,
      user_id: this.userId,
      data: _data
    };
    this.bookService.editBook(request)
    .subscribe(
      res => {
        console.log('EDIT BOOK RESPONSE', res);
        this.getBookList();
      }
    )
  }

  public deleteBook (event) {
    const request: DeleteBookRequest = {
      book_id: event.book_id,
      user_id: this.userId,
    };
    this.bookService.deleteBook(request)
    .subscribe(
      res =>{ 
        console.log('DELETE BOOK RESPONSE', res)
        this.getBookList();}
    )
  }

  public getBookList(){
    const request: GetBooksRequest = {user_id: this.userId};
    this.bookService.getBooks(request).subscribe(
      (response) => {
        console.log('GET BOOKS REPONSE', response);
        this.listItems = [...response.items];
      }
    )
  }

  public getBook(){
    const request: GetBookRequest = {user_id: this.userId, book_id: this.bookId};
    this.bookService.getBook(request).subscribe(
      (response) => {
        console.log('GET BOOK RESPONSE', response);
      }
    )
  }
}
