angular.module('luria')
  .controller('ShowCriteriaController',function($scope, $sails, $mdDialog, $stateParams, $state, $http, $mdToast){
    $scope.criteria = [];
    (function(){
      reloadData();

      $sails.on("criteria",function(message){
        console.log(message);
      })
    }());

    function reloadData(){
      $sails.get("/criteria/"+$stateParams.criteriaId)
        .success(function(data, status, headers, jwr){
          $scope.criteria = data;
        })
        .error(function(data, status, headers, jwr){
          throw new Error(data)
        });
    }

    $scope.showDeleteDialog = function(ev){
      var confirm = $mdDialog.confirm()
            .title('¿Esta seguro que quiere eliminar el Criterio?')
            .content('Una vez eliminado no podra ser recuperado.')
            .ariaLabel('criterio')
            .ok('Eliminar')
            .cancel('Cancelar')
            .targetEvent(ev);
      $mdDialog.show(confirm).then(function(){
        var req = {
          method:'DELETE',
          url:'/criteria/'+$scope.criteria.id
        }
        $http(req)
          .success(function(data){
            $mdToast.showSimple('Criterio Eliminado');
            $state.go('anon.home');
          })
      }, function(){
        console.log('No eliminar');
      });
    }

    $scope.showEditCriteriaDialog = function(ev){
      $mdDialog.show({
        controller: EditCriteriaController,
        templateUrl: '/templates/criteria/edit.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals:{
          criteria : $scope.criteria
        }
      })
      .then(function(answer){
        $scope.alert = answer;
      },function(){
        $scope.alert='Cancelado';
      })
    }

    function EditCriteriaController($scope, $mdDialog, $http, $mdToast, criteria){
      $scope.newCriteria = criteria;

      $scope.editCriteria = function(criteriaData){
        var req = {
          method: 'PUT',
          url: '/criteria/'+criteriaData.id,
          data: criteriaData
        };
        $http(req)
          .success(function(data){
            $mdDialog.cancel();
          })
          .error(function(data){

          });
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
  })
