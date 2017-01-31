"use strict";
var app = angular.module('moviesApp',[]);
app.controller('MoviesAppController', function ($scope, $http,MovieService, $timeout, $q) {

    var moviesPromise = MovieService.getAllMovies();
    moviesPromise.then(function (movies)
    {
        alert(movies);
    });

});