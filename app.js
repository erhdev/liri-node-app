require("dotenv").config();
var keys = require("./keys.js");

var apiCall = process.argv[2]
var subject = process.argv[3]
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)
var axios = require('axios')
let OMBD = 'http://www.omdbapi.com/?apikey=' + keys.omdb.id + '&q=' + subject
let BITown = "https://rest.bandsintown.com/artists/" + subject + "/events?app_id=codingbootcamp"
switch (apiCall) {
    case 'spotify-this-song' :
        spotify.search({ type: 'track', query: subject}, function(err, courier) {
            if (!err) {
            console.log
            (
             courier.tracks.items[0].name.toUpperCase() + '\n----------\n' +
             'Artist: ' + courier.tracks.items[0].artists[0].name + '\n' +
             'Album: '  + courier.tracks.items[0].album.name + '\n' +
             'Listen: ' + courier.tracks.items[0].preview_url + '\n'             
            )
            } else {console.log(err)}
        })
    break;
    case 'movie-this':

        axios.get(OMBD).then(function (courier) {
            console.log(courier.res)
        })
    break;
    case 'concert-this' :
        axios.get(BITown).then(function(courier) {
            console.log(courier)
        })
    break;
}