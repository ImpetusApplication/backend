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
docker run -p <porta_local>:<porta_container> marlosemanuel/backend-impetus
```

> **Observação:**  
> Substitua `<porta_local>` pela porta que deseja expor na sua máquina local, e `<porta_container>` pela porta que a aplicação usa dentro do container (geralmente 3000 ou 8080 — confirme no projeto).

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

#### GET `/users/me`

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
