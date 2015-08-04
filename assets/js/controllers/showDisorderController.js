angular.module('luria')
  .controller('ShowDisorderController', function($scope, $sails, $mdDialog, $stateParams){
    console.log($stateParams);
    $scope.disorder = [];
    (function(){
      $sails.get("/disorder/"+$stateParams.disorderId)
        .success(function(data, status, headers, jwr){
          $scope.disorder = data;
        })
        .error(function(data, status, headers, jwr){
          throw new Error(data);
        });
    }());
  })
