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
  
/** 
 * class to be called for any network calls.
 */
export class FetchApiDataService {

  /** @constructs */
  constructor(private http: HttpClient) { }

  /** 
   * calls registration API.
   */
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

  /**
   * calls user login API.
   */
  public userLogin(userDetails: any):Observable<any> {
    // console.log(userDetails);
    return this.http.post(apiUrl + "login", userDetails).pipe(catchError(this.handleError))
  }

  /**
   * returns a list of all movies listed in the database.
   */
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

  /**
   * returns a single movie.
   */
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
  
  /**
   * returns the object of the by name requested director with additional information.
   */
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

  /**
   * returns the object of the by name requested genre with additional information.
   */
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
 
  /**
   * returns one single user object with complete profile information.
   */
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
  
  /**
   * returns a list with the ids of the favorite movies of a specific user.
   */
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
  /**
   * adds the indicated movie to the list of favorite movies of the respective user.
   */
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
  
  /**
   * allows to update the profile data of the respective user.
   */
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

  /**
   * deletes the respective user profile.
   */
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

  /**
   * removes the indicated movie from the list of favorite movies.
   */
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

