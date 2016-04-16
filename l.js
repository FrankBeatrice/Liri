var keys = require('./keys.js');

var twitter = require('twitter');

var spotify = require('spotify');

var request = require('request');

var prompt = require('prompt');

var fs = require('fs');

user_Argument = process.argv[2];

add_Arguments = process.argv[3];



function switchFunction(personArgument, additionalArguments){
  switch (personArgument) {
    case "my-tweets":
      Twitter_Get();
      break;
    case "spotify-this-song":
      Spotify_Get(additionalArguments);
      break;
    case "movie-this":
      Movie_Get(additionalArguments);
      break;
    case "do-what-it-says":
      Appears_Get();
      break;
    default:
      user_Argument = "No Command";
      add_Arguments = "no arguments";
      console.log("introduce command ('my-tweets', 'spotify-this-song','movie-this')");
  }
};
switchFunction(personArgument, additionalArguments);

function Twitter_Get(){
  add_Arguments = "Last 20 Tweets"
  
  var client = new twitter(keys.twitterKeys);
 
  var par = {screen_name: 'user', count: 20};
  
  client.get('statuses/user_timeline', params, function(error, tweets, response){
  
  if (!error) {
   
    for (var i = 0; i < tweets.length; i++) {
      
      console.log(tweets[i].created_at+ " : " + tweets[i].text);
    
      }
   
    }else {
    
    console.log(error);
   
    }
 
  });

}

function Spotify_Get(additionalArguments) {
  
  if (add_Arguments === undefined) {
  
    add_Arguments = "Bloom";
 
  }else {
 
    add_Arguments = add_Arguments;
  
  }
  
  spotify.search({ type: 'track', query: add_Arguments, limit:1 },

  function(err, data) {
    
    if ( err ) {
      
        console.log('Error occurred: ' + err);
      
        return;
   
    }
   
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("Preview This Song: " + data.tracks.items[0].preview_url);
  });
}

function  Movie_Get(additionalArguments){
 
  if (additionalArguments === undefined) {
   
    add_Arguments = 'Dead Man Walking';
 
  }else {
   
    add_Arguments = process.argv[3];
  }

  request('http://www.omdbapi.com/?t='+add_Arguments+'&y=&plot=short&r=json&tomatoes=true', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      JsonBody = JSON.parse(body);
      console.log(JsonBody.Title);
      console.log(JsonBody.Year);
      console.log(JsonBody.imdbRating);
      console.log(JsonBody.Country);
      console.log(JsonBody.Language);
      console.log(JsonBody.Plot);
      console.log(JsonBody.Actors);
      console.log(JsonBody.tomatoRating);
      console.log(JsonBody.tomatoURL);
    }
  })
}

function Appears_Get() {
  
  fs.readFile('random.txt', 'utf8', function(err,data){
   
    var things = data.split(',');
    
    if (things[1]==undefined) {
     
      add_Arguments = " ";
      
      switchFunction(things[0],add_Arguments);
    }else {
    
      switchFunction(things[0],things[1]);
    }
  
  })

}

function logAction() {
  var milliseconds = Date();
  logData = '\r\n' + milliseconds + ":  "+ personArgument + " - " + additionalArguments
  fs.appendFile('log.txt', logData);

}


logAction();

