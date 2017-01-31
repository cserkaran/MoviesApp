"use strict";
var app = angular.module('moviesApp',['ngMaterial','ngMdIcons']);
app.controller('MoviesAppController', function ($scope, $http, MovieService, $timeout, $q) {

    $scope.movies = [];
    MovieService.getAllMovies().then(function (movies)
    {
        $scope.movies = movies;
    });

});