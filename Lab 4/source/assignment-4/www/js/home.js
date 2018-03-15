angular.module("myApp", ["ionic"]).controller("View1Ctrl", function($scope,$http) {


  $scope.getDetails = function(){

    var item = $scope.search;
    alert(item);
    document.getElementById("notes").innerHTML = "";
    $http.get("https://api.uclassify.com/v1/uClassify/Sentiment/classify/?readKey=ft2H2TffsMcT&text="+item).success(function (response) {
      console.log(response);

      document.getElementById("notes").innerHTML ="Positive Sentiment : "+ response.positive +"<br/>"+"Negative Sentiment : "+response.negative;
    }).error(function (){
      alert("There was some error processing your request. Please try after some time.")
    });


  }


  $scope.faceupload = function(element){
    var reader = new FileReader();
    reader.onload = $scope.faceIsLoaded;
    reader.readAsDataURL(element.files[0]);
  }

  $scope.faceIsLoaded = function(e){
    $scope.$apply(function() {

      document.getElementById("img").src = e.target.result;
      document.getElementById("img").style.removeProperty("display");
    });
  }


  $scope.uploadpic = function() {


    var appkey = "7b7778cf7c31593a3b793efb03ad98d8e1ebceb4";

    document.getElementById("img").style.removeProperty("display");
   var items="";
    $http.get("https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key="+appkey+"&url=https://watson-developer-cloud.github.io/doc-tutorial-downloads/visual-recognition/fruitbowl.jpg&version=2016-05-20").success(function(data){

      for (var i=0;i< 10;i++){
        var temp = data.images[0].classifiers[0].classes[i].class;
        items = items + "<br/>"+temp;
      }
      document.getElementById("details").innerHTML = items;
      console.log(data);

    }).error(function(){
      alert("error");
    });

  }



});



