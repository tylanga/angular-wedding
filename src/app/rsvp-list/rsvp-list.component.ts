import { Component, OnInit, NgModule } from '@angular/core';

// angular firestore components
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { config } from '../app.config';
import { AppService } from '../app.service';

interface Rsvp {
  fistName: string;
  lastName: string;
  email: string;
  needBus: boolean;
}

interface RsvpId extends Rsvp {
  id: string;
}

interface Post {
  title: string;
  content: string;
}


@Component({
  selector: 'rsvp-list',
  templateUrl: './rsvp-list.component.html',
  styleUrls: ['./rsvp-list.component.scss'],
  providers: [AppService] // added the provider for the rsvpService to work
})
export class RsvpListComponent implements OnInit {

  // added to edit each rsvp
  myRsvp: string;
  editMode: boolean = false;
  rsvpToEdit: any = {};
  rsvp: any;

  // rsvp options
  title: string;
  attending: boolean;
  firstName: string;
  lastName: string;
  firstName_1: string;
  lastName_1: string;
  firstName_2: string;
  lastName_2: string;
  firstName_3: string;
  lastName_3: string;
  firstName_4: string;
  lastName_4: string;
  firstName_5: string;
  lastName_5: string;
  needBus;
  email;
  submitted: any;
  submittedReadOn: any;
  submittedEdit: any;
  rsvpID: any;
  rsvpData: any;
  rsvpName: any;
  rsvpEmail: any = 'example@gmail.com';
  guestCount = 0;
  rsvpClass;

  // added to hold the rsvps via observable
  rsvps: Observable<any[]>;


  constructor(private afs: AngularFirestore, private rsvpService: AppService) { // angular dependecy injection and service injection
    // this.afs = afs;
    // this.rsvps = afs.collection('/rsvp').valueChanges();
}

  ngOnInit() {
    // this.rsvpsCol = this.afs.collection(config.collection_endpoint); // bind to collection of firestore
    // this.rsvps = this.rsvpsCol.valueChanges(); // bind to collection of firestore
    this.rsvps = this.afs // bind to collection of firestore and return the id
    .collection(config.collection_endpoint)
    .snapshotChanges()
    .map(actions => {
       return actions.map(a => {
         // Get document data
         const data = a.payload.doc.data() as Rsvp;
         // Get document id
         const id = a.payload.doc.id;
         // Use spread operator to add the id to the document data
         return { id, data };
       });
    });

  }

  // getRsvp(rsvpId) {
  //   this.rsvpId = rsvpId;
  //   console.log("click" + rsvpId);
  //   this.rsvpDoc = this.afs.doc('rsvps/' + rsvpId);
  //   console.log(this.rsvpDoc);
  //   this.rsvp = this.rsvpDoc.valueChanges();
  // }

  // updateRsvp(rsvpId) {
  //   this.rsvpUpdate = this.afs.doc('rsvps/' + this.rsvpId);
  //   console.log(this.rsvpUpdate);
  //   console.log(this.rsvp);
  //   this.rsvp.map((rsvp) => {console.log(rsvp); });
  //   console.log(this.idTest);
  //   console.log(this.rsvps.id);
  // }

  saveRsvp() {
    this.editMode = false;
    console.log(this);
    this.afs.collection('rsvps').doc(this.rsvp.id).set({ // creates a custom ID when posting - see above comment
      'firstName': this.firstName,
      'lastName': this.lastName,
      'attending': this.attending,
      'guestCount': this.guestCount,
      'firstName_1': this.firstName_1,
      'lastName_1': this.lastName_1,
      'firstName_2': this.firstName_2,
      'lastName_2': this.lastName_2,
      'firstName_3': this.firstName_3,
      'lastName_3': this.lastName_3,
      'firstName_4': this.firstName_4,
      'lastName_4': this.lastName_4,
      'firstName_5': this.firstName_5,
      'lastName_5': this.lastName_5,
      'needBus': this.needBus,
      'email': this.email
    });
 } // saveRsvp

//   saveRsvp() {
//     if (this.myRsvp !== null) {
//        // Get the input value
//        let rsvp = {
//           firstName = rsvp.data.myRsvp
//        };
//        if (!this.editMode) {
//           console.log(rsvp);
//           this.rsvpService.addRsvp(rsvp);
//        } else {
//           // Get the task id
//           let rsvpId = this.rsvpToEdit.id;
//           // update the rsvp
//           this.rsvpService.updateRsvp(rsvpId, rsvp);
//        }
//        // set edit mode to false and clear form
//        this.editMode = false;
//        this.myRsvp = '';
//        this.rsvp = '';
//     }
//  } // saveRsvp

 deleteRsvp(rsvp) {
   // confirm delete
   if (confirm("Are you sure you want to delete "+ rsvp.data.firstName + " ?")) {
    console.log("Implement delete functionality here");
    // Get the task id
    let rsvpId = rsvp.id;
    // delete the rsvp
    this.rsvpService.deleteRsvp(rsvpId);
    this.rsvp = '';
  } else {
    console.log("deny delete");
  }
} // deleteRsvp



  removeGuest() {
    this.guestCount = this.guestCount - 1;
  }

  addPlus1() {
    // alert(this.guestCount);
    if (this.guestCount < 5) {
    this.guestCount = this.guestCount + 1;
    } else if (this.guestCount === 5) {
      this.guestCount = 5;
      alert("You have reached the limit of 5 guests - call us if you have an issue!");
    } else if (this.guestCount > 5) {
      this.guestCount = 5;
      alert("You have reached the limit of guest - call us if you have an issue!");
    }
    // alert(this.guestCount);
    // document.getElementById('rsvpEnd').innerHTML += `
    //   <input placeholder="Guest ` + this.guestCount + ` First Name" id="first_name_` + this.guestCount + `" type="text" class="validate">
    //   <input placeholder="Guest ` + this.guestCount + ` Last Name" id="last_name_` + this.guestCount + `" type="text" class="validate">
    //   <p class= "line">________________________________________</p>
    // `;

  }


  edit(rsvp) {
    this.rsvp = rsvp;
    console.log(rsvp);
    // Set rsvpToEdit and editMode
    this.rsvpToEdit = rsvp;
    this.editMode = true;
    // Set form value
    this.myRsvp = rsvp.data.firstName;
  } // edit

  activeRsvp(rsvp) {
    this.rsvp = rsvp;
    this.rsvpID = rsvp;
    // console.log(rsvp.needBus);
    console.log(rsvp.id);
    // set the form element values
    this.firstName = rsvp.data.firstName;
    this.lastName = rsvp.data.lastName;
    this.attending = rsvp.data.attending;
    this.guestCount = rsvp.data.guestCount;
    this.firstName_1 = rsvp.data.firstName_1;
    this.lastName_1 = rsvp.data.lastName_1;
    this.firstName_2 = rsvp.data.firstName_2;
    this.lastName_2 = rsvp.data.lastName_2;
    this.firstName_3 = rsvp.data.firstName_3;
    this.lastName_3 = rsvp.data.lastName_3;
    this.firstName_4 = rsvp.data.firstName_4;
    this.lastName_4 = rsvp.data.lastName_4;
    this.firstName_5 = rsvp.data.firstName_5;
    this.lastName_5 = rsvp.data.lastName_5;
    this.needBus = rsvp.data.needBus;
    this.email = rsvp.data.email;
  }

  needBusChange(x) {
    // console.log(x.srcElement.value);
    this.needBus = x.srcElement.value;
  }

  attendingChange(x) {
    this.attending = x.srcElement.value;
    console.log(this.attending);
  }
}
