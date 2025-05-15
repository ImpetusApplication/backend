const sequelize = require('../src/config/db');

describe('Testa conexão com o banco de dados', () => {
    test('Deve conectar com sucesso', async () => {
      await expect(sequelize.authenticate()).resolves.not.toThrow();
    });
});