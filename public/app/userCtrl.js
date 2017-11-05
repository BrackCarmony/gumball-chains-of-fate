angular.module('gumball').controller('userCtrl', function($scope, userSrvc){
  userSrvc.getUser().then(user=>$scope.user=user);
  $scope.login = function(email, password){
    userSrvc.login(email, password)
      .then(user=>$scope.user=user)
      .catch(err=>{console.error(err);});
  };
});
