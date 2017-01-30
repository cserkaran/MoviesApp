"use strict";
angular.module('moviesApp')
.service('MovieService', function ($http, $q, MoviesUrlService) {
    var self = this;
   
    self.allMovies = [];

    // get all the movies from multiple movie databases.
    self.getAllMovies = function () {

        var movieUrls = MoviesUrlService.movieUrls();
        var promises = [];
        for (var i in movieUrls) {
            var promise = self.getMovies(movieUrls[i].movieUrl, movieUrls[i].movieType);
            promises.push(promise);
        }

        return Promise.any(promises).then(function (result) {
            // at least one of the API calls succeeded
            return self.allMovies;
        }, function () {
            // none of the API calls succeeded
        })
    };

    // get movie from a particular movie database.
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

    // parse the movies result and return json array of movies.
    self.getMoviesFromJson = function (movies) {
        return movies.data.Movies;
    };
});