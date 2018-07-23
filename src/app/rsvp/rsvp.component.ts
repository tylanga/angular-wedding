import { Component, OnInit, NgModule, Renderer, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common/src/directives';

// angular firestore components
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { config } from '../app.config';
import { AppService } from '../app.service';


interface RSVPResponses {
  _id: string;
  name: string;
  email: string;
}

interface Rsvp {
  fistName: string;
  lastName: string;
  email: string;
  needBus: boolean;
}

interface Guests {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'rsvp-form',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss'],
  // encapsulation: ViewEncapsulation.None
  providers: [AppService] // added the provider for the rsvpService to work
})
export class RsvpComponent implements OnInit {

  title: string;
  attending: boolean;
  firstName: string;
  lastName: string;
  firstName_1: string = '';
  lastName_1: string = '';
  firstName_2: string = '';
  lastName_2: string = '';
  firstName_3: string = '';
  lastName_3: string = '';
  firstName_4: string = '';
  lastName_4: string = '';
  firstName_5: string = '';
  lastName_5: string = '';
  needBus = "no";
  email = '';
  submitted: any;
  submittedReadOn: any;
  submittedEdit: any;
  rsvpID: any;
  rsvpData: any;
  rsvpName: any;
  rsvpEmail: any = 'example@gmail.com';
  edit = true;
  guestCount = 0;
  rsvpClass;
  editMode = true;
  rsvpCol;
 


  // Firebase Firestore setup to replace http.get

  // postsCol: AngularFirestoreCollection<RsvpComponent>;
  // posts: Observable<RSVPResponses[]>;

  /*
    "getRSVP"
    Uses the value from localstorage to get the RSVP information
    the user previously submitted
  */

    getRSVP(x) {
      interface RSVPResponse {
        _id: string;
        name: string;
        email: string;
      }
      this.http.get<RSVPResponse>('https://wedding-rsvp-mongo.herokuapp.com/api/contacts/' + x).subscribe(data => {
        console.log(data);
        console.log('getRSVP Method');
        this.rsvpName = data.name;
        //alert(this.rsvpName);
      });
    }

