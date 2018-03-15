var imageApp=angular.module("starter", ["ionic","ngCordova","firebase"]);

imageApp.controller("FirebaseController", function($scope, $state, $firebaseAuth,$window) {

    var fbAuth = $firebaseAuth();

    $scope.login = function(username, password) {
        fbAuth.$signInWithEmailAndPassword(username,password).then(function(authData) {
            $window.location.href = "Home.html";
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    }

    $scope.register = function(username, password) {
        fbAuth.$createUserWithEmailAndPassword(username,password).then(function(userData) {
            return fbAuth.$signInWithEmailAndPassword(username,password);
        }).then(function(authData) {
          $window.location.href = "Home.html";
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    }

});





