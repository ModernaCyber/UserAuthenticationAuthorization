import supertest from 'supertest';
import { describe, it, expect } from '@jest/globals';
import { app } from '../server';

describe('Main server test', () => {
  it('should test server.js', async () => {
    // const response = await supertest(app).get('/');
    // expect(response.status).toBe(200);
    return supertest(app)
      .get('/')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });
});
