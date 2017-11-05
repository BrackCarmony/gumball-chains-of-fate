angular.module('gumball').service('userSrvc', function($http, $q){
  this.login = function(email, password){
    return $http.post('/authentication', {
      strategy:'local',
      email,
      password
    }).then(resp=>{
      console.log(resp);
      localStorage.setItem('token', resp.data.accessToken);
      localStorage.setItem('basicUser', JSON.stringify(Base64.decode(resp.data.accessToken.split('.')[1])));
      return resp.data;
    });
  };

  this.getUser = function(){
    return $q.when(localStorage.getItem('token'));
  };



  this.getProfile = function(){
    console.log('Hmmm');
    let token = localStorage.getItem('token');
    console.log(token);
    let tokenAry = token.split('.');

    $http.defaults.headers.common.Authorization = token;
    return $http.get('/users').then(e=>e.data)
      .catch(e=>console.error(e));
  };
});
