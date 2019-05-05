require("dotenv").config();
var keys = require("./keys.js");

var apiCall = process.argv[2]
var subject = process.argv[3]
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)
var axios = require('axios')
let moment = require('moment')
switch (apiCall) {
    case 'spotify-this-song' :
    if (typeof subject === 'undefined') {
        subject = ''
    }
        spotify.search({ type: 'track', query: subject, limit: 5}, function(err, courier) {
            if (!err) {
            for (let i = 0; i < 5; i++) {
            if (i < 4) {
                console.log
                (
                courier.tracks.items[i].name.toUpperCase() + '\n----------\n' +
                'Artist: ' + courier.tracks.items[i].artists[i].name + '\n' +
                'Album: '  + courier.tracks.items[i].album.name + '\n' +
                'Listen: ' + courier.tracks.items[i].preview_url + '\n' +
                'Possibly you were looking for:' + '\n\n'             
                ) 
            }else {
                console.log
                (
                courier.tracks.items[i].name.toUpperCase() + '\n----------\n' +
                'Artist: ' + courier.tracks.items[i].artists[i].name + '\n' +
                'Album: '  + courier.tracks.items[i].album.name + '\n' +
                'Listen: ' + courier.tracks.items[i].preview_url + '\n'                        
                ) 
            }}
            } else {console.log(err)}
        })
    break;
    case 'movie-this':
    if (typeof subject === 'undefined') {
        
        subject = 'Detective Pikachu'
      
    } 
    let OMBD = 'http://www.omdbapi.com/?apikey=trilogy&' + 't=' + subject
        axios.get(OMBD).then(function (courier) {

            console.log
            (courier.data.Title.toUpperCase() + '\n---------\n' +
            `Plot: ${courier.data.Plot}` + '\n' +
            `Released ${courier.data.Year}` + '\n' +
            `Directed By ${courier.data.Director}` + '\n' + 
            `Actors: ${courier.data.Actors}` + '\n' + 
             `The movie is in ${courier.data.Language}` + '\n' +
             `The movie was produced in ${courier.data.Country}` + '\n' +
             `The movie has a ${courier.data.imdbRating} on IMDB and a ${courier.data.Metascore} on Rotten Tomatoes.`)
       

    })
    
        
    break;
    case 'concert-this' :
    if (typeof subject === 'undefined') {
        subject = 'BROCKHAMPTON'
    }
    let BITown = "https://rest.bandsintown.com/artists/" + subject + "/events?app_id=codingbootcamp";
    axios.get(BITown).then(function(courier) {
            console.log(`${subject} is coming to...` + '\n---------')
            for (let i = 0; i < courier.data.length; i++) {
            console.log(`${courier.data[i].venue.name}, in ${courier.data[i].venue.city}, ${courier.data[i].venue.country} on ${moment(courier.data[i].datetime).format('MMMM Do YYYY')}` + '\n')
            }
        })
    break;
}