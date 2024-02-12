import { Component, OnInit, Input, Output} from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service"


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit{

  @Input() loggedInUser = { _id: "",
    username: "", password: "", email: "", birthday: ""
  };

  listOfFavMovies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) { 
  }

  ngOnInit(): void {
    const test =  localStorage.getItem("user") || "{}"  
    this.fetchApiData.getUser(test).subscribe((resp: any) => {
      this.loggedInUser = resp;
      console.log(this.loggedInUser.email)
    })

  }
}
