import { Component } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-info-presentation-page',
  templateUrl: './info-presentation-page.component.html',
  styleUrls: ['./info-presentation-page.component.scss']
})
export class InfoPresentationPageComponent { 
 
  constructor(  @Inject(MAT_DIALOG_DATA) public data: any) { 
  }
  
  returnToMovieList(): void {
      
  }
}
