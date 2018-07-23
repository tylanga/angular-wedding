import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzParallaxModule } from 'ng2-materialize';

// angular firebase components
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private afs: AngularFirestore) {}

  links: string[] = [
    'Our Story',
    'When & Where',
    'Travel & Accommodations',
    'Registry',
    'RSVP'
  ];

  names = 'Tyler and Samantha';
}

$(document).ready(function() {
  function setHeight() {
    var windowHeight = $(window).innerHeight();
    $('mz-parallax.main > .parallax-container').css('min-height', windowHeight);
  };
  setHeight();
  
  $(window).resize(function() {
    setHeight();
  });
});

