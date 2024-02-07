import { Component, OnInit } from '@angular/core';
import { ProfilePageComponent } from "../profile-page/profile-page.component";
import { FetchApiDataService } from "../fetch-api-data.service"
import { MatDialog } from '@angular/material/dialog';
import {InfoPresentationPageComponent} from "../info-presentation-page/info-presentation-page.component"

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit{
  movies: any[] = [];
  data = {name: "", description: ""}

  constructor(public fetchMovies: FetchApiDataService, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
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
    let userName = localStorage.getItem("user");
    if (userName) {
      this.fetchMovies.addMovToFavMovies(userName, movie._id)
      this.getMovies();
    }

    this.dialog.open(InfoPresentationPageComponent, {
      width: "280px", data: {
        name: "movie has been added to favorites."
      }
    })
  }
}
