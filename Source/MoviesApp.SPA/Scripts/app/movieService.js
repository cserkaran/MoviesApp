"use strict";
angular.module('moviesApp')
.service('MovieService', function ($http, $q) {
    var self = this;
    var cinemaMoviesDbUrl = "/api/" + movieDatabaseTypes.Cinema;
    var filmMoviesDbUrl = "/api/" + movieDatabaseTypes.Film;
    self.allMovies = [];

    self.getAllMovies = function () {

        
            var cinemaPromise = self.getMovies(cinemaMoviesDbUrl, movieDatabaseTypes.Cinema);
            var filmWorldPromise = self.getMovies(filmMoviesDbUrl, movieDatabaseTypes.Film);

            var promises = [cinemaPromise, filmWorldPromise];
            return Promise.any(promises).then(function (result) {
                // at least one of the API calls succeeded
                return self.allMovies;
            }, function () {
                // none of the API calls succeeded
            })
        
    }

    self.getMovies = function (moviesUrl, moviesDbtype) {
        var promise = $http.get(moviesUrl);
        promise.then(function (result) {
            var movies = self.getMoviesFromJson(result);
            for (var i in movies) {
                var movie = new Movie(movies[i], moviesDbtype)
                self.allMovies.push(movie);
            }

        }).catch(function (response) {
            console.error(moviesDbtype + " not available", response.status, response.data);
        })
        return promise;
    };

    self.getMoviesFromJson = function(movies){
       return movies.data.Movies;
    }
});