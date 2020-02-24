const Code = require('code');
const Lab = require('lab');
const Server = require('../../app');

const { expect } = Code;
const lab = Lab.script();

// use some BDD verbage instead of lab default
const { describe, it, after } = lab;

exports.lab = lab;

describe('Unit tests - Example', () => {
  it('should get OK 1 + 1', async () => {
    expect(1 + 1).to.equal(2);
  });
});
