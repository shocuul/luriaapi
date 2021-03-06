angular.module('luria')
  .controller('ShowDisorderController', function($scope, $sails, $mdDialog, $stateParams, $state, $http, $mdToast){
    //console.log($stateParams);
    $scope.disorder = [];
    $scope.showEdit = true;
    (function(){
        reloadData();
        $sails.on("disorder",function(message){
          if(message.verb=="addedTo"){
            reloadData();
          }
          if(message.verb=="removedFrom"){
            reloadData();
          }
          console.log(message);
        })
    }());

    $scope.toogleEditCriteria = function(){
      $scope.showEdit = $scope.showEdit === false ? true: false;
    }



    function reloadData(){
      $sails.get("/disorder/"+$stateParams.disorderId)
        .success(function(data, status, headers, jwr){
          $scope.disorder = data;
        })
        .error(function(data, status, headers, jwr){
          throw new Error(data);
        });
    }

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

    $scope.editCriteria = function(criteriaData, ev){
      console.log("Edit Criteria");
      $mdDialog.show({
        controller: EditCriteriainDisorderController,
        templateUrl: '/templates/criteria/edit.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals:{
          criteria: criteriaData
        }
      })
      .then(function(answer){
        $scope.alert=answer;
      },function(){
        $scope.alert='Cancelado'
      })
    }

    $scope.showEditCriteriaDialog = function(ev){
      $mdDialog.show({
        controller: EditCriteriaController,
        templateUrl:'/templates/disorder/edit.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals:{
          disorder : $scope.disorder
        }
      })
        .then(function(answer){
          $scope.alert='Tu respuesta fue: ' + answer;
        },function(){
          $scope.alert = ' Cancelado'
        });
    };

    $scope.deleteRelation = function(criteriaId,ev){
      var deleteDisorder = $mdDialog.confirm()
            .title('¿Esta seguro que desea eliminar el criterio de esta desorden?')
            .content('Solo se eliminara la relacion de estos, si quiere eliminar el criterio por completo, favor de eliminarlo desde su pagina principal(Al hacer esto tambien se eliminara de este desorden psicologico)')
            .ariaLabel('Eliminar Criterio del Desorden')
            .ok('Eliminar')
            .cancel('Cancelar')
            .targetEvent(ev);
      $mdDialog.show(deleteDisorder).then(function(){
        var req = {
          method:'DELETE',
          url:'/disorder/'+$stateParams.disorderId+'/criterion/'+criteriaId
        };
        $http(req)
          .success(function(data){
            $mdToast.showSimple('Criterio eliminado del desorden');
          })
      }, function(){
        console.log("No eliminar criterio");
      })
    }

    $scope.showDeleteDialog = function(ev){
      var confirm = $mdDialog.confirm()
            .title('¿Esta seguro que quiere eliminar el desorden?')
            .content('Una vez eliminado no podra ser recuperado.')
            .ariaLabel('Desorden')
            .ok('Eliminar')
            .cancel('Cancelar')
            .targetEvent(ev);
      $mdDialog.show(confirm).then(function(){
        var req = {
          method:'DELETE',
          url:'/disorder/'+$stateParams.disorderId
        }
        $http(req)
          .success(function(data){
            $mdToast.showSimple('Desorden Eliminado');
            $state.go('anon.home');
          })
      }, function(){
        console.log('No eliminar');
      });
    }

    function EditCriteriainDisorderController($scope, $mdDialog, $http, $mdToast, criteria){
      //console.log(criteria);
      $scope.newCriteria = criteria;

      $scope.editCriteria = function(criteriaData){
        console.log(criteriaData);
        var req = {
          method:'PUT',
          url:'/criteria/'+criteriaData.id,
          data: criteriaData
        };

        $http(req)
          .success(function(data){
            $mdDialog.cancel();
          })
          .error(function(data){
            console.log();
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

    function EditCriteriaController($scope, $mdDialog, $http, $mdToast, disorder){
      $scope.newDisorder = disorder;

      $scope.editDisorder = function(disorderData){
        var req = {
          method: 'PUT',
          url:'/disorder/'+$stateParams.disorderId,
          data: disorderData
        };
        $http(req)
          .success(function(data){
            $mdDialog.cancel();
          })
          .error(function(data){
            //console.log(data);
          });
      }
      //console.log($scope);
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

    function AddCriteriaController($scope, $mdDialog, $http, $sails, $mdToast){
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

      $scope.asignCriteria = function(){
        if(!$scope.selectedCriteria){
          $mdToast.showSimple('No as seleccionado un criterio');
        }else{
          var req = {
            method: 'POST',
            url:'/disorder/'+$stateParams.disorderId+'/criterion/'+$scope.selectedCriteria.id
          };
          $http(req)
            .success(function(data){
              $mdDialog.cancel();
            })
            .error(function(data){
              console.log(data);
            })
        }
      }

      $scope.createCriteria = function(newCriteria){
          var req = {
            method:'POST',
            url:'/disorder/'+$stateParams.disorderId+'/criterion/',
            data: newCriteria
          };
          $http(req)
            .success(function(data){
              $mdDialog.cancel();
            })
            .error(function(data){
              console.log(data);
            })
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
