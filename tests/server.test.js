const request = require('supertest')
const app = require('../src/app');

describe('Testando GET /', ()=>{
    it('deve retornar Olá mundo !', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Olá mundo !');
      });
});