angular.module('gumball').service('chainSrvc', function($http, $q){
  let allChains;
  this.getChains = function(page=1){

    let chains = localStorage.getItem('chains');
    let date = localStorage.getItem('chains_date');
    let old = true;
    if (date){
      date = new Date(date);
      old = (new Date().getTime() - date.getTime())/1000/60/60/24 > 1;
    }

    if (!chains || old){
      let a = a=>{
        return a.data.data;
      };
      return $q.all([
        $http.get('/api/chain?$limit=50&$skip=0').then(a),
        $http.get('/api/chain?$limit=50&$skip=50').then(a),
        $http.get('/api/chain?$limit=50&$skip=100').then(a),
        $http.get('/api/chain?$limit=50&$skip=150').then(a)]).then(resp=>{
        let chains = [...resp[0], ...resp[1], ...resp[2], ...resp[3]];
        allChains = chains;
        localStorage.setItem('chains', JSON.stringify(chains));
        localStorage.setItem('chains_date', JSON.stringify(new Date()));
        return chains;
      }).catch(err=>{
        console.error(err);
      });
    }
    chains = JSON.parse(chains);
    allChains = chains;
    return $q.when(chains);

  };

  this.createChain = function(chain){
    return $http.post('/api/chain', chain).then(resp=>{
      return resp.data;
    });
  };

  this.updateChain = function(chain){
    return $http.put('/api/chain/'+chain._id, chain);
  };
  this.deleteChain = function(chain){
    return $http.delete('/api/chain/'+chain._id);
  };

  this.reduceChains =function(gbs){
    console.log(allChains);
    return allChains.reduce((list, chain)=>{
      if (_.some(chain.gumballs, e=>gbs.indexOf(e)!==-1))
        list.push(chain);
      return list;
    },[]);
  };

});
