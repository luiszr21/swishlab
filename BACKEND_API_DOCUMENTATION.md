# Documentação de API - SwishLab Backend

## Visão Geral

Este documento descreve todas as rotas necessárias para o backend do SwishLab, um aplicativo de treinos de basquete com categorização por posição e habilidade.

**Stack:** Node.js + Express, TypeScript, PostgresSQL 

---

## 1. Autenticação

### 1.1 Registrar Usuário
**POST** `/auth/register`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "string",
  "username": "string"
}
```

**Response (400/500):**
```json
{
  "error": "string"
}
```

---

### 1.2 Fazer Login
**POST** `/auth/login`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "string",
  "username": "string",
  "token": "jwt_token",
  "session": "session_token"
}
```

**Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

---

### 1.3 Obter Usuário Atual
**GET** `/auth/me`

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "string",
  "username": "string"
}
```

**Response (401):**
```json
{
  "error": "Unauthorized"
}
```

---

### 1.4 Fazer Logout
**POST** `/auth/logout`

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Response (200):**
```json
{
  "success": true
}
```

---

## 2. Posições

### 2.1 Listar Todas as Posições
**GET** `/positions`

**Query Parameters:** (opcional)
- `includeTrainings=true` - Incluir treinos em cada posição

**Response (200):**
```json
{
  "positions": [
    {
      "id": "armador",
      "nome": "Armador",
      "abreviacao": "PG",
      "descricao": "O maestro da equipe. Controla o ritmo do jogo e distribui as jogadas.",
      "icone": "🎯",
      "cor": "#FF6B35",
      "treinos": []
    },
    {
      "id": "ala-armador",
      "nome": "Ala-Armador",
      "abreviacao": "SG",
      "descricao": "Especialista em arremessos. Combina drible com pontuação eficiente.",
      "icone": "🏹",
      "cor": "#4ECDC4",
      "treinos": []
    },
    {
      "id": "ala",
      "nome": "Ala",
      "abreviacao": "SF",
      "descricao": "Versátil e dinâmico. Transição entre ataque e defesa.",
      "icone": "⚡",
      "cor": "#A855F7",
      "treinos": []
    },
    {
      "id": "ala-pivô",
      "nome": "Ala-Pivô",
      "abreviacao": "PF",
      "descricao": "Potente no poste. Trabalha na pintura e em aberturas.",
      "icone": "💪",
      "cor": "#EF4444",
      "treinos": []
    },
    {
      "id": "pivô",
      "nome": "Pivô",
      "abreviacao": "C",
      "descricao": "Protetor da garagem. Domina o jogo interior.",
      "icone": "🏀",
      "cor": "#F59E0B",
      "treinos": []
    }
  ]
}
```

---

### 2.2 Obter Posição Específica com Treinos
**GET** `/positions/:positionId`

**URL Parameters:**
- `positionId` - ID da posição (ex: "armador", "ala-armador", etc.)

**Response (200):**
```json
{
  "id": "armador",
  "nome": "Armador",
  "abreviacao": "PG",
  "descricao": "O maestro da equipe. Controla o ritmo do jogo e distribui as jogadas.",
  "icone": "🎯",
  "cor": "#FF6B35",
  "treinos": [
    {
      "id": "armador-1",
      "titulo": "Drible com mudança de direção",
      "descricao": "Domine o drible cruzado e a inversão de bola para quebrar marcações.",
      "duracao": "20 min",
      "habilidade": "Drible",
      "urlYoutube": "https://www.youtube.com/watch?v=3mMH1Kk091g",
      "dicas": ["Mantenha os joelhos flexionados", "Cabeça sempre erguida", "Proteja a bola com o corpo"],
      "start": null,
      "end": null
    }
  ]
}
```

**Response (404):**
```json
{
  "error": "Position not found"
}
```

---

## 3. Treinos

### 3.1 Listar Treinos por Categoria
**GET** `/trainings/by-category/:categoryId`

**URL Parameters:**
- `categoryId` - ID da categoria (arremesso, drible, ataque-defesa, posicao)

**Query Parameters:** (opcional)
- `page=1` - Paginação
- `limit=10` - Limite de itens por página

**Response (200):**
```json
{
  "trainings": [
    {
      "id": "armador-1",
      "titulo": "Drible com mudança de direção",
      "descricao": "Domine o drible cruzado e a inversão de bola para quebrar marcações.",
      "duracao": "20 min",
      "habilidade": "Drible",
      "urlYoutube": "https://www.youtube.com/watch?v=3mMH1Kk091g",
      "dicas": ["Mantenha os joelhos flexionados", "Cabeça sempre erguida", "Proteja a bola com o corpo"],
      "start": null,
      "end": null,
      "position": {
        "id": "armador",
        "nome": "Armador",
        "abreviacao": "PG"
      }
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10
}
```

**Response (400):**
```json
{
  "error": "Invalid category"
}
```

---

### 3.2 Obter Treino Específico
**GET** `/trainings/:trainingId`

**URL Parameters:**
- `trainingId` - ID do treino

**Response (200):**
```json
{
  "id": "armador-1",
  "titulo": "Drible com mudança de direção",
  "descricao": "Domine o drible cruzado e a inversão de bola para quebrar marcações.",
  "duracao": "20 min",
  "habilidade": "Drible",
  "urlYoutube": "https://www.youtube.com/watch?v=3mMH1Kk091g",
  "dicas": [
    "Mantenha os joelhos flexionados",
    "Cabeça sempre erguida",
    "Proteja a bola com o corpo"
  ],
  "start": null,
  "end": null,
  "position": {
    "id": "armador",
    "nome": "Armador",
    "abreviacao": "PG"
  }
}
```

**Response (404):**
```json
{
  "error": "Training not found"
}
```

---

### 3.3 Buscar Treinos por Habilidade
**GET** `/trainings/skill/:skill`

**URL Parameters:**
- `skill` - Habilidade desejada (Drible, Arremesso, Defesa, Passe, Físico, Poste)

**Query Parameters:** (opcional)
- `page=1` - Paginação
- `limit=10` - Limite de itens por página

**Response (200):**
```json
{
  "trainings": [
    {
      "id": "armador-1",
      "titulo": "Drible com mudança de direção",
      "descricao": "Domine o drible cruzado e a inversão de bola para quebrar marcações.",
      "duracao": "20 min",
      "habilidade": "Drible",
      "urlYoutube": "https://www.youtube.com/watch?v=3mMH1Kk091g",
      "dicas": ["Mantenha os joelhos flexionados", "Cabeça sempre erguida", "Proteja a bola com o corpo"],
      "start": null,
      "end": null,
      "position": {
        "id": "armador",
        "nome": "Armador",
        "abreviacao": "PG"
      }
    }
  ],
  "total": 12,
  "page": 1,
  "limit": 10
}
```

**Response (400):**
```json
{
  "error": "Invalid skill"
}
```

---

### 3.4 Obter Treino por Posição e ID
**GET** `/positions/:positionId/trainings/:trainingId`

**URL Parameters:**
- `positionId` - ID da posição
- `trainingId` - ID do treino

**Response (200):**
```json
{
  "id": "armador-1",
  "titulo": "Drible com mudança de direção",
  "descricao": "Domine o drible cruzado e a inversão de bola para quebrar marcações.",
  "duracao": "20 min",
  "habilidade": "Drible",
  "urlYoutube": "https://www.youtube.com/watch?v=3mMH1Kk091g",
  "dicas": ["Mantenha os joelhos flexionados", "Cabeça sempre erguida", "Proteja a bola com o corpo"],
  "start": 0.5,
  "end": 1.1,
  "position": {
    "id": "armador",
    "nome": "Armador",
    "abreviacao": "PG",
    "cor": "#FF6B35"
  }
}
```

**Response (404):**
```json
{
  "error": "Training or position not found"
}
```

---

## 4. Categorias (Backend Helper)

Nota: As categorias são determinadas pelos dados, não por rotas. Porém, uma rota pode ser útil:

### 4.1 Listar Categorias Disponíveis
**GET** `/categories`

**Response (200):**
```json
{
  "categories": [
    {
      "id": "arremesso",
      "nome": "Arremesso",
      "descricao": "Treinos para mecânica, precisão e volume de finalização.",
      "icone": "🎯",
      "cor": "#F59E0B",
      "habilidades": ["Arremesso"]
    },
    {
      "id": "drible",
      "nome": "Drible",
      "descricao": "Controle de bola, mudança de direção e criação de espaço.",
      "icone": "🔄",
      "cor": "#4ECDC4",
      "habilidades": ["Drible"]
    },
    {
      "id": "ataque-defesa",
      "nome": "Ataque e Defesa",
      "descricao": "Treinos de passe, físico, poste e leitura defensiva.",
      "icone": "🛡️",
      "cor": "#EF4444",
      "habilidades": ["Defesa", "Passe", "Físico", "Poste"]
    },
    {
      "id": "posicao",
      "nome": "Posição",
      "descricao": "Abra as posições existentes e veja treinos específicos.",
      "icone": "🏀",
      "cor": "#A855F7",
      "habilidades": []
    }
  ]
}
```

---

## 5. Perfil do Usuário (Futuro)

### 5.1 Obter Perfil do Usuário
**GET** `/users/:userId`

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "string",
  "username": "string",
  "posicaoPreferida": "string",
  "criadoEm": "ISO-8601 datetime",
  "atualizadoEm": "ISO-8601 datetime"
}
```

---

### 5.2 Atualizar Perfil do Usuário
**PATCH** `/users/:userId`

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "username": "string",
  "posicaoPreferida": "string"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "string",
  "username": "string",
  "posicaoPreferida": "string",
  "atualizadoEm": "ISO-8601 datetime"
}
```

---

## 6. Histórico de Treinos (Futuro)

### 6.1 Registrar Treino Completado
**POST** `/users/:userId/training-history`

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "trainingId": "string",
  "positionId": "string",
  "completedAt": "ISO-8601 datetime",
  "duracao": "number (minutes)"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "trainingId": "string",
  "positionId": "string",
  "completedAt": "ISO-8601 datetime",
  "duracao": "number",
  "userId": "uuid"
}
```

---

### 6.2 Obter Histórico de Treinos do Usuário
**GET** `/users/:userId/training-history`

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Query Parameters:** (opcional)
- `page=1` - Paginação
- `limit=20` - Limite de itens por página
- `startDate=2024-01-01` - Filtro por data inicial
- `endDate=2024-12-31` - Filtro por data final

**Response (200):**
```json
{
  "history": [
    {
      "id": "uuid",
      "trainingId": "armador-1",
      "trainingTitle": "Drible com mudança de direção",
      "positionId": "armador",
      "completedAt": "ISO-8601 datetime",
      "duracao": 20
    }
  ],
  "total": 45,
  "page": 1,
  "limit": 20
}
```

---

## 7. Estrutura de Dados

### Habilidades Disponíveis
- `Drible`
- `Arremesso`
- `Defesa`
- `Passe`
- `Físico`
- `Poste`

### Posições
| ID | Nome | Abreviação | Ícone |
|----|------|------------|-------|
| armador | Armador | PG | 🎯 |
| ala-armador | Ala-Armador | SG | 🏹 |
| ala | Ala | SF | ⚡ |
| ala-pivô | Ala-Pivô | PF | 💪 |
| pivô | Pivô | C | 🏀 |

### Categorias
| ID | Nome | Habilidades |
|----|------|-----------|
| arremesso | Arremesso | Arremesso |
| drible | Drible | Drible |
| ataque-defesa | Ataque e Defesa | Defesa, Passe, Físico, Poste |
| posicao | Posição | Todas |

---

## 8. Códigos de Status HTTP

| Código | Significado |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Requisição inválida |
| 401 | Unauthorized - Autenticação necessária ou falhou |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro no servidor |

---

## 9. Fluxo de Autenticação

1. Usuário faz **POST** `/auth/register` ou **POST** `/auth/login`
2. Backend retorna `token` (JWT) e `session`
3. Cliente armazena o token e o inclui em todas as requisições autenticadas
4. Para requisições autenticadas, incluir header: `Authorization: Bearer {token}`
5. Ao fazer logout, **POST** `/auth/logout` para invalidar a sessão

---

## 10. Notas de Implementação

- **Autenticação**: Usar JWT com expiração de 24-48 horas
- **Refresh Token**: Implementar mecanismo de refresh para manter usuário autenticado
- **CORS**: Configurar CORS para aceitar requisições do frontend (Expo)
- **Rate Limiting**: Implementar rate limiting para rotas de autenticação
- **Validação**: Validar email e senha antes de processar
- **Hashing**: Armazenar senhas com hash (bcrypt mínimo 10 rounds)
- **Dados Estáticos**: Posições e treinos podem ser carregados de um arquivo JSON ou banco de dados

---

## 11. Exemplo de Fluxo de Usuário

1. **Registrar/Login**
   - `POST /auth/register` ou `POST /auth/login`
   - Recebe token JWT

2. **Visualizar Categorias**
   - `GET /categories`

3. **Visualizar Treinos por Categoria**
   - `GET /trainings/by-category/arremesso`

4. **Visualizar Treino Específico**
   - `GET /trainings/armador-1`

5. **Visualizar Todas as Posições**
   - `GET /positions`

6. **Visualizar Treinos de uma Posição**
   - `GET /positions/armador`

7. **Fazer Logout**
   - `POST /auth/logout`

---

## Versão
**v1.0** - Documentação inicial
**Data**: 13 de Maio de 2026
