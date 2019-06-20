   var firebaseConfig = {
    apiKey: "AIzaSyC6czO70FR-41_kSaHpuGOJ1JpfCC5_iOI",
    authDomain: "pinpoint-6e90c.firebaseapp.com",
    databaseURL: "https://pinpoint-6e90c.firebaseio.com",
    projectId: "pinpoint-6e90c",
    storageBucket: "pinpoint-6e90c.appspot.com",
    messagingSenderId: "617094224585",
    appId: "1:617094224585:web:1123e1792b632302"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  $("#add-contact-btn").on("click", function(event) {
    event.preventDefault();
  

    var userName = $("#name-input").val().trim();
    var userEmail1 = $("#email-input1").val().trim();
    var userEmail2 = $("#email-input2").val().trim();
    var userMessage = $("#message-input").val().trim();
  

    var newUser = {
      name: userName,
      email1: userEmail1,
      email2: userEmail2,
      message: userMessage
    };
  
    database.ref().push(newUser);
  

    console.log(newUser.name);
    console.log(newUser.email1);
    console.log(newUser.email2);
    console.log(newUser.message);
  

    $("#name-input").val("");
    $("#email-input1").val("");
    $("#email-input2").val("");
    $("#message-input").val("");
  });
  
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  });
 
  function BothFieldsIdenticalCaseSensitive(email1, email2) {
    var two = document.getElementById(email-input1).value;
    var three = document.getElementById(email-input2).value;
    if(two == three) { return true; }
    alert("Warning!! passcodes must match!!!");
    return false;
};
