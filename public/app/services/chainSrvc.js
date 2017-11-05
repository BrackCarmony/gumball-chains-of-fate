angular.module('gumball').service('chainSrvc', function($http, $q){
  this.getChains = function(page=1){

    let chains = localStorage.getItem('chains');
    if (!chains){
      let a = a=>{
        return a.data.data;
      };
      return $q.all([
        $http.get('/api/chain?$limit=50&$skip=0').then(a),
        $http.get('/api/chain?$limit=50&$skip=50').then(a),
        $http.get('/api/chain?$limit=50&$skip=100').then(a),
        $http.get('/api/chain?$limit=50&$skip=150').then(a)]).then(resp=>{
        let chains = [...resp[0], ...resp[1], ...resp[2], ...resp[3]];
        // localStorage.setItem('chains', JSON.stringify(chains));
        return chains;
      }).catch(err=>{
        console.log(err);
      });
    }
    chains = JSON.parse(chains);
    return $q.when(chains);

  };

  this.createChain = function(chain){
    console.log('creating ', chain);
    return $http.post('/api/chain', chain).then(resp=>{
      console.log(resp);
      return resp.data;
    });
  };

  this.updateChain = function(chain){
    return $http.put('/api/chain/'+chain._id, chain);
  }
  this.deleteChain = function(chain){
    return $http.delete('/api/chain/'+chain._id);
  }

});
