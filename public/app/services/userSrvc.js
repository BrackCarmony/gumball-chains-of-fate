angular.module('gumball').service('userSrvc', function($http, $q){
  this.login = function(email, password){
    return $http.post('/authentication', {
      strategy:'local',
      email,
      password
    }).then(resp=>{

      localStorage.setItem('token', resp.data.accessToken);
      $http.defaults.headers.common.Authorization = resp.data.accessToken;
      let decoded = Base64.decode(resp.data.accessToken.split('.')[1]);
      decoded = decoded.slice(0,decoded.length-1);

      localStorage.setItem('basicUser',decoded);
      return resp.data;
    }).catch(err=>{
      return $http.post('/users', {
        email,
        password
      }).then(resp=>{
        return this.login(email, password);
      }).catch(err=>{
        console.error(err);
      });
    });
  };

  this.getUser = function(){
    try{
      let basicUser = JSON.parse(localStorage.getItem('basicUser'));

      return $http.get('/users/'+basicUser.userId).then(resp=>resp.data).catch(err=>console.error(err));
    }catch(err){
      console.error(err);
      return $q.when(null);
    }
  };

  this.updateUser = function(user){
    localStorage.setItem('user', JSON.stringify(user));
    return $http.patch('/users/'+user._id, user).then(resp=>resp.data);
  };

  this.getUserById = function(userid){
    return $http.get('/users/'+userid).then(resp=>resp.data).catch(err=>console.error(err));
  };
});
