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

    $scope.showAddCriteriaDialog = function(ev){
      $mdDialog.show({
        controller: AddCriteriaController,
        templateUrl:'/templates/criteria/create.html',
        parent: angular.element(document.body),
        targetEvent: ev
      })
        .then(function(answer){
          $scope.alert = ' Tu respuesta fue : ' + answer;
        },function(){
          $scope.alert = 'Dialogo cancelado';
        });
    };
  })

  function AddCriteriaController($scope, $mdDialog, $http, $sails){
    $scope.criteriaList = [];
    (function(){
      $sails.get("/criteria/")
        .success(function(data, status, headers, jwr){
          $scope.criteriaList = data;
        })
        .error(function(data, status, headers, jwr){
          throw new Error(data);
        });
    }());
    $scope.selectCriteria = function(criteria){
      console.log(criteria);
      $scope.selectedCriteria = criteria;
    }
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
  }
