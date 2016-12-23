var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

var refresh = function() {
  $http.get('/posts').success(function(response) {
    console.log("I got the data I requested");
    $scope.posts = response;
    $scope.post = "";
  });
};

refresh();

$scope.addPost = function() {
  console.log($scope.post);
  $http.post('/posts', $scope.post).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/posts/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/posts/' + id).success(function(response) {
    $scope.post = response;
  });
};  

$scope.update = function() {
  console.log($scope.post._id);
  $http.put('/posts/' + $scope.post._id, $scope.post).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.post = "";
}

}]);﻿
