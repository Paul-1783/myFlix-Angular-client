import { Injectable } from '@angular/core';

import { catchError } from 'rxjs'; //path from exercise text not up to date?
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from "rxjs/operators";


const apiUrl = "https://myflicsdb3.onrender.com/"
const err = new Error("Something bad happened: please try it again later.")


@Injectable({
  providedIn: 'root'
})
  
export class FetchApiDataService {

  constructor(private http: HttpClient) { }

  public userRegistration(userDetails: any): Observable <any> {
    console.log(userDetails);
    return this.http.post(apiUrl + "users", userDetails).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occured: ", error.error.message)
    }
    else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}` 
      )
    }
    // return throwError("Something bad happened: please try it again later.")
    return throwError(() => err)
  }

  public userLogin(userDetails: any):Observable<any> {
    // console.log(userDetails);
    return this.http.post(apiUrl + "login", userDetails).pipe(catchError(this.handleError))
  }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + "movies", {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map( this.extractResponseData),
      catchError(this.handleError)
    );
  }

getOneMovie(movieName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + "movies/" + movieName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map( this.extractResponseData),
      catchError(this.handleError)
    );
}
  
getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + "movies/directors/" + directorName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map( this.extractResponseData),
      catchError(this.handleError)
    );
}
  
getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + "movies/genre/" + genreName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map( this.extractResponseData),
      catchError(this.handleError)
    );
}
 
getUser(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + "users/" + userName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map( this.extractResponseData),
      catchError(this.handleError)
    );
}
  
getFavMoviesFromUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + "users/:Username", {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.favorite_movies),
      catchError(this.handleError)
    );
}

  addMovToFavMovies(userName: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/${encodeURIComponent(userName)}/movies/${encodeURIComponent(movieId)}`, {},
      {
        headers: new HttpHeaders(
        {
        Authorization: 'Bearer ' +  token,
          })
        , responseType: 'text'
      }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  
  editUser(userName: string, data: any): Observable<any>{
    
    console.log("here: ", apiUrl + "users/" + userName)
    console.log("dataobject: ", data)
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + "users/" + userName, data, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
       })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  deleteUser(userName: string): Observable<any> {
    console.log("url: ", apiUrl + "users/" + userName)

    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + "users/" + userName, {responseType: 'text',headers: new HttpHeaders( //why responseType necessary?
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  deleteMovieFromFavorites(movieId: string, userName: string){
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + "users/" + userName + "/movies/" + movieId, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

// Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

}

