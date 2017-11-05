angular.module('gumball').controller('adminCtrl', function($scope, gumballSrvc, chainSrvc, userSrvc){
  $scope.test='What?';
  gumballSrvc.getGumballs().then(gb=>{
    $scope.gumballs = gb  ;
    $scope.gumballDict = gb.reduce((dict, e)=>{dict[e._id]=e;return dict;}, {});
    console.log($scope.gumballDict);
  });

  $scope.chain = {gumballs:[]};

  chainSrvc.getChains().then(chains=>{$scope.chains = chains;});


  $scope.createChain = chainSrvc.createChain;
  $scope.createGumball = gumballSrvc.createGumball;

  $scope.updateChain = chainSrvc.updateChain;
  $scope.updateGumball = gumballSrvc.updateGumball;
  $scope.deleteChain = chainSrvc.deleteChain;
  $scope.deleteGumball = gumballSrvc.deleteGumball;

  $scope.clearStorage = function(){
    console.log('Removing Stroage');
    localStorage.removeItem('gumballs');
    localStorage.removeItem('chains');
  };

  console.log('Why you no fire?');
  userSrvc.getProfile().then(p=>{
    console.log(p);
    $scope.profile = p;
  });

});
