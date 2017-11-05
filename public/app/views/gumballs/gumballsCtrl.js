angular.module('gumball').controller('gumballsCtrl', function($scope, gumballSrvc){
  gumballSrvc.getGumballs().then(gb=>{
    $scope.gumballs = gb;
    sortGbs();
  });

  $scope.user = localStorage.getItem('user');

  if (!$scope.user) $scope.user = {gbs:[]};
  else $scope.user = JSON.parse($scope.user);

  $scope.addGumball = function(gb){
    $scope.user.gbs.push(gb._id);
    sortGbs();
  };
  $scope.removeGumball = function(gb){
    let index = $scope.user.gbs.indexOf(gb._id);
    if (index!=-1){
      $scope.user.gbs.splice(index, 1);
    }
    sortGbs();
  };

  function sortGbs(){
    localStorage.setItem('user', JSON.stringify($scope.user));
    let ans = $scope.gumballs.reduce((prev, cur)=>{
      if ($scope.user.gbs.indexOf(cur._id)>-1){
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
