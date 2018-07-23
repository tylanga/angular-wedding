import { Injectable } from '@angular/core';
import { config } from './app.config';
import { Rsvp } from './app.model';
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AppService {

  rsvpDoc: AngularFirestoreDocument<Rsvp>;
  rsvps: AngularFirestoreCollection<Rsvp>;

  constructor(private afs: AngularFirestore) {
     // Get the rsvps collection
   this.rsvps = afs.collection<Rsvp>(config.collection_endpoint); // endpoint configured in app.config.ts
   }

   addRsvp(rsvp) {
    // Add the new rsvp to the collection
    this.rsvps.add(rsvp);
  } // addRsvp

  updateRsvp(id, update) {
    // Get the rsvp document
    this.rsvpDoc = this.afs.doc<Rsvp>(`${config.collection_endpoint}/${id}`);
    this.rsvpDoc.update(update);
 } // updateRsvp

 deleteRsvp(id) {
  // Get the rsvp document
  this.rsvpDoc = this.afs.doc<Rsvp>(`${config.collection_endpoint}/${id}`);
  // Delete the document
  this.rsvpDoc.delete();
} // deleteRsvp

}


