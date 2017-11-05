const assert = require('assert');
const app = require('../../src/app');

describe('\'gumball\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/gumball');

    assert.ok(service, 'Registered the service');
  });
});
