import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service"


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit{
  listOfFavMovies: any[] = [];
  constructor(getUser: FetchApiDataService) { }

  ngOnInit(): void {
    
  }
}
