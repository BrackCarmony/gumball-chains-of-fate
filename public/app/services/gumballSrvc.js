angular.module('gumball').service('gumballSrvc', function($http, $q){
  this.getGumballs = function(page=1){

    let gumballs = localStorage.getItem('gumballs');
    gumballs = JSON.parse(gumballs);
    let date = localStorage.getItem('gumballs_date');
    let old = true;
    if (date){
      date = new Date(date);
      old = (new Date().getTime() - date.getTime())/1000/60/60/24 > 1;
    }

    if (!gumballs || !gumballs.length || old){
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
        localStorage.setItem('gumballs_date', JSON.stringify(new Date()));
        return gumballs;
      }).catch(err=>{
        console.error(err);
      });
    }

    return $q.when(gumballs);

  };

  this.createGumball = function(gumball){
    return $http.post('/api/gumball', gumball).then(resp=>{
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
