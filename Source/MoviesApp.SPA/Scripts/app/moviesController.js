"use strict";
var app = angular.module('moviesApp',['ngMaterial','ngMdIcons']);
app.controller('MoviesAppController', function ($scope, $http, MovieService, $timeout, $q) {

    $scope.movies = [];
    $scope.loading = true;

    try{
        MovieService.getCheapestPricedMovies().then(function (movies)
        {
            $scope.movies = movies;
            $scope.loading = false;
            $scope.$apply();
        }).catch(function(){ 
            $scope.loading = false;
        });;
    }
    catch(err){
        $scope.loading = false;
    }

});