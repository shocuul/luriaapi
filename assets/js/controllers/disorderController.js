angular.module('luria')
  .controller('DisorderController', function($scope, $sails, $mdDialog, $filter){
    $scope.disorders = [];
    (function(){
      $sails.get("/disorder")
        .success(function(data, status, headers, jwr){
          $scope.disorders = data;
          console.log(data);
        })
        .error(function(data, status, headers, jwr){
          throw new Error(data);
        });

        $sails.on("disorder",function(message){
          if(message.verb == "destroyed"){
            var index = $filter('getIndex')($scope.disorders,parseInt(message.id, 10));
            $scope.disorders.splice(index,1);
          }else if(message.verb == "created"){
            $scope.disorders.push(message.data);
          }
        })
    }());

    $scope.showNewDisorder = function(ev){
      $mdDialog.show({
        controller: CreateDisorderCtrl,
        templateUrl: 'templates/createNewDisorder.html',
        parent: angular.element(document.body),
        targetEvent: ev
      })
      .then(function(answer){
        $scope.alert = "La respuesta es " + answer;
      },function(){
        $scope.alert = "Cancelaste el dialogo";
      })
    };

    function CreateDisorderCtrl($scope, $mdDialog, $http){
      $scope.errors = [];

      $scope.createDisorder = function(newDisorder){
        console.log("Creaste un disorder");
        var req = {
          method: 'POST',
          url:'/disorder/create',
          data: newDisorder
        };
        $http(req)
          .success(function(data){
            console.log(data);
            $mdDialog.cancel();
          })
          .error(function(data){
            console.log(data);
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

  }).filter('getIndex',function(){
    return function(input, id){
      var i = 0,
          len = input.length;
      for(;i<len;i++){
        if(+input[i].id == +id){
          return i;
        }
      }
      return null;
    }
  });
