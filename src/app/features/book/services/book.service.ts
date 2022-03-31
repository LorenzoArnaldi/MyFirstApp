import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NerdyApiGwResources } from 'src/app/shared/models/api-gw.models';
import { environment } from 'src/environments/environment';
import { GetFilmsRequest } from '../../film/models/film-request.model';
import { DeleteBookRequest, GetBookRequest, InsertBookRequest, UpdateBookRequest } from '../models/book-request.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseEndpoint: string = environment.apiGwBaseEndpoint;
  private endpoint: string
  constructor(
    private httpClient: HttpClient
    ) {
    this.endpoint = this.baseEndpoint + '/' + NerdyApiGwResources.BOOKS
   }

 //  getAllFilmUrl:  https://ixypa5nb2a.execute-api.eu-west-1.amazonaws.com/dev/movies/user_id

 /**
  * url: https://ixypa5nb2a.execute-api.eu-west-1.amazonaws.com/dev/movies/{{user_id}}
  * 
  * @param request: Get Films request
  * @returns {
  *  items: []
  * }
  */
  public getBooks(request: GetFilmsRequest): Observable<any> {
    const user_id = request.user_id;
    const url = this.endpoint + '/' + user_id; 
    const queryParams = {}; 
    return this.httpClient.get(
     url,
     {
       params: queryParams
     }
   );
  }
  public getBook(request: GetBookRequest): Observable<any> {
    const user_id = request.user_id;
    const book_id = request.book_id;
    const url = this.endpoint + "/" + user_id + "/" + book_id;
    const queryParams = {};
    return this.httpClient.get(
      url,
      {
        params: queryParams
      }
    );
    // const urlPattern = '{{user_id}}/{{book_id}}';
    // return of(null);
  }

  /**
   * 
   * @param request 
   * @returns 
   */
  public insertNewBook(request: InsertBookRequest): Observable<any> {
    console.log('INSERT BOOK REQUEST', request);
    const url = this.endpoint; 
    const queryParams = {};
    const body = request;
    return this.httpClient.post(
      url,
      body,
      {
        params: queryParams
      }
    );
  }

  /**
   * 
   * @param request 
   * @returns 
   */
   public editBook(request: UpdateBookRequest): Observable<any> {
    console.log('EDIT BOOK REQUEST', request);
    const user_id = request.user_id;
    const book_id = request.book_id;
    const url = this.endpoint + "/" + user_id + "/" + book_id;
    const queryParams = {};
    const body = request;
    return this.httpClient.put(
      url,
      body,
      {
        params: queryParams
      }
    );
  }



  /**
   * 
   * @param request 
   * @returns 
   */
  public deleteBook(request: DeleteBookRequest): Observable<any> {
    console.log('DELET BOOK REQUEST', request);
    const user_id = request.user_id;
    const book_id = request.book_id;
    const url = this.endpoint + "/" + user_id + "/" + book_id;
    const queryParams = {};
    return this.httpClient.delete(
      url,
      {
        params: queryParams
      }
    );
    // const urlPattern = '{{user_id}}/{{book_id}}';
    // return of(null);
  }

}