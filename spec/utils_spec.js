/* run "npm test" to start unit test */
/* global it, describe, expect */

const app = require('../src/utils/getPoi');

const baseUrl = 'http://localhost:8080/';

describe('Backend Server', () => {
  describe('GET /', () => {
    it('returns index response', (done) => {
      app.getPoiPersoAll (error, response) => {
        await expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
