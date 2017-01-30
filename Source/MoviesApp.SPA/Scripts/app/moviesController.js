"use strict";
var app = angular.module('moviesApp', ['ngTouch', 'ui.grid', 'ui.grid.selection']);
app.controller('MoviesAppController', function ($scope, $http,MovieService, $timeout, $q, uiGridConstants) {

    var moviesPromise = MovieService.getAllMovies();
    moviesPromise.then(function (movies)
    {
        alert(movies);
    });

});