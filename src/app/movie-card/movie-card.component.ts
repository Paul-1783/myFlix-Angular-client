import { Component, OnInit } from '@angular/core';
import { ProfilePageComponent } from "../profile-page/profile-page.component";
import { FetchApiDataService } from "../fetch-api-data.service"
import { MatDialog } from '@angular/material/dialog';
import {InfoPresentationPageComponent} from "../info-presentation-page/info-presentation-page.component"
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit{
  movies: any[] = [];
  data = {name: "", description: ""}

  constructor(public fetchMovies: FetchApiDataService, public dialog: MatDialog, public snackBar : MatSnackBar) { }
  
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      // return this.movies;
    } )
  }

  openProfileDialog(): void {
    this.dialog.open(ProfilePageComponent, {
      width: "280px"
    })
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(InfoPresentationPageComponent, { width: "280px", data: {
      name: genre.Name,
      description: genre.Description
    }})
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(InfoPresentationPageComponent, { width: "280px", data: {
      name: director.Name,
      description: director.Bio
    }})
  }

  openSynopsisDialog(synopsis: any): void {
    this.dialog.open(InfoPresentationPageComponent, {
      width: "280px", data: {
      name: "Synopsis:",
      description: synopsis
    }})
  }

  addToFavs(movie: any): void{
    let user = JSON.parse(localStorage.getItem("user")|| "{}");
    if (user) {
    let userName = user.username;
    this.fetchMovies.addMovToFavMovies(userName, movie._id).subscribe(() => {
        this.snackBar.open('Movie added to favorites', 'OK', {
          duration: 2000,
        });
      });;
    user.favorite_movies.push(movie._id)
    localStorage.setItem("user", JSON.stringify(user));
    console.log("User: ", localStorage.getItem("user"))
    }
  }
}
