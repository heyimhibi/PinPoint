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
 
  function checkEmail() {
    var e1 = this.email-input1.value;
    var e2 = this.email-input2.value;
    //Email Regex from //stackoverflow.com/a/46181/383904
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var isEmail = re.test( e1 );
    var isMatch = e1 === e2;
    if( !isEmail ){
      event.preventDefault();
      alert('Invalid email address');
    }
    else if ( !isMatch ){
      event.preventDefault();
      alert("Those emails don't match!");
    }
    // return (isEmail && isMatch); // Uncomment if you need a boolean return
  }
  
  
  var form = document.getElementById("theForm");
  form.addEventListener("submit", checkEmail, false);