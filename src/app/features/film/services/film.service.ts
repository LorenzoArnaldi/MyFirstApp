import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NerdyApiGwResources } from 'src/app/shared/models/api-gw.models';
import { environment } from 'src/environments/environment';
import { DeleteFilmRequest, GetFilmRequest, GetFilmsRequest, InsertFilmRequest } from '../models/film-request.model';
 @Injectable({
   providedIn: 'root'
 })
 export class FilmService {
   private baseEndpoint: string = environment.apiGwBaseEndpoint;
   private endpoint: string
   constructor(
     private httpClient: HttpClient
     ) {
     this.endpoint = this.baseEndpoint + '/' + NerdyApiGwResources.MOVIES
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
   public getFilms(request: GetFilmsRequest): Observable<any> {
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
   public getFilm(request: GetFilmRequest): Observable<any> {
     const urlPattern = '{{user_id}}/{{film_id}}';
     return of(null);
   }

   /**
    * 
    * @param request 
    * @returns 
    */
   public insertNewFilm(request: InsertFilmRequest): Observable<any> {
     console.log('INSERT FILM REQUEST', request);
     return of(null);
   }

   /**
    * 
    * @param request 
    * @returns 
    */
   public deleteFilm(request: DeleteFilmRequest): Observable<any> {
     const urlPattern = '{{user_id}}/{{film_id}}';
     return of(null);
   }

 }