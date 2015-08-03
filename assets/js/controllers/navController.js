angular.module('luria')
  .controller('NavController',function($scope, Auth, CurrentUser, $mdDialog, $mdToast){
    $scope.auth = Auth;
    $scope.user = CurrentUser.user;

    
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.logout = function(){
      Auth.logout();
      $mdToast.showSimple('Asta luego.');
    }

    $scope.showRegister = function(ev){
      $mdDialog.show({
        controller: AuthController,
        templateUrl:'templates/register.html',
        parent: angular.element(document.body),
        targetEvent: ev
      })
      .then(function(answer){
        $scope.alert = "La respuesta es " + answer + "lol";
      },function(){
        $scope.alert = "Cancelaste el dialogo";
      })
    };

    $scope.showLogin = function(ev){
      $mdDialog.show({
        controller: AuthController,
        templateUrl:'/templates/login.html',
        parent: angular.element(document.body),
        targetEvent: ev
      })
      .then(function(answer){
        $scope.alert = 'Dijiste que la informacion es "' + answer + '"';
      },function(){
        $scope.alert = 'Cancelaste el dialogo';
      })
    };


    function AuthController($scope, $mdDialog, Auth, $mdToast){
      $scope.errors = [];

      $scope.login = function(){
        Auth.login($scope.newUser).success(function(result){
          console.log("Authentificado");
          $mdToast.showSimple('Bienvenido');
          $mdDialog.hide();
        }).error(function(err){
          $scope.errors.push(err)
        });
      }

      $scope.register = function(){
        Auth.register($scope.newUser).success(function(){
          console.log("Registrado");
          $mdToast.showSimple('Bienvenido');
          $mdDialog.hide();
        }).error(function(err){
          $scope.errors.push(err);
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
