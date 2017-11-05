angular.module('gumball').service('guildSrvc', function($http){
  this.search = function(qry){
    return $http.get('/api/guild?search='+qry).then(resp=>resp.data.data).catch(err=>console.error(err));
  };

  this.registerGuild = function(name){
    return $http.post('/api/guild', {
      name
    }).then(e=>e.data);
  };

  this.getMemebers = function(guildId){
    return $http.get('/users?$limit=50&guild='+guildId).then(resp=>resp.data.data).catch(err=>console.error(err));
  };
});
