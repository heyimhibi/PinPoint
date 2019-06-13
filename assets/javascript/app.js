var clientIDFoursquare ="QIQOY4DP1NMCYBBDMXYYQOYI0TQDGUX0WJRR5QUJZYV2NLUD";
var clientSecret ="P34QO4OTCFM4J5LFMU3MXH4B4GCXDTZ3EGPZCU1QBCCWBZ0Y"

var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii","Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];


var query = "coffee"

var queryURL = `https://api.foursquare.com/v2/venues/explore?client_id=${clientIDFoursquare}&client_secret=${clientSecret}&v=20180323&limit=1&ll=40.7243,-74.0018&query=${query}`



var myurl = "";

$( document ).ready(function() {
   $.ajax({
      url: queryURL,
      method: 'GET',
      dataType: 'json',
      success: function(data){
         console.log('success' + data);
      }

    })
    .catch(function() {
       console.log("error");
        // Code for handling errors
    });

      console.log("js is working");
        });   