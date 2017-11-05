angular.module('gumball').controller('chainsCtrl', function($scope, gumballSrvc, userSrvc, chainSrvc){

  gumballSrvc.getGumballs().then(gb=>{
    $scope.gumballDict = gb.reduce((dict, e)=>{dict[e._id]=e;return dict;}, {});
  });

  chainSrvc.getChains();

  $scope.addChain = function(chain){
    $scope.user.chains.push(chain._id);
    userSrvc.updateUser($scope.user);
    partition();
  };

  $scope.removeChain = function(chain){
    let index = $scope.user.chains.indexOf(chain._id);
    if(index!=-1){
      $scope.user.chains.splice(index, 1);
      userSrvc.updateUser($scope.user);
      partition();
    }
  };

  userSrvc.getUser().then(user=>{
    $scope.user=user;
    $scope.chains = chainSrvc.reduceChains(user.gumballs);
    console.log($scope.chains);
    console.log($scope.chains.length);
    partition();
  });

  function partition(){
    let part = _.partition($scope.chains, (e=>$scope.user.chains.indexOf(e._id)!==-1));
    $scope.earned = part[0];
    $scope.unearned =part[1];
  }

});
