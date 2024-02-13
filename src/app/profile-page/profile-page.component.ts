import { Component, OnInit, Input} from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service"
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
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

  movies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public movieCard: MovieCardComponent) { 
  }

  ngOnInit(): void {
    let test = localStorage.getItem("user") || "{}"  
    test = test.replace(/^"(.*)"$/, '$1');
    this.fetchApiData.getUser(test).subscribe((resp: any) => {
      this.loggedInUser.username = resp.username;
      this.loggedInUser.email = resp.email
      this.loggedInUser.birthday = formatDate(resp.birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');
      this.loggedInUser.favorite_movies = resp.favorite_movies;
      const allMovies: any = this.movieCard.getMovies();
      this.movies = allMovies.filter((movie: any) => resp.favorite_movies.includes(movie._id))
      console.log(this.movies)
    })
    // this.dialog.open(MovieCardComponent, { width: '400px', height: '400px', data: { movies: this.loggedInUser.favorite_movies } });
  }



  editUser(): void {
    this.fetchApiData.editUser(localStorage.getItem("user") || "{}", JSON.stringify(this.loggedInUser)).subscribe(
      result => {
        console.log("result: ", result);
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      }
    )
    localStorage.setItem("user", this.loggedInUser.username)
  }
}
