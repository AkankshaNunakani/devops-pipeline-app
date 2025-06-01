const request = require('supertest');
const app = require('./app'); 
describe('GET /api/status', () => {
  it('should return server status', async () => {
    const res = await request(app).get('/api/status');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('Server is running');
  });
});
