angular.module('luria')
  .controller('DisorderController', function($scope, $sails){
    $scope.disorders = [];
    (function(){
      $sails.get("/disorder")
        .success(function(data, status, headers, jwr){
          $scope.disorders = data;
        })
        .error(function(data, status, headers, jwr){
          throw new Error(data);
        });
    }());

  })
