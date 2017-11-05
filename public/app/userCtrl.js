angular.module('gumball').controller('userCtrl', function($scope, userSrvc){
  console.log('Connected');
  userSrvc.getUser().then(user=>$scope.user=user);
  $scope.email='brackcarmony@gmail.com';
  $scope.password='testpassword';
  $scope.login = function(email, password){
    console.log('Loggin in', email, password);
    userSrvc.login(email, password)
      .then(user=>$scope.user=user)
      .catch(err=>{console.error(err);});
  };
});
