# 🎨 Frontend - SwishLab

Aplicação mobile (iOS/Android) e web desenvolvida com Expo e React Native.

## 📁 Estrutura

```
frontend/
├── app/                    # Telas (expo-router)
│   ├── auth/              # Telas de autenticação
│   │   ├── login.tsx
│   │   └── cadastro.tsx
│   ├── categorias.tsx     # Tela de categorias
│   ├── categoria-treinos.tsx
│   ├── treinos.tsx
│   ├── detalhe-treinos.tsx
│   ├── video.tsx
│   ├── inicio.tsx
│   ├── index.tsx
│   └── layout.tsx
├── components/            # Componentes reutilizáveis
├── constants/            # Constantes (tema, cores, etc)
├── context/              # React Context (auth)
├── data/                 # Dados estáticos
├── hooks/                # Hooks customizados
├── services/             # Chamadas à API
│   ├── auth.ts          # Autenticação
│   ├── userData.ts      # Usuário
│   ├── treinos.ts       # Treinos
│   └── posicoes.ts      # Posições
├── scripts/              # Scripts utilitários
├── assets/              # Imagens e assets
├── app.json             # Configuração Expo
├── metro.config.js      # Configuração Metro
├── tsconfig.json        # Configuração TypeScript
├── package.json         # Dependências
├── Dockerfile           # Build Docker
└── .env*               # Variáveis de ambiente
```

## 🚀 Como Executar

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor Expo
npm start

# Opções:
# - Pressionar 'i' para iOS
# - Pressionar 'a' para Android
# - Pressionar 'w' para Web
```

### Docker

```bash
# Development
docker-compose up

# Production
docker-compose -f docker-compose.prod.yml up

# Scripts auxiliares (Windows)
.\docker-prod.ps1 up
.\docker-prod.ps1 logs
.\docker-prod.ps1 down
```

## 🔧 Configuração

### Variáveis de Ambiente

```env
# .env.local (desenvolvimento)
EXPO_PUBLIC_API_URL=http://localhost:3000/api

# .env.prod (produção)
EXPO_PUBLIC_API_URL=https://api.seu-dominio.com/api
```

## 📦 Dependências Principais

- **expo** - Framework React Native
- **expo-router** - Navegação
- **react-native** - Core mobile
- **@react-navigation** - Navegação
- **@react-native-async-storage/async-storage** - Armazenamento local
- **typescript** - Type safety

## 🎯 Telas Principais

| Tela | Rota | Descrição |
|------|------|-----------|
| Login | `/auth/login` | Fazer login |
| Cadastro | `/auth/cadastro` | Criar conta |
| Categorias | `/categorias` | Listar categorias de treino |
| Treinos | `/categoria-treinos` | Treinos por categoria |
| Detalhes | `/detalhe-treinos` | Detalhes do treino |
| Vídeo | `/video` | Reproduzir vídeo treino |
| Início | `/inicio` | Posições de basquete |

## 🔐 Autenticação

- JWT token armazenado em AsyncStorage
- Token enviado em cada requisição
- Auto-logout se token expirar
- Refresh automático de token

## 📱 Plataformas

- **iOS** - via Expo Go ou standalone app
- **Android** - via Expo Go ou standalone app
- **Web** - Acesso via navegador em `http://localhost:8081`

## 🛠️ Desenvolvimento

### Adicionar Nova Tela

1. Criar arquivo em `app/nova-tela.tsx`
2. Usar expo-router para navegação automática
3. Importar serviços conforme necessário

### Adicionar Novo Serviço API

1. Criar função em `services/`
2. Usar `fetch` com token do AsyncStorage
3. Adicionar tipos em TypeScript

### Estilo

Utilizar tema centralizado em `constants/theme.ts`:
- Cores
- Espaçamento
- Arredondamento
- Tipografia

## 📊 Performance

- Build otimizado para produção
- Code splitting automático
- Lazy loading de telas
- Cacheing de assets

## 🐛 Debugging

```bash
# Ver logs Expo
npm start

# Acessar React Native Debugger
# Menu → Open React DevTools

# Ver AsyncStorage (Web)
Chrome DevTools → Application → Local Storage
```

## 📝 Notas

- Todas as telas usam SafeAreaView
- StatusBar customizado por tela
- Suporte completo a TypeScript
- Temas de cor dinâmicos

## 🔗 Referências

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Expo Router](https://expo.github.io/router)
- [React Navigation](https://reactnavigation.org)
