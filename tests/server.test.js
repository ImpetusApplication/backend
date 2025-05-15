const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../src/app');

const JWT_SECRET = process.env.JWT_SECRET;

describe('Testando GET /', () => {
  it('deve retornar Olá mundo ! com token válido', async () => {
    const token = jwt.sign({ id: 1, email: 'teste@teste.com' }, JWT_SECRET, { expiresIn: '1h' });

    const res = await request(app)
      .get('/')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Olá mundo !');
  });
});
