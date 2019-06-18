var states = [{
      "name": "Alabama",
      "abbreviation": "AL"
   },
   {
      "name": "Alaska",
      "abbreviation": "AK"
   },
   {
      "name": "Arizona",
      "abbreviation": "AZ"
   },
   {
      "name": "Arkansas",
      "abbreviation": "AR"
   },
   {
      "name": "California",
      "abbreviation": "CA"
   },
   {
      "name": "Colorado",
      "abbreviation": "CO"
   },
   {
      "name": "Connecticut",
      "abbreviation": "CT"
   },
   {
      "name": "Delaware",
      "abbreviation": "DE"
   },
   {
      "name": "Florida",
      "abbreviation": "FL"
   },
   {
      "name": "Georgia",
      "abbreviation": "GA"
   },
   {
      "name": "Hawaii",
      "abbreviation": "HI"
   },
   {
      "name": "Idaho",
      "abbreviation": "ID"
   },
   {
      "name": "Illinois",
      "abbreviation": "IL"
   },
   {
      "name": "Indiana",
      "abbreviation": "IN"
   },
   {
      "name": "Iowa",
      "abbreviation": "IA"
   },
   {
      "name": "Kansas",
      "abbreviation": "KS"
   },
   {
      "name": "Kentucky",
      "abbreviation": "KY"
   },
   {
      "name": "Louisiana",
      "abbreviation": "LA"
   },
   {
      "name": "Maine",
      "abbreviation": "ME"
   },
   {
      "name": "Maryland",
      "abbreviation": "MD"
   },
   {
      "name": "Massachusetts",
      "abbreviation": "MA"
   },
   {
      "name": "Michigan",
      "abbreviation": "MI"
   },
   {
      "name": "Minnesota",
      "abbreviation": "MN"
   },
   {
      "name": "Mississippi",
      "abbreviation": "MS"
   },
   {
      "name": "Missouri",
      "abbreviation": "MO"
   },
   {
      "name": "Montana",
      "abbreviation": "MT"
   },
   {
      "name": "Nebraska",
      "abbreviation": "NE"
   },
   {
      "name": "Nevada",
      "abbreviation": "NV"
   },
   {
      "name": "New Hampshire",
      "abbreviation": "NH"
   },
   {
      "name": "New Jersey",
      "abbreviation": "NJ"
   },
   {
      "name": "New Mexico",
      "abbreviation": "NM"
   },
   {
      "name": "New York",
      "abbreviation": "NY"
   },
   {
      "name": "North Carolina",
      "abbreviation": "NC"
   },
   {
      "name": "North Dakota",
      "abbreviation": "ND"
   },
   {
      "name": "Ohio",
      "abbreviation": "OH"
   },
   {
      "name": "Oklahoma",
      "abbreviation": "OK"
   },
   {
      "name": "Oregon",
      "abbreviation": "OR"
   },
   {
      "name": "Palau",
      "abbreviation": "PW"
   },
   {
      "name": "Pennsylvania",
      "abbreviation": "PA"
   },
   {
      "name": "Rhode Island",
      "abbreviation": "RI"
   },
   {
      "name": "South Carolina",
      "abbreviation": "SC"
   },
   {
      "name": "South Dakota",
      "abbreviation": "SD"
   },
   {
      "name": "Tennessee",
      "abbreviation": "TN"
   },
   {
      "name": "Texas",
      "abbreviation": "TX"
   },
   {
      "name": "Utah",
      "abbreviation": "UT"
   },
   {
      "name": "Vermont",
      "abbreviation": "VT"
   },
   {
      "name": "Virginia",
      "abbreviation": "VA"
   },
   {
      "name": "Washington",
      "abbreviation": "WA"
   },
   {
      "name": "West Virginia",
      "abbreviation": "WV"
   },
   {
      "name": "Wisconsin",
      "abbreviation": "WI"
   },
   {
      "name": "Wyoming",
      "abbreviation": "WY"
   }
];

