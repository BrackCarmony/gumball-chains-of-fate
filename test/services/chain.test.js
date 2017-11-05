const assert = require('assert');
const app = require('../../src/app');

describe('\'chain\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/chain');

    assert.ok(service, 'Registered the service');
  });
});
