"use strict";
angular.module('moviesApp')
.service('MovieService', function ($http, $q, MoviesUrlService) {
    var self = this;
   
    self.allMovies = {};

    // get all the movies with cheapest price from multiple movie databases.
    self.getCheapestPricedMovies = function () {

        var movieUrls = MoviesUrlService.movieUrls();
        var promises = [];
        for (var i in movieUrls) {
            var promise = self.getMovies(movieUrls[i].movieUrl, movieUrls[i].movieType);
            promises.push(promise);
        }

        return Promise.any(promises).then(function (result) {
            // at least one of the API calls succeeded
            return sortAssociativeArray(self.allMovies, self.movieSortByTitle);
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
                var movie = movies[i];
                movie.imageUrl = self.getMovieImageUrl(movie.Title);
                var existingMovie = self.allMovies[movie.Title];
                // if movie is not added already, we add it 
                // or if new movie is the same title as another one but with a cheaper price, we replace existing one. 
                if (existingMovie === undefined || existingMovie.Price > movie.Price) {
                    self.allMovies[movie.Title] = movie;
                }
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

    self.getMovieImageUrl = function(title){
        var split = title.split(":");
        return split[1].trim();
    }

  

    self.movieSortByTitle = function (movieA, movieB) {
        var titleA = movieA[1].toLowerCase();
        var titleB = movieB[1].toLowerCase();

        if (titleA < titleB) {
            return -1;
        }
        else if (titleA > titleB) {
            return 1;
        }

        return 0;
    }

});