angular.module('luria')
  .controller('CriteriaController', function($scope, $sails, $mdDialog,$filter){
    $scope.criterion = [];

    (function(){
        reloadData();

        $sails.on("criteria", function(message){
          console.log(message);
          if(message.verb == "destroyed"){
            var index = $filter('getIndex')($scope.criterion,parseInt(message.id, 10));
            $scope.criterion.splice(index,1);
          }else if(message.verb == "created"){
            $scope.criterion.push(message.data);
          }else if(message.verb == "updated"){
            var index = $filter('getIndex')($scope.criterion, parseInt(message.id,10));
            $scope.criterion[index] = message.data;
          }else if(message.verb =="addedTo"){
            reloadData();
          }
        })
    }());

    function reloadData(){
      $sails.get("/criteria/")
        .success(function(data, status, headers, jwr){
          $scope.criterion = data;
        })
        .error(function(data, status, headers, jwr){
          throw new Error(data);
        });
    }

  $scope.showNewCriteria = function(ev){
    $mdDialog.show({
      controller: CreateCriteriaCtrl,
      templateUrl: 'templates/createNewCriteria.html',
      parent: angular.element(document.body),
      targetEvent: ev
    })
    .then(function(answer){
      $scope.alert = "La respuesta es " + answer;
    },function(){
      $scope.alert = "Cancelar el dialogo";
    })
  };

  function CreateCriteriaCtrl($scope, $mdDialog, $http){
    $scope.errors = [];

    $scope.createCriteria = function(newCriteria){
      var req = {
        method: 'POST',
        url:'/criteria/create',
        data: newCriteria
      };
      $http(req)
        .success(function(data){
          $mdDialog.cancel();
        })
        .error(function(data){
          console.log(data)
        });
    }

    $scope.hide = function(){
      $mdDialog.hide();
    }

    $scope.cancel = function(){
      $mdDialog.cancel();
    }

    $scope.answer = function(answer){
      $mdDialog.hide(answer);
    }
  }
  })
