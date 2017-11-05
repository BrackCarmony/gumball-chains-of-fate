angular.module('gumball').config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url:'/',
    template:'Home State'
  }).state('gumballs', {
    url: '/gumballs',
    templateUrl: 'app/views/gumballs/gumballs.html',
    controller: 'gumballsCtrl'
  }).state('chains', {
    url: '/chains',
    templateUrl: 'app/views/chains/chains.html',
    controller: 'chainsCtrl'
  }).state('admin', {
    url:'/admin',
    templateUrl:'app/views/admin/admin.html',
    controller:'adminCtrl'
  })
    .state('guild', {
      url:'/guild',
      templateUrl:'app/views/guild/guild.html',
      controller:'adminCtrl'
    });

});
