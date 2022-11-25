import { Component } from '@angular/core';
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyC_FbPy27TiOBn2N86DORTxfQMrmpEtZpg',
  authDomain: 'chat-68de1.firebaseapp.com',
  databaseURL: 'https://chat-68de1-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chat-68de1',
  storageBucket: 'chat-68de1.appspot.com',
  messagingSenderId: '398552982119',
  appId: '1:398552982119:web:23287581603a9f89496ac2',
  measurementId: 'G-QM7KRKPKNV'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book';
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }
}
