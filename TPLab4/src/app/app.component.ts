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

}
