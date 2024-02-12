import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
 
  constructor(public fetchApiData: FetchApiDataService,
              public router: Router) { }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']); 
  }

  backToMovieList(): void {
    if (localStorage.length !== 0) {
      this.router.navigate(['movies']);      
    }
  }

  toTheUserProfile(): void {
    if (localStorage.length !== 0) {
      this.router.navigate(['profile']);      
    }
  }

}
