# Impetus Backend

Backend desenvolvido em JavaScript utilizando Node.js.

---

## Como rodar o projeto localmente com Docker

Para executar o backend localmente via Docker, certifique-se de ter o Docker Engine instalado na sua máquina e siga os passos abaixo:

1. Faça o pull da imagem do backend (baseada na versão em produção):

```bash
docker pull marlosemanuel/backend-impetus
```

2. Execute o container usando o comando:

```bash
docker run -p <porta_local>:3000 marlosemanuel/backend-impetus
```

> **Observação:**  
> Substitua `<porta_local>` pela porta que deseja expor na sua máquina local.

---

## URLs Base para consumo da API

- **Ambiente de produção:**  
  Utilize o link disponível na seção *about* do projeto.

- **Ambiente local (com ou sem Docker):**  
  Use o endereço `http://localhost:<porta>` onde `<porta>` é a porta em que o backend está rodando localmente.

---

## Endpoints da API

### 1. Autenticação de Usuário

#### POST `/users/login`

Autentica um usuário e retorna um **token JWT** para autenticação nas demais rotas protegidas.

- **Request Body (JSON esperado):**

```json
{
  "email": "test@gmail.com",
  "password": "test123"
}
```

- **Cabeçalho para autenticação nas outras rotas:**

```
Authorization: Bearer <token>
```

- **Respostas possíveis:**

| Código | Descrição                                   |
|--------|---------------------------------------------|
| 200    | Autenticação bem sucedida. Retorna o token. |
| 400    | Erro na requisição (ex.: dados inválidos).  |
| 401    | Usuário não encontrado ou credenciais inválidas. |
| 500    | Erro interno do servidor.                    |

---

### 2. Cadastro de Usuário

#### POST `/users`

Endpoint responsável pelo cadastro de um novo usuário.

- **Request Body:**  
  *(Definir os campos obrigatórios para cadastro, exemplo:)*

```json
{
  "name": "Nome do Usuário",
  "email": "usuario@example.com",
  "birthdate": "28-05-2003"
  "password": "senha123"
}
```

- **Respostas possíveis:**

| Código | Descrição                         |
|--------|-----------------------------------|
| 201    | Usuário criado com sucesso.       |
| 400    | Dados inválidos na requisição.    |
| 500    | Erro interno do servidor.         |

---

### 3. Exibir Usuario

#### GET `/users/me` => ROTA PROTEGIDA

este enpoint retorna os dados do usuario.

- **Retorno Esperado (JSON esperado):**

```json
{
  "name": "nome do usuario"
}
```

- **Respostas possíveis:**

| Código | Descrição                         |
|--------|-----------------------------------|
| 200    | Usuario retornado                 |
| 401    | Usuario não autenticado           |
| 404    | Usuario não encontrado            |
| 500    | Erro interno do servidor.         |

---

### 4. adicionar usuário a um grupo

#### POST `/grupos_participantes/:grupoId/:UserId`

Endpoint responsável pela adição de um usuário a um grupo.

**Apenas passar os ids necessários pela url**

- **Request Body:**  
  **

```json
```

- **Respostas possíveis:**

| Código | Descrição                                                                  |
| ------ | -------------------------------------------------------------------------- |
| 201    | Usuário adicionado ao grupo com sucesso.                                   |
| 400    | Dados inválidos: `grupoId` ou `userId` ausentes ou mal formatados.         |
| 404    | Grupo ou usuário não encontrado (caso implemente essa verificação).        |
| 409    | Usuário já faz parte do grupo (caso implemente essa verificação opcional). |
| 500    | Erro interno do servidor.                                                  |

---

### 5. buscar usuarios de um grupo

#### GET `/grupos_participantes/:grupoId/`

Endpoint responsável por buscar usuários de um grupo.

**Apenas passar os ids necessários pela url**

- **Request Body:**  
  **

```json
```

- **Respostas possíveis:**

| Código | Descrição                                                     |
| ------ | ------------------------------------------------------------- |
| 200    | Lista de participantes retornada com sucesso.                 |
| 400    | Requisição inválida (ex: `grupoId` ausente ou mal formatado). |
| 404    | Grupo não encontrado.                                         |
| 500    | Erro interno no servidor.                                     |

---

### 6. criar um grupo

#### POST `/grupos`

Endpoint responsável por criar um grupo.

- **Request Body:**  
  *(Definir os campos obrigatórios para cadastro, exemplo:)*

```json
{
    "nome":"testeando",
    "descricao":"ola",
    "ownerId": "3"
}
```

- **Respostas possíveis:**

| Código | Descrição                                                     |
| ------ | ------------------------------------------------------------- |
| 200    | json com nome do grupo.                 |
| 400    | Requisição inválida e o a mensagem de erro. |
| 404    | Rota nao encontrada.                                         |
| 500    | Erro interno no servidor.                                     |

---

### 7. deletar um grupo

#### DELETE `/grupos`

Endpoint responsável por deletar um grupo.

- **Request Body:**  
  *apenas passar o id pela url*

```json```

- **Respostas possíveis:**

| Código | Descrição                                                     |
| ------ | ------------------------------------------------------------- |
| 200    | Grupo deletado com sucesso.                 |
| 400    | Requisição inválida e o a mensagem de erro. |
| 404    | Rota nao encontrada.                                         |
| 500    | Erro interno no servidor.                                     |

---

### 8. editar um grupo

#### PUT `/grupos`

Endpoint responsável por deletar um grupo.

- **Request Body:**  
  *(Definir os campos obrigatórios para cadastro, exemplo:) e passar id do grupo a ser editado pela url*

```json
{
    "novoNome" : "testando edição",
    "novaDescricao" : "edicao ta funcionando"
}

```

- **Respostas possíveis:**

| Código | Descrição                                                     |
| ------ | ------------------------------------------------------------- |
| 200    | Grupo editado com sucesso.                 |
| 400    | Requisição inválida e o a mensagem de erro. |
| 404    | Rota nao encontrada.                                         |
| 500    | Erro interno no servidor.                                     |

---