    /*
    The .doc method accepts a string which is your unique ID, then you change .add to .set.
    If you now add a new row through the form and visit the Firestore database, you will see the new ID.
    Note: Ordinarily, you would use some mechanism to ensure the ID is unique.
    */
    addPost() {
      if (this.firstName === undefined) {
        alert("Make sure to fill out your First Name!")
      } else if (this.lastName === undefined) {
        alert("Make sure to fill out your Last Name!")
      } else {
      if (localStorage.getItem('rsvp_id') === null) {
        this.rsvpID = this.firstName + "-" + this.lastName + "-" + Math.floor(Math.random() * 101);
        localStorage.setItem('rsvp_id', this.rsvpID);
      } else {
        this.rsvpID = localStorage.getItem('rsvp_id');
        this.submitted = true;
        this.submittedReadOn = true;
    };

      this.attending = true;
      this.editMode = false;
      console.log(this);
      this.afs.collection('rsvps').doc(this.rsvpID).set({ // creates a custom ID when posting - see above comment
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
      // this.afs.collection('rsvps').add({'firstName': this.firstName, 'lastName': this.lastName}); // .add method will create a unique id
      this.submitted = true;
      this.submittedReadOn = true;
      alert('Thanks for letting us know ' + this.firstName + '!');
    }
  }

    regretRsvp() {
      console.log(this.firstName);
      if (this.firstName === undefined) {
        alert("Make sure to fill out your First Name!")
      } else if (this.lastName === undefined) {
        alert("Make sure to fill out your Last Name!")
      } else {
      if (confirm("Are you sure you wanted to decline the RSVP?")) {
      if (localStorage.getItem('rsvp_id') === null) {
        this.rsvpID = this.firstName + "-" + this.lastName + "-" + Math.floor(Math.random() * 101);
        localStorage.setItem('rsvp_id', this.rsvpID);
      } else {
        this.rsvpID = localStorage.getItem('rsvp_id');
        this.submitted = true;
        this.submittedReadOn = true;
    };
    
      this.attending = false;
      this.editMode = false;
      console.log(this);
      this.afs.collection('rsvps').doc(this.rsvpID).set({ // creates a custom ID when posting - see above comment
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
      // this.afs.collection('rsvps').add({'firstName': this.firstName, 'lastName': this.lastName}); // .add method will create a unique id
      this.submitted = true;
      this.submittedReadOn = true;
      alert('We are sorry you unable to attend ' + this.firstName + ' :(');
    }
  }
}

  /*
    "onSubmit"
    Submits the RSVP form the user enters
  */

    onSubmit(x) {
      this.submitted = true;
      this.submittedReadOn = true;
      this.attending = true;
      alert('Thanks for letting us know ' + x.target["0"].value + '!');
      console.log(x);

      interface RSVPResponse {
        _id: string;
        name: string;
        email: string;
      }

      const req = this.http.post<RSVPResponse>('https://wedding-rsvp-mongo.herokuapp.com/api/contacts', {
        name: x.target["0"].value,
        email: 'bar',
        attending: 'true'
      })
        .subscribe(
          res => {
            console.log('it worked!');
            console.log(res);
            localStorage.setItem('rsvp_id', res._id);
            this.rsvpName = res.name;
            this.rsvpEmail = res.email;
          },
          err => {
            console.log('Error occured');
          }
        );
  }

   /*
    "editRSVP"
    When the user has already submitted the RSVP, they have the
    ability to edit their submission. When clicking the edit button,
    editRSVP function will present the RSVP form to edit again.
  */

  editRSVP() {
    this.editMode = true;
    this.submittedReadOn = false;
    this.submittedEdit = true;
  }

  removeGuest() {
    this.guestCount = this.guestCount - 1;
  }

  /*
    "editRSVP"
    When the user has already submitted the RSVP, they have the
    ability to edit their submission. When clicking the edit button,
    editRSVP function will present the RSVP form to edit again.
  */

  accept() {
    document.getElementById("submit").click();
  }

  cancelEditRSVP() {
    this.edit = true;
    this.submittedReadOn = true;
    this.submittedEdit = false;
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

  /*
    "onSubmitUpdate"
    If the user decides to edit their original RSVP information,
    the update button will trigger onSubmitUpdate to update the
    record with the new data from the form.
  */

  onSubmitUpdate(x) {
    alert(localStorage.getItem('rsvp_id'));
    this.edit = true;
    this.submitted = true;
    this.submittedReadOn = true;
    this.submittedEdit = false;

    alert('Thanks for updating us know ' + x.target["0"].value + '!');
    console.log(x);
    alert(this.submitted);

    interface RSVPResponse {
      _id: string;
      name: string;
      email: string;
    }

    const req = this.http.put<RSVPResponse>('https://wedding-rsvp-mongo.herokuapp.com/api/contacts/' + localStorage.getItem('rsvp_id'), {
      name: x.target["0"].value,
      email: 'updatedEmailWorked!'
    })
      .subscribe(
        res => {
          console.log('it worked!');
          console.log(res);
          this.rsvpName = res.name;
          this.rsvpEmail = res.email;
        },
        err => {
          console.log('Error occured');
        }
      );
}

  constructor(private http: HttpClient, private afs: AngularFirestore, private rsvpService: AppService) { }

  ngOnInit() {

    // // firebase firestore realtime database setup
    // this.rsvpsCol = this.afs.collection('posts');
    // this.rsvps = this.postsCol.valueChanges();

    /*
      Checks to see if there is a value in localstorage
      to determine if the user has already submitted an
      RSVP. If yes, show form in read-only mode.
      If no, present the user with an RSVP form.
    */
  
    if (localStorage.getItem('rsvp_id') == null) {
    } else {
      this.rsvpID = localStorage.getItem('rsvp_id');
      this.submitted = true;
      this.submittedReadOn = true;
      let that = this;
      
      // grab the firestore document data if the rsvpID exists from local storage
      // this is how to setup a query of a doc and return the value fo the observable...
      this.rsvpService.rsvps.doc(this.rsvpID).ref.get().then(function(doc) {
        if (doc.exists) {
            that.editMode = false;
            console.log("Document data:", doc.data());
            that.rsvpData = doc.data();
            console.log(that.rsvpData);
    
            that.firstName = that.rsvpData.firstName;
            that.lastName = that.rsvpData.lastName;
            that.attending = that.rsvpData.attending;
            that.guestCount = that.rsvpData.guestCount;
            that.firstName_1 = that.rsvpData.firstName_1;
            that.lastName_1 = that.rsvpData.lastName_1;
            that.firstName_2 = that.rsvpData.firstName_2;
            that.lastName_2 = that.rsvpData.lastName_2;
            that.firstName_3 = that.rsvpData.firstName_3;
            that.lastName_3 = that.rsvpData.lastName_3;
            that.firstName_4 = that.rsvpData.firstName_4;
            that.lastName_4 = that.rsvpData.lastName_4;
            that.firstName_5 = that.rsvpData.firstName_5;
            that.lastName_5 = that.rsvpData.lastName_5;
            that.needBus = that.rsvpData.needBus;
            that.email = that.rsvpData.email;
    
    
        } else {
            console.log("No such document!");
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    }

  // testing the localvariable - alert(this.submitted);




}}
