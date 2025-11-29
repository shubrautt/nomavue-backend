import { describe, it, expect } from 'vitest';
import request from 'supertest';

import app from '../index.js';

describe('GET /hello', () => {
  it('should return Hello from the hello controller file!', async () => {
    const res = await request(app).get('/api/hello');
    // expect(res.status).toBe(200);
    expect(res.text).toBe('Hello from the hello controller file!');
  });
});
