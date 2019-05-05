require("dotenv").config();
var keys = require("./keys.js");

var apiCall = process.argv[2]
var subject = process.argv[3]
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)
var axios = require('axios')
let moment = require('moment')
let fs = require('fs')

function spotifySong() {
    if (typeof subject === 'undefined') {
        subject = 'Trampoline Kero Kero Bonito'
    }
        spotify.search({ type: 'track', query: subject, limit: 1}, function(err, courier) {
            if (!err) {
               console.log
                (
                courier.tracks.items[0].name.toUpperCase() + '\n----------\n' +
                'Artist: ' + courier.tracks.items[0].artists[0].name + '\n' +
                'Album: '  + courier.tracks.items[0].album.name + '\n' +
                'Listen: ' + courier.tracks.items[0].preview_url + '\n' +
                'For the best results, enter the artist as well.' + '\n\n'             
                ) 
            
            } else {console.log(err)}
        })
}
function OMDB() {
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
    
       
}
function Concert() {
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
}
switch (apiCall) {
    case 'spotify-this-song' :
        spotifySong();
    break;
    case 'movie-this':
        OMDB();
    break;
    case 'concert-this' :
        Concert();
    break;
    case 'do-what-it-says' :
    fs.readFile("random.txt", "utf8", function(error, data) {
        var blocks = data.split(',')
        console.log(blocks[0])
        subject = blocks[1]
        if (blocks[0]  === 'spotify-this-song') {
            spotifySong();
        }
        if (blocks[0] === 'movie-this') {
            OMDB();
        }
        if (blocks[0] === 'concert-this') {
            Concert();
        }
    })
    break;
}
