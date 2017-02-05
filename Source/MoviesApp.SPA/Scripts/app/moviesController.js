"use strict";
var app = angular.module('moviesApp',['ngMaterial','ngMdIcons']);
app.controller('MoviesAppController', function ($scope, $http, MovieService, $timeout, $q) {

    $scope.movies = [];
    $scope.loading = true;
    $scope.showError = false;

    // Check the movies count and if it is zero, no movie is loaded.
    // so show error page.
    var checkMovies = function () {
        $scope.loading = false;
        if ($scope.movies.length === 0 || $scope.movies.length === undefined) {
            $scope.showError = true;
        }
        $scope.$apply();
    }

    //
    $scope.reload = function () {
        location.reload();
    }

    // tried to find a library with finally block for angular but
    // could not...the ones on code.angularjs.org does not seem
    // to have $q.finally implemented.
    MovieService.getCheapestPricedMovies().then(function (movies) {
        $scope.movies = movies;
        checkMovies();
    }).catch(function () {
        $scope.loading = false;
        checkMovies();
    });;
});