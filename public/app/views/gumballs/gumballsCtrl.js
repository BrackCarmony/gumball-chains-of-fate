angular.module('gumball').controller('gumballsCtrl', function($scope, gumballSrvc, userSrvc){
  gumballSrvc.getGumballs().then(gb=>{
    $scope.gumballs = gb;
    sortGbs();
  });

  userSrvc.getUser().then(user=>{
    $scope.user=user;
    sortGbs();
  });

  $scope.addGumball = function(gb){
    $scope.user.gumballs.push(gb._id);
    sortGbs();
    userSrvc.updateUser($scope.user);
  };

  $scope.removeGumball = function(gb){
    let index = $scope.user.gumballs.indexOf(gb._id);
    if (index!=-1){
      $scope.user.gumballs.splice(index, 1);
    }
    sortGbs();
    userSrvc.updateUser($scope.user);
  };

  function sortGbs(){
    if (!$scope.user || !$scope.user.gumballs){
      return $scope.all = $scope.gumballs;
    }
    let ans = $scope.gumballs.reduce((prev, cur)=>{
      if ($scope.user.gumballs.indexOf(cur._id)>-1){
        prev[0].push(cur);
      }else{
        prev[1].push(cur);
      }
      return prev;
    },[[],[]]);
    $scope.all = ans[1];
    $scope.my = ans[0];
  }


  $scope.createGumball = gumballSrvc.createGumball;

});
