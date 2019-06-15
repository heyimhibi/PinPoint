// var clientIDFoursquare = "QIQOY4DP1NMCYBBDMXYYQOYI0TQDGUX0WJRR5QUJZYV2NLUD";
// var clientSecret = "P34QO4OTCFM4J5LFMU3MXH4B4GCXDTZ3EGPZCU1QBCCWBZ0Y"

// var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];


// var query = "restaurant"
// var searchInput = $("#school-search").val().trim();
// var responsesLimit = 30

// var queryURL = `https://api.foursquare.com/v2/venues/search?client_id=${clientIDFoursquare}&client_secret=${clientSecret}&v=20180323&limit=${responsesLimit}&near=${searchInput}&query=${query}`


$(document).ready(function () {

   var clientIDFoursquare = "QIQOY4DP1NMCYBBDMXYYQOYI0TQDGUX0WJRR5QUJZYV2NLUD";
   var clientSecret = "P34QO4OTCFM4J5LFMU3MXH4B4GCXDTZ3EGPZCU1QBCCWBZ0Y"

   // var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];


   var query = "restaurant"
   var responsesLimit = 30
   var searchInput = "";

   // var queryURL = `https://api.foursquare.com/v2/venues/search?client_id=${clientIDFoursquare}&client_secret=${clientSecret}&v=20180323&limit=${responsesLimit}&near=${searchInput}&query=${query}`


   $("#search").on("click", function () {
      event.preventDefault();

      searchInput = $("#school-search").val().trim();

      // WORKING BY COLLEGE
      $.ajax({
         url: `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=B8ab3aPW1VmB52ZmHPMpgyftQXVVd1aRiDbYbnxl&school.name=${searchInput}`,
         method: "GET"
      }).then(function (response) {
         var results = response.results[0];
         console.log(results);
         console.log(results.latest);
         console.log(results.latest.cost.attendance.academic_year);
         console.log(results.latest.cost.avg_net_price.overall);
         console.log(results.school.zip);
         console.log(results.school.city);
         console.log(results.school.state);
         // $("#results").text(results[2018]);
      });

      $.ajax({
         url: queryURL,
         method: 'GET',
         dataType: 'json',
         qs: {
            client_id: clientIDFoursquare,
            client_secret: clientSecret,
            near: searchInput,
            query: query,
            limit: responsesLimit
         }
      }).then(function (response) {
         console.log(response);
      });

   });

//On-Click function for when event topic card is clicked. Making call to FourSquare API.
   $("#fitnessButton").on("click", function(){
      event.preventDefault();
      query = "fitness";
      schoolZip = "";
      var queryURL = `https://api.foursquare.com/v2/venues/explore?client_id=${clientIDFoursquare}&client_secret=${clientSecret}&v=20180323&limit=${responsesLimit}&near=${schoolZip}&query=${query}`;
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
         console.log(response);
      });

   })
});

