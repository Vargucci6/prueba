import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { Error404Component } from './pages/error404/error404.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputClearComponent } from './components/input-clear/input-clear.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InputPassComponent } from './components/input-pass/input-pass.component';
import { ToastrModule } from 'ngx-toastr';
import { ButtonComponent } from './components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from "@angular/common/http";
import { InputComponent } from './components/input/input.component';
import { LoginComponent } from './pages/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './pages/home/home.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    Error404Component,
    InputClearComponent,
    InputPassComponent,
    ButtonComponent,
    InputComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
