import request from "supertest";
import server from '../../server';

describe('POST /api/products', () => {

  it('should display errors messages', async () => {
    const response = await request(server).post('/api/products').send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toHaveLength(4);

    expect(response.status).not.toBe(404);
  });

  it('should validate that the price is greater than 0', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'Nintendo Switch',
      price: 0
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should create a new product', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'Monitor Curvo',
      price: 500
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data');

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('error');
  });
});

describe('GET /api/products', () => {
  it('should return a json response', async () => {
    const response = await request(server).get('/api/products');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.headers['content-type']).toMatch(/json/);

    expect(response.status).not.toBe(400);
  });
});

describe('GET /api/products/:id', () => {
  it('should return a 404 response for a non-existent product', async () => {
    const productId = 100;
    const response = await request(server).get(`/api/products/${productId}`);
    
    expect(response.status).toBe(404);
  });

  it('should check if it is a vild ID', async () => {
    const response = await request(server).get('/api/products/not-valid-url');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  })
});

// describe('PUT /api/products/:id', () => {
  // });
  
describe('PATCH /api/products', () => {
  it('should response a 404 for a non valid ID', async () => {
    const response = await request(server).patch('/api/products/3000');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});

describe('DELETE /api/products/:id', () => {
  it('should check a valid ID', async () => {
    const response = await request(server).delete('/api/products/not-valid-ID');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});