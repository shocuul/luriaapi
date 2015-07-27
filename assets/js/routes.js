angular.module('luria')
  .config(function($stateProvider, $urlRouterProvider, AccessLevels){
    $stateProvider
      .state('anon',{
        abstract:true,
        template:'<ui-view/>',
        data:{
          access: AccessLevels.anon
        }
      })
      .state('anon.home',{
        url:'/',
        templateUrl:'home.html'
      });
    $urlRouterProvider.otherwise('/');
  });
