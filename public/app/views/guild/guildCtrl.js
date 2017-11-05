angular.module('gumball').controller('guildCtrl', function($scope, userSrvc, guildSrvc){

  userSrvc.getUser().then(user=>$scope.user=user);
  $scope.searchGuild = _.debounce(()=>{
    console.log('test', $scope.guildSearch);
    guildSrvc.search($scope.guildSearch).then(guilds=>{$scope.guilds=guilds;});
  }, 250);

  $scope.registerGuild = function(){
    guildSrvc.registerGuild($scope.newGuildName).then(guild=>{
      $scope.members = [$scope.user.userId];
      $scope.joinGuild(guild);
    });
  };

  $scope.joinGuild = function (guild){
    $scope.user.guild = guild;
    userSrvc.updateUser($scope.user).then(resp=>{
      $scope.loadMembers();
    });
  };

  $scope.loadMembers = function(){
    guildSrvc.getMemebers($scope.user.guild._id).then(mem => $scope.members=mem);
  };


  userSrvc.getUser().then(user=>{
    $scope.user = user;
    if (user.guild){
      $scope.loadMembers();
    }
  });

  $scope.updateUser = _.debounce(userSrvc.updateUser, 250);

});
