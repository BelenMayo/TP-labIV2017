import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PizzeriaService } from './servicios/pizzeria.service';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FileUploadModule
  ],
  providers: [PizzeriaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
