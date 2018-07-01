import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MaterialModule } from "./material.module";
import {LoginComponent} from "./auth/login/login.component";
import {TrainingComponent} from "./training/training.component";
import {AppRoutingModule} from "./app-routing.module";
import {WelcomeComponent} from "./welcome/welcome.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        FlexLayoutModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        SignupComponent,
        LoginComponent,
        TrainingComponent,
        WelcomeComponent

    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {  }