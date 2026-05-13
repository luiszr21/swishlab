# 🚀 Quick Start - SwishLab

## Iniciar Tudo com Docker (3 passos)

### 1️⃣ Pré-requisito: Instale Docker

[Baixar Docker Desktop](https://www.docker.com/products/docker-desktop)

### 2️⃣ Execute este comando

**Windows (PowerShell):**
```powershell
cd C:\Users\LUISMATHEUSDOSSANTOS\swishlab
.\setup-docker.bat
```

**Mac/Linux:**
```bash
cd ~/swishlab
bash setup-docker.sh
```

**Ou manual (todos os SOs):**
```bash
cd swishlab
docker-compose up -d
```

### 3️⃣ Aguarde 10 segundos e acesse

| Componente | URL |
|-----------|-----|
| Backend API | http://localhost:3000 |
| Frontend | http://localhost:8081 |
| Database | localhost:5432 |

---

## ✅ Verificar se Está Funcionando

```bash
# Health check
curl http://localhost:3000/health

# Listar posições
curl http://localhost:3000/api/positions

# Listar categorias
curl http://localhost:3000/api/categories
```

---

## 🛑 Parar Tudo

```bash
docker-compose down
```

---

## 📚 Documentação Completa

- **BACKEND_API_DOCUMENTATION.md** - Especificação de todas as rotas
- **DOCKER_SETUP_GUIDE.md** - Guia detalhado do Docker
- **BACKEND_SUMMARY.md** - Resumo do que foi implementado
- **backend/README.md** - Setup e desenvolvimento local

---

## 🐛 Se Algo Não Funcionar

```bash
# Ver logs do backend
docker-compose logs -f backend

# Ver logs do database
docker-compose logs -f postgres

# Ver logs de tudo
docker-compose logs -f
```

---

**Pronto! Seu backend está rodando! 🎉**
