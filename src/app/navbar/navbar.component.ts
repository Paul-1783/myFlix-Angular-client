import { Component, OnDestroy, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements OnDestroy{

  showNavbar: boolean = true;
  subscription: Subscription
 
  constructor(public fetchApiData: FetchApiDataService,
    public router: Router,
    private navbarService: NavbarService) {
    this.subscription = this.navbarService.showNavbar.subscribe(value => {
      this.showNavbar = value;
      })
     }

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();    
  }
}
