"use strict";
angular.module('moviesApp')
.service('MovieService', function ($http, $q, MoviesUrlService) {

    var self = this;
    self.allMovies = {};

    // get all the movies with cheapest price from multiple movie databases.
    // if a movie title is present in multiple provided databases, 
    // the cheapest one will be picked. in case one of the provider is down,
    // we pick the movie title available(irrespective of price in this case).
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

    // parse the json to the movie detail object.
    self.getMovieDetailFromJson = function (movieDetail) {
        return movieDetail.data;
    };

    // since i was not able to access the movie image from the 
    // imdb url(got access denied), i have poster locally in the images folder.
    // the poster name matches the movie title name,removing the Star Wars in this 
    // case as i am assuming that all movies have star wars in the beginning of the title.
    self.getMovieImageUrl = function(title){
        var split = title.split(":");
        return split[1].trim();
    }

    // sort the movies by title. Comparator logic to sort the 
    // movies associative array.
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

    // get the sorted movies list and return a final movies array.
    self.SortResult = function () {
        // at least one of the API calls succeeded
        var sortedArr = sortAssociativeArray(self.allMovies, self.movieSortByTitle);
        var final = [];
        for (var i in sortedArr) {
            final.push(sortedArr[i]);
        }

        return final;
    }

});