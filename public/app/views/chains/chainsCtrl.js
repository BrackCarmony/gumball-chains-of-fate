angular.module('gumball').controller('chainsCtrl', function($scope, gumballSrvc, chainSrvc){
  gumballSrvc.getGumballs().then(gb=>{
    $scope.gumballs = gb  ;
    $scope.gumballDict = gb.reduce((dict, e)=>{dict[e._id]=e;return dict;}, {});
    console.log($scope.gumballDict);
  });

  $scope.chain = {gumballs:[]};

  chainSrvc.getChains().then(chains=>{$scope.chains = chains;});

  $scope.createChain = chainSrvc.createChain;

  

});
