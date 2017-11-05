angular.module('gumball').controller('compareCtrl', function($scope, userSrvc, $stateParams, chainSrvc, gumballSrvc){
  chainSrvc.getChains();
  gumballSrvc.getGumballs().then(gb=>{
    $scope.gumballDict = gb.reduce((dict, e)=>{dict[e._id]=e;return dict;}, {});
  });

  userSrvc.getUser().then(user=>{
    $scope.user=user;
    $scope.chains = chainSrvc.reduceChains(user.gumballs);

    userSrvc.getUserById($stateParams._id).then(compare=>{
      $scope.compare = compare;
      $scope.compareChains = chainSrvc.reduceChains(compare.gumballs);

      partition();
    });
  });

  function partition(){
    let possibleChains = _.intersection($scope.chains, $scope.compareChains);
    possibleChains = possibleChains.filter(chain=>{
      if($scope.user.gumballs.indexOf(chain.gumballs[0])!==-1 && $scope.compare.gumballs.indexOf(chain.gumballs[1])!==-1){
        chain.order=1;
        return true;
      }
      if($scope.compare.gumballs.indexOf(chain.gumballs[0])!==-1 && $scope.user.gumballs.indexOf(chain.gumballs[1])!==-1){
        chain.order=2;
        return true;
      }
      return false;
    });
    let grid={true:{true:'waste', false:'greed'},false:{true:'charity',false:'both'}};
    let sorted = possibleChains.reduce((list, chain)=>{
      list[grid[$scope.compare.chains.indexOf(chain._id)!==-1][$scope.user.chains.indexOf(chain._id)!==-1]].push(chain);
      return list;
    },{both:[], greed:[], charity:[], waste:[]});

    $scope.sorted = sorted;
  }

  $scope.addChain = function(chain){
    if ($scope.user.chains.indexOf(chain._id)!==-1) return;
    $scope.user.chains.push(chain._id);
    userSrvc.updateUser($scope.user);
    partition();
  };

});
