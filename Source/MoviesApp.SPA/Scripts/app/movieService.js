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

        // even if at least one of the API calls succeeded
        // or none of the API calls succeeded. still return whatever filled, even if empty..
        return Promise.any(promises).then(self.SortResult, self.SortResult);
    };

    // get movie from a particular movie database.
    self.getMovies = function (moviesUrl, moviesDbtype) {
        // since async and await are not available yet,using the closures 
        // and promises to achieve similar functionality to async and await.
        var moviesDeferred = $q.defer();
        var moviesPromise = moviesDeferred.promise;

        moviesDeferred.resolve($http.get(moviesUrl));
        // now we await on fetching the movies..
        var returnPromise = moviesPromise.then(function () {
            return function (moviesResult) {

                var movies = self.getMoviesFromJson(moviesResult);

                var defer = $q.defer();
                var deferPromise = defer.promise;
                var moviesDetailsReturnPromises = [];

                // now we await on fetching details of each movie.
                for (var i in movies) {
                    var movie = movies[i];
                    //fetch the movie details.
                    var movieDetailsUrl = moviesUrl + "/" + movie.ID;

                    var movieDetailsDeferred = $q.defer();
                    var movieDetailsPromise = movieDetailsDeferred.promise;
                    movieDetailsDeferred.resolve( $http.get(movieDetailsUrl));
                    var movieDetailsReturnPromise = movieDetailsPromise.then(function (movie) {
                        return function (movieDetail) {
                            //if movie detail is not added already, we add it 
                            //or if new movie is the same title as another one but with a cheaper price, 
                            //we replace existing one. 
                            var existingMovieDetail = self.allMovies[movie.Title];
                            var detail = self.getMovieDetailFromJson(movieDetail);
                            detail.imageUrl = self.getMovieImageUrl(movie.Title);
                            if (existingMovieDetail === undefined || existingMovieDetail.Price > movieDetail.Price) {
                                self.allMovies[movie.Title] = detail;
                            }
                        }
                    }(movie));
                    moviesDetailsReturnPromises.push(movieDetailsReturnPromise);
                }

                // at least one of the API calls succeeded or 
                // none of the API calls succeeded.
                // still return even if it is any empty array..
                var returnAllMovies = function () {
                    return self.allMovies;
                }

                // we wait for any promise to return.
                return Promise.any(moviesDetailsReturnPromises).then(returnAllMovies, returnAllMovies);
                return deferPromise;
            }
        }());
        return returnPromise;
    };

    // parse the movies result and return json array of movies.
    self.getMoviesFromJson = function (movies) {
        return movies.data.Movies;
    };

    self.getMovieDetailFromJson = function (movieDetail) {
        return movieDetail.data;
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

    self.SortResult = function () {
        // at least one of the API calls succeeded
        return sortAssociativeArray(self.allMovies, self.movieSortByTitle);
    }

});