const UserService = require('../src/service/UserService');
const UserRepository = require('../src/repository/UserRepository');

jest.mock('../src/repository/UserRepository'); // mocka o repo para não usar o DB real

describe('UserService.createUser', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // limpa mocks antes de cada teste
  });

  it('deve criar um usuário com sucesso', async () => {
    const userData = {
      name: 'Teste',
      email: 'teste@example.com',
      password: 'senha123',
      birthdate: '1990-01-01'
    };

    // Mock da função create do repository para simular salvar usuário
    UserRepository.create.mockResolvedValue({
      id: 1,
      ...userData,
      password: 'hashed_password_mock',
    });

    const user = await UserService.createUser(userData);

    expect(UserRepository.create).toHaveBeenCalledWith(expect.objectContaining({
      name: userData.name,
      email: userData.email,
      // password deve ser um hash, mas só testamos que a função foi chamada
    }));

    expect(user).toHaveProperty('id');
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
  });

  it('deve lançar erro se faltar campos obrigatórios', async () => {
    await expect(UserService.createUser({})).rejects.toThrow('Preencha todos os campos obrigatórios');
  });
});
