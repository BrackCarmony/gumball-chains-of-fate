angular.module('gumball').service('gumballSrvc', function($http, $q){
  this.getGumballs = function(page=1){

    let gumballs = localStorage.getItem('gumballs');
    gumballs = JSON.parse(gumballs);
    if (!gumballs || !gumballs.length){

      let a = a=>{
        return a.data.data;
      };
      return $q.all([
        $http.get('/api/gumball?$limit=50&$skip=0').then(a),
        $http.get('/api/gumball?$limit=50&$skip=50').then(a),
        $http.get('/api/gumball?$limit=50&$skip=100').then(a),
        $http.get('/api/gumball?$limit=50&$skip=150').then(a)]).then(resp=>{
        let gumballs = [...resp[0], ...resp[1], ...resp[2], ...resp[3]];
        localStorage.setItem('gumballs', JSON.stringify(gumballs));
        return gumballs;
      }).catch(err=>{
        console.log(err);
      });
    }

    return $q.when(gumballs);

  };

  this.createGumball = function(gumball){
    console.log('creating ', gumball);
    return $http.post('/api/gumball', gumball).then(resp=>{
      console.log(resp);
      return resp.data;
    });
  };

  this.updateGumball = function(gumball){
    return $http.put('/api/gumball/' + gumball._id, gumball);
  };

  this.deleteGumball = function(gumball){
    return $http.delete('/api/gumball/'+gumball._id);
  };


});
