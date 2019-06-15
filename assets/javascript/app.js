var clientIDFoursquare ="QIQOY4DP1NMCYBBDMXYYQOYI0TQDGUX0WJRR5QUJZYV2NLUD";
var clientSecret ="P34QO4OTCFM4J5LFMU3MXH4B4GCXDTZ3EGPZCU1QBCCWBZ0Y"

var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii","Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];


var query = "restaurant"
var searchInput = "Vanderbilt University"
var responsesLimit = 30

var queryURL = `https://api.foursquare.com/v2/venues/search?client_id=${clientIDFoursquare}&client_secret=${clientSecret}&v=20180323&limit=${responsesLimit}&near=${searchInput}&query=${query}`


$( document ).ready(function() {
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
   }).then(function(response){
      console.log (response);
   })

})
       