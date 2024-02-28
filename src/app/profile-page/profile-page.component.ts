import { Component, OnInit, Input} from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service"
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {Router} from "@angular/router"
import { MovieCardComponent } from "../movie-card/movie-card.component"

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
  
export class ProfilePageComponent implements OnInit{

  @Input() loggedInUser = { _id: "",
    username: "", password: "", email: "", birthday: "", favorite_movies: []
  };


  favMovies: any[] = [];
  movies = [];
  
  constructor(public fetchApiData: FetchApiDataService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public router: Router,
    // public movieCard: MovieCardComponent
  ) { 
  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    
    this.loggedInUser.username = user.username;
    this.loggedInUser.email = user.email
    this.loggedInUser.birthday = formatDate(user.birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');
    this.loggedInUser.favorite_movies = user.favorite_movies;

    console.log("favMovies: ", this.loggedInUser.favorite_movies)

     this.fetchApiData.getAllMovies().subscribe((resp: any) => {
       this.movies = resp;
       this.favMovies = resp.filter((movie: any) => user.favorite_movies.includes(movie._id));
     })
    
   
    // this.fetchApiData.getFavMoviesFromUser().subscribe((resp: any) => {
    //                                   this.favMovies = resp;
    //                                   console.log(resp);
    //                               });

    // this.favMovies = this.movies.filter((movie : any) => this.loggedInUser.favorite_movies.includes(movie._id)); //why does loggedInUser.favorite_movies have type 'never'?
  }

  editUser(): void {
    console.log("i got here", this.loggedInUser) 
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    let pw = this.loggedInUser.password.length > 0 ? this.loggedInUser.password : user.password;

    const payload = {
      username: this.loggedInUser.username,
      password: pw,
      email: this.loggedInUser.email,
      birthday: this.loggedInUser.birthday
    }

    this.fetchApiData.editUser(this.loggedInUser.username, payload).subscribe(
      result => {
        localStorage.setItem('user', JSON.stringify(result));
        console.log("result: ", result);
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      }
    )
    localStorage.setItem("user", this.loggedInUser.username)
  }

  deleteUser(): void {
    console.log("username: ", this.loggedInUser.username)
    this.fetchApiData.deleteUser(this.loggedInUser.username).subscribe(
      result => {
        localStorage.clear();
        this.router.navigate(["welcome"])
        console.log("result: ", result);
        this.snackBar.open(result, 'Status: ', {
          duration: 2000
        });
      }
    )
  }

  removeFromFavs(movie: any): void {
    this.fetchApiData.deleteMovieFromFavorites(movie._id, this.loggedInUser.username).subscribe(
      result => {
        this.favMovies = this.favMovies.filter(elem => { return elem._id !== movie._id });
        localStorage.setItem("user", JSON.stringify(result))
        let user = JSON.parse(localStorage.getItem("user") || "{}");
        this.loggedInUser.favorite_movies = user.favorite_movies;

        //   let fav_ids = this.loggedInUser.favorite_movies.filter(id => {
        //     return this.favMovies.forEach((elem) => elem._id !== id )
        //   });

        //   this.loggedInUser.favorite_movies : string [] = [];
        //   (fav_ids.forEach(elem => { return elem._id }))
      }
    )
  }

  changePassword(): void {    
    const payload = {
      password: this.loggedInUser.password,
    }

    this.fetchApiData.editUser(this.loggedInUser.username, payload).subscribe(
      result => {
        localStorage.setItem('user', JSON.stringify(result));
        console.log("result: ", result);
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
    });

  }
}

