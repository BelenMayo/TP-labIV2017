import { Component } from '@angular/core';
import { PizzeriaService } from './servicios/pizzeria.service';
import { HttpModule, Http } from '@angular/http';

import { FileUploader } from 'ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

constructor(){}

// PUNTUAR
  public max:number = 10;
  public rate:number = 7;
  public isReadonly:boolean = false;
 
  public overStar:number;
  public percent:number;
 
  public hoveringOver(value:number):void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };
 
  public resetStar():void {
    this.overStar = void 0;
  }

//
}
