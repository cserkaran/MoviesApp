// segregate movies urls in separate service so that we can inject any number of 
// movies database apis by just changing this service.
"use strict";
angular.module('moviesApp')
.service('MoviesUrlService', function ($http, $q) {
    var self = this;

    // get the movies urls.
    self.movieUrls = function () {
        var cinemaMoviesDbUrl = "/api/" + movieDatabaseTypes.Cinema;
        var filmMoviesDbUrl = "/api/" + movieDatabaseTypes.Film;
        var urls = [];
        urls.push(new MovieUrl(cinemaMoviesDbUrl,movieDatabaseTypes.Cinema));
        urls.push(new MovieUrl(filmMoviesDbUrl,movieDatabaseTypes.Film));
        return urls;
    }
});