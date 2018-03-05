// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var imageApp = angular.module("starter", ["ionic","ngCordova","firebase"]);
imageApp.run(function($ionicPlatform){
    $ionicplatform.ready(function(){
        if(window.cordova && window.cordova.plugins.Keyboard){
            cordova.plugins.Keyboard.hideKeyboardAccesssoryBar(true);
            
        }
        if(window.StatusBar){
            StatusBar.styleDefault();
        }
    });
});

imageApp.controller("FirebaseController",function($scope, $state, $firebaseAuth){
    var fbAuth = $firebaseAuth();
    $scope.login= function(username, password){
        fbAuth.$signInWithEmailAndPassword(username,password).then(function(authData){
            $state.go("secure");
        }).catch(function(error){
            console.error("ERROR:" + error);
            
        });
        
    }
    $scope.register = function(username, password) {
        fbAuth.$createUserWithEmailAndPassword(username,password).then(function(userData){
            return fbAuth.$signInWithEmailAndPassword(username, password);
            
        }).then(function(authData){
            $state.go("secure");
            
        }).catch(function(error){
            console.error("ERROR:" + error);
        });
    }
    
    
});
 
imageApp.controller("SecureController", function($scope, $ionicHistory, $firebaseObject, $firebaseArray, $firebaseAuth, $cordovaCamera, $state) {
    $ionicHistory.cleanHistory();
    $scope.images = [];
    $scope.fb = $firebaseAuth();
    var fbAuth = $scope.fb.$getAuth();
    var ref =  firebase.database().ref("users");
    var obj = $firebaseObject(ref);
    if(fbAuth) {
        var userReference = ref.child("users/" + fbAuth.uid);
        var syncArray = $firebaseArray(userReference.child("images"));
        $scope.images = syncArray;
    } else {
        $state.go("firebase");
    }
    $scope.upload = function(){
        var options = {
            quality : 75,
            destinationType : camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType : Camera.EncodingType.JPEG,
            popoverOptions : CameraPopoverOptions,
            targetWidth : 500,
            targetHeight : 500,
            saveToPhotoAlbum: false
        };
        
        $cordovaCamera.getPicture(options).then(function(imageData){
            syncArray.$add({image: imageData}).then(function(){
                alert("Image has been uploaded");
            });
        
        }, function (error) {
        console.log('Failed because: ');
		console.log(error);
      });
    };
  });
    
    


