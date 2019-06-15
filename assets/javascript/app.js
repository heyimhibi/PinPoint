// var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

var clientIDFoursquare = "QIQOY4DP1NMCYBBDMXYYQOYI0TQDGUX0WJRR5QUJZYV2NLUD";
var clientSecret = "P34QO4OTCFM4J5LFMU3MXH4B4GCXDTZ3EGPZCU1QBCCWBZ0Y";

var query = "restaurant";
var responsesLimit = 30;
var queryURL = `https://api.foursquare.com/v2/venues/search?client_id=${clientIDFoursquare}&client_secret=${clientSecret}&v=20180323&limit=${responsesLimit}&near=${searchInput}&query=${query}`

var searchInput = "";

var schoolZip;

$("#search").on("click", function () {
   event.preventDefault();

   searchInput = $("#school-search").val().trim();

   // WORKING BY COLLEGE
   $.ajax({
      url: `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=B8ab3aPW1VmB52ZmHPMpgyftQXVVd1aRiDbYbnxl&school.name=${searchInput}`,
      method: "GET"
   }).then(function (response) {
      var results = response.results[0];
      var schoolCostDiv = $("<div>").text(searchInput + " has an average year cost of " + results.latest.cost.avg_net_price.overall);
      var schoolSizeDiv = $("<div>").text(searchInput + " has " + results.latest.student.enrollment.all + " students currently enrolled.");
      console.log(results.latest);
      console.log(results.latest.cost.attendance.academic_year);
      console.log(results.latest.cost.avg_net_price.overall);
      schoolZip = results.school.zip;
      console.log(results.school.zip);
      console.log(results.school.city);
      console.log(results.school.state);
      console.log(schoolZip);
      $("#results").append(schoolCostDiv, schoolSizeDiv)

      $.ajax({
         url: `https://api.openweathermap.org/data/2.5/weather?q=${schoolZip}&APPID=9f948945c2a7499da3eb43a912f67a23`,
         method: "GET",
         success: function (response) {
            var tempF = (Math.floor((response.main.temp - 273.15) * 1.80 + 32));
            $("#results").append("The current temp in " + searchInput + " is " + tempF + ".")
         },
         error: function () {
            $("#results").append("Whoops! 😕 This is not a valid location.");
         }
      });
   });

});