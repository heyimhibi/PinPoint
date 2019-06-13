var clientIDFoursquare ="QIQOY4DP1NMCYBBDMXYYQOYI0TQDGUX0WJRR5QUJZYV2NLUD";

var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii","Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

var queryURL = ""



var myurl = "";

$( document ).ready(function() {

         $.ajax({
            url: myurl,
            headers: {
             'Authorization':'Bearer QBIoy42JeuTrF4OPiyOP1Q',
         },
            method: 'GET',
            dataType: 'json',
            success: function(data){
                console.log('success: '+data);
            }
         });   

      console.log("js is working");
        });   