angular.module('luria')
  .controller('ShowCriteriaController',function($scope, $sails, $mdDialog, $stateParams){
    $scope.criteria = [];
    (function(){
      $sails.get("/criteria/"+$stateParams.criteriaId)
        .success(function(data, status, headers, jwr){
          $scope.criteria = data;
        })
        .error(function(data, status, headers, jwr){
          throw new Error(data)
        });
    }());

  })
