// Initializes the `chain` service on path `/api/chain`
const createService = require('feathers-mongoose');
const createModel = require('../../models/chain.model');
const hooks = require('./chain.hooks');
const filters = require('./chain.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'chain',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/chain', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/chain');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
