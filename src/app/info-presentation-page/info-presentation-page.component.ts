import { Component } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-info-presentation-page',
  templateUrl: './info-presentation-page.component.html',
  styleUrls: ['./info-presentation-page.component.scss']
})
export class InfoPresentationPageComponent { 
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    public dialogRef: MatDialogRef<InfoPresentationPageComponent>,
) { 
  }
  
   backToMovieList(): void {
    this.dialogRef.close(); // This will close the modal on success
  }
}
