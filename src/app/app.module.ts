import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzParallaxModule } from 'ng2-materialize';
import { RsvpComponent } from './rsvp/rsvp.component';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { environment } from '../environments/environment';
import { RsvpListComponent } from './rsvp-list/rsvp-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RsvpComponent,
    RsvpListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MzParallaxModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  links: string[] = [
    'Our Story',
    'When & Where',
    'Travel & Accommodations',
    'Registry',
    'RSVP'
  ];

  names = 'Tyler and Samantha';


}
