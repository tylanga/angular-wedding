import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzParallaxModule } from 'ng2-materialize';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

// angular firebase components
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
// import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
declare var componentHandler: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnChanges {

  constructor(private afs: AngularFirestore, private router: ActivatedRoute) {}

  links: string[] = [
    'Our Story',
    'When & Where',
    'Travel & Accommodations',
    'Registry',
    'RSVP'
  ];

  activatedRoute;

  names = 'Tyler and Samantha';

  ngOnInit () {
    console.log("hello on init");
    this.router.url.subscribe(event => this.activatedRoute = event); // subscribe to the observable router url
  //   this.router.events.subscribe((val) => {
  //     const currentPage = this.router.url; // Current page route
  //     console.log(currentPage);
  //   //  const currentLocation = (this.platformLocation as any).location.href; // Current page url
  //  });
    console.log(this.activatedRoute);
  }

  ngAfterViewInit () {
    console.log("after view");
    componentHandler.upgradeDom();
    componentHandler.upgradeAllRegistered();
  }

  ngOnChanges() {
    console.log("after change");
    componentHandler.upgradeDom();
    componentHandler.upgradeAllRegistered();
 }

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

