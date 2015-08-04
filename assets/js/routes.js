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

      $stateProvider
        .state('disorder',{
          abstract: true,
          template:'<ui-view/>',
          data:{
            access: AccessLevels.user
          }
        })
        .state('disorder.show',{
          url:'/show/:disorderId',
          templateUrl: 'disorder/show.html',
          controller: 'ShowDisorderController'
        });
    $urlRouterProvider.otherwise('/');
  });
