
module.exports = {
  before: {
    all: [],
    find: [function(hook){
      console.log(hook.params.query);
      if (hook.params.query.search){
        let search = hook.params.query.search;
        delete hook.params.query.search;
        hook.params.query.name = new RegExp(search, 'i');
      }
      console.log(hook.params.query);
      return hook;
    }],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
