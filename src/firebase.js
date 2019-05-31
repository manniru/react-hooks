// basic checking
// if (firebase.apps.length === 0) {
//   firebase.initializeApp({
//     // ... firebase config
//   })
// }

// node module
// example named file: firebase.js
/**
 * Firebase
 * singleton design pattern
 */
var firebase = require("firebase");
var config = {
  apiKey: "AIzaSyB3fJ76UYZG4bsn1HmlN4-y0ZvAWm4YqJ4",
  authDomain: "igrweb.firebaseapp.com",
  databaseURL: "https://igrweb.firebaseio.com",
  projectId: "igrweb",
  storageBucket: "igrweb.appspot.com",
  messagingSenderId: "676058861141",
  appId: "1:676058861141:web:04f440320be82973"
};
firebase.initializeApp(config);

function getInstance() {
  console.log("getting firebase instance");
  if (firebase.appslength === 0) {
    console.log(
      "firebase not yet initialized, initializing, firebase apps length:",
      firebase.apps.length,
      firebase.apps
    );
    firebase.initializeApp(config);
  } else {
    console.log(
      "firebase already initialized, use existing",
      firebase.apps.length,
      firebase.apps
    );
  }
  return firebase;
}

module.exports = {
  getInstance: getInstance
};

// usage
// var firebase = require('./firebase').getInstance();
