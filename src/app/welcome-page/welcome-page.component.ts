import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { NavbarService } from '../services/navbar.service';



@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit, OnDestroy{

  constructor(public dialog: MatDialog,
    private navbarService: NavbarService) { }
  
  ngOnInit(): void {    
    this.navbarService.hide();
  }

  ngOnDestroy(): void {
    this.navbarService.display();
  }

  //This is the function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      //Assign the dialog a width
      width: "280px"
    });
  }

    //This is the function that will open the dialog when the login button is clicked
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      //Assign the dialog a width
      width: "280px"
    });
  }
 
}