$(document).ready(function () {

   animateNormCSS(".fa-map-pin", "bounceInDown");

   var clientIDFoursquare = "QIQOY4DP1NMCYBBDMXYYQOYI0TQDGUX0WJRR5QUJZYV2NLUD";
   var clientSecret = "P34QO4OTCFM4J5LFMU3MXH4B4GCXDTZ3EGPZCU1QBCCWBZ0Y"

   var query = "restaurant"
   var responsesLimit = 30
   var searchInput = "";
   var fitnessResults = [];
   var foodResults = [];
   var shopResults = [];

   var schoolZip;

   for (var i = 0; i < states.length; i++) {
      stateChoice = $("<option>").text(states[i].name).attr("value", states[i].abbreviation);
      $("#state-selection").append(stateChoice);
   };

   $("#state-selection").change(function () {

      var stateSchools = [];
      var dataGovPageNumber = 0;
      var resultsTotal = 0;
      var totalNumberOfSchools = 0;

      var schoolLat = 0;
      var schoolLon = 0;

      $("#school-selection").empty();
      searchInput = $(this).val();
      $("#school-selection").append($("<option>").text("Choose an Institution"));

      getInstitution(dataGovPageNumber);

      $("#search").on("click", function () {
         event.preventDefault();

         animateCSS("#selection-page", "fadeOut", function () {
            $("#selection-page").hide();
            $("#results-page").show();
            animateCSS("#results-page", "fadeIn");
         });

         // Pulls stored school-id from option HTML element
         searchSchoolId = $("#school-selection option:selected").attr("data-id");

         // WORKING BY COLLEGE
         $.ajax({
            url: `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=B8ab3aPW1VmB52ZmHPMpgyftQXVVd1aRiDbYbnxl&id=${searchSchoolId}`,
            method: "GET"
         }).then(function (response) {
            var results = response.results[0];
            console.log(results);
            var schoolName = results.school.name;
            var schoolCost = results.latest.cost.avg_net_price.overall;
            var schoolPop = results.latest.student.enrollment.all;
            if (schoolPop === null) {
               var popMessage = "Whoops! 🤦‍♂️ Something went wrong."
            } else {
               var popMessage = schoolName + " has " + schoolPop + " students currently enrolled.";
            }
            if (schoolCost === null) {
               var costMessage = "Whoops! 🤦‍♂️ Something went wrong."
            } else {
               var costMessage = schoolName + " has an average year cost of $" + schoolCost;
            }
            $("#enrollment").text(popMessage);
            $("#cost").text(costMessage);
            var string = results.school.zip;
            var zipLength = 5;
            schoolZip = string.substring(0, zipLength);
            schoolLat = results.location.lat;
            schoolLon = results.location.lon;

            initMap(schoolLat, schoolLon, searchInput);

            // OpenWeatherMap Search by School Zip
            $.ajax({
               url: `https://api.openweathermap.org/data/2.5/weather?q=${schoolZip}&APPID=9f948945c2a7499da3eb43a912f67a23`,
               method: "GET",
               success: function (response) {
                  console.log(response);
                  var tempF = (Math.floor((response.main.temp - 273.15) * 1.80 + 32));
                  $("#weather").text("The current temp at " + schoolName + " is " + tempF + ".")
               },
               error: function () {
                  $("#weather").text("Whoops! 😕 This is not a valid location.");
               }
            });

         });

         $(".toast").toast("show");

      });

      function getInstitution(num) {
         $(".ball-pulse-sync").show();
         $("#school-group").hide()
         $.ajax({
            url: `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=B8ab3aPW1VmB52ZmHPMpgyftQXVVd1aRiDbYbnxl&school.state=${searchInput}&_fields=school.name,id&_per_page=100&_page=${dataGovPageNumber}&_sort=school.name`,
            method: "GET"
         }).then(function (response) {
            var results = response.results;
            var resultsLength = response.results.length; // 100
            totalNumberOfSchools = response.metadata.total; // 176
            resultsTotal = resultsTotal + resultsLength;
            // Loops through the results to dynamically create dropdown menu options.
            for (var j = 0; j < results.length; j++) {
               schoolChoice = $("<option>").text(results[j]["school.name"]);
               schoolChoice.attr("value", results[j]["school.name"]);
               schoolChoice.attr("data-id", results[j]["id"]);
               $("#school-selection").append(schoolChoice);
            };
            // Increments the page request in order to pull the next sets of institutions.
            dataGovPageNumber++;
            // The function calls itself if there are more schools than the result query max of 100.
            if (resultsTotal < totalNumberOfSchools) {
               getInstitution(num);

            } else {
               $(".ball-pulse-sync").hide();
               $("#school-group").attr("class", "animated zoomIn faster")
               $("#school-group").css("display", "flex");
            }
         });
      };

      function initMap(num1, num2, str) {
         var myMarker = {
            lat: num1,
            lng: num2
         };

         var map = new google.maps.Map(document.getElementById('map'), {
            center: myMarker,
            zoom: 15,
            disableDefaultUI: true
         });

         var marker = new google.maps.Marker({
            position: myMarker,
            map: map,
            title: str,
         });
      };

   });

   //On-Click function for when event topic card is clicked. Making call to FourSquare API for fitness in the area.
   $("#fitnessButton").on("click", function () {
      event.preventDefault();
      $("#search-options").empty();
      query = "fitness";
      var queryURL = `https://api.foursquare.com/v2/venues/explore?client_id=${clientIDFoursquare}&client_secret=${clientSecret}&v=20180323&limit=${responsesLimit}&near=${schoolZip}&query=${query}`;
      var locationAddress = [];
      $.ajax({
         url: queryURL,
         method: 'GET',
         dataType: 'json',
         qs: {
            client_id: clientIDFoursquare,
            client_secret: clientSecret,
            near: schoolZip,
            query: query,
            limit: responsesLimit
         }
      }).then(function (response) {
         for (var i = 0; i < response.response.groups[0].items.length; i++) {
            fitnessResults.push(response.response.groups[0].items[i].venue.name);
            locationAddress.push(response.response.groups[0].items[i].venue.location.formattedAddress[0])
         }
         console.log(response.response.groups[0].items);
         console.log(fitnessResults);
         console.log(locationAddress);
         for (var j = 0; j < fitnessResults.length; j++) {
            var newCard = $("<div class='row'><div class=card  style='width: 18rem;'><div class='card-body' data-fitness=" + j + "><img src='http://assets.dmagstatic.com/wp-content/uploads/2019/01/iStock-871070868-677x451.jpg' class='card-img-top' alt='event-image'><h5 class='card-title mt-2'>" + fitnessResults[j] + "</h5><p class='card-text'>" + locationAddress[j] + "</p></div></div></div>")
            $("#results-page").append(newCard);
         }
      });

   });


   //On-Click function for when event topic card is clicked. Making call to FourSquare API for restaurants in the area.
   $("#foodButton").on("click", function () {
      event.preventDefault();
      $("#search-options").empty();
      query = "restaurants";
      var queryURL = `https://api.foursquare.com/v2/venues/explore?client_id=${clientIDFoursquare}&client_secret=${clientSecret}&v=20180323&limit=${responsesLimit}&near=${schoolZip}&query=${query}`;
      var locationAddress = [];
      $.ajax({
         url: queryURL,
         method: 'GET',
         dataType: 'json',
         qs: {
            client_id: clientIDFoursquare,
            client_secret: clientSecret,
            near: schoolZip,
            query: query,
            limit: responsesLimit
         }
      }).then(function (response) {
         for (var i = 0; i < response.response.groups[0].items.length; i++) {
            foodResults.push(response.response.groups[0].items[i].venue.name);
            locationAddress.push(response.response.groups[0].items[i].venue.location.formattedAddress[0])
         }
         console.log(response.response.groups[0].items);
         console.log(foodResults);
         console.log(locationAddress);
         for (var j = 0; j < foodResults.length; j++) {
            var newCard = $("<div class='row'><div class=card  style='width: 18rem;'><div class='card-body' data-food=" + j + "><img src='http://www.studentbrands.co.za/wp-content/uploads/2016/05/2D_SpitBill.jpg' class='card-img-top' alt='event-image'><h5 class='card-title mt-2'>" + foodResults[j] + "</h5><p class='card-text'>" + locationAddress[j] + "</p></div></div></div>")
            $("#results-page").append(newCard);
         }
      });

   });


   //On-Click function for when event topic card is clicked. Making call to FourSquare API for restaurants in the area.
   $("#shopButton").on("click", function () {
      event.preventDefault();
      $("#search-options").empty();
      query = "shopping";
      var queryURL = `https://api.foursquare.com/v2/venues/explore?client_id=${clientIDFoursquare}&client_secret=${clientSecret}&v=20180323&limit=${responsesLimit}&near=${schoolZip}&query=${query}`;
      var locationAddress = [];
      $.ajax({
         url: queryURL,
         method: 'GET',
         dataType: 'json',
         qs: {
            client_id: clientIDFoursquare,
            client_secret: clientSecret,
            near: schoolZip,
            query: query,
            limit: responsesLimit
         }
      }).then(function (response) {
         for (var i = 0; i < response.response.groups[0].items.length; i++) {
            shopResults.push(response.response.groups[0].items[i].venue.name);
            locationAddress.push(response.response.groups[0].items[i].venue.location.formattedAddress[0])
         }
         console.log(response.response.groups[0].items);
         console.log(shopResults);
         console.log(locationAddress);
         for (var j = 0; j < shopResults.length; j++) {
            var newCard = $("<div class='row'><div class=card  style='width: 18rem;'><div class='card-body' data-shop=" + j + "><img src='http://www.cbc.ca/parents/content/imgs/kidsatconcerts_lead_emissio.jpg' class='card-img-top' alt='event-image'><h5 class='card-title mt-2'>" + shopResults[j] + "</h5><p class='card-text'>" + locationAddress[j] + "</p></div></div></div>")
            $("#results-page").append(newCard);
         }
      });

   });


   //On-Click function for when event topic card is clicked. Making call to FourSquare API for restaurants in the area.
   $("#parksButton").on("click", function () {
      event.preventDefault();
      $("#search-options").empty();
      query = "parks";
      var queryURL = `https://api.foursquare.com/v2/venues/explore?client_id=${clientIDFoursquare}&client_secret=${clientSecret}&v=20180323&limit=${responsesLimit}&near=${schoolZip}&query=${query}`;
      var locationAddress = [];
      $.ajax({
         url: queryURL,
         method: 'GET',
         dataType: 'json',
         qs: {
            client_id: clientIDFoursquare,
            client_secret: clientSecret,
            near: schoolZip,
            query: query,
            limit: responsesLimit
         }
      }).then(function (response) {
         for (var i = 0; i < response.response.groups[0].items.length; i++) {
            parkResults.push(response.response.groups[0].items[i].venue.name);
            locationAddress.push(response.response.groups[0].items[i].venue.location.formattedAddress[0])
         }
         console.log(response.response.groups[0].items);
         console.log(parkResults);
         console.log(locationAddress);
         for (var j = 0; j < parkResults.length; j++) {
            var newCard = $("<div class='row'><div class=card  style='width: 18rem;'><div class='card-body' data-park=" + j + "><img src='http://www.studentbrands.co.za/wp-content/uploads/2016/05/2D_SpitBill.jpg' class='card-img-top' alt='event-image'><h5 class='card-title mt-2'>" + parkResults[j] + "</h5><p class='card-text'>" + locationAddress[j] + "</p></div></div></div>")
            $("#results-page").append(newCard);
         }
      });

   });

});

function animateCSS(element, animationName, callback) {
   const node = document.querySelector(element);
   node.classList.add('animated', animationName, "faster");

   function handleAnimationEnd() {
      node.classList.remove('animated', animationName);
      node.removeEventListener('animationend', handleAnimationEnd);

      if (typeof callback === 'function') callback()
   }

   node.addEventListener('animationend', handleAnimationEnd);
};

function animateNormCSS(element, animationName, callback) {
   const node = document.querySelector(element);
   node.classList.add('animated', animationName);

   function handleAnimationEnd() {
      node.classList.remove('animated', animationName);
      node.removeEventListener('animationend', handleAnimationEnd);

      if (typeof callback === 'function') callback()
   }

   node.addEventListener('animationend', handleAnimationEnd);
};