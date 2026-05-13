# SwishLab Backend

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 16+ (or use Docker)
- Docker & Docker Compose (opcional)

### Installation

```bash
cd backend
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

### Development

```bash
npm run dev
```

Server will run on `http://localhost:3000`

### Database Migrations

```bash
npm run migrate
```

### Build for Production

```bash
npm run build
npm start
```

---

## 🐳 Docker Setup

### Using Docker Compose (Recommended)

From the project root:

```bash
docker-compose up -d
```

This will start:
- **PostgreSQL** on port 5432
- **Backend API** on port 3000
- **Frontend** on port 8081

### Stop Services

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f backend
```

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── index.ts              # Entry point
│   ├── routes/               # API endpoints
│   │   ├── auth.ts
│   │   ├── positions.ts
│   │   ├── trainings.ts
│   │   ├── categories.ts
│   │   └── users.ts
│   ├── controllers/          # Business logic
│   ├── middleware/           # Express middleware
│   │   ├── auth.ts           # JWT authentication
│   │   └── errorHandler.ts
│   ├── database/             # Database setup
│   │   ├── connection.ts
│   │   └── migrations.ts
│   ├── utils/                # Utilities
│   │   └── jwt.ts
│   ├── types/                # TypeScript types
│   └── data/                 # Static data
│       └── positions.ts
├── dist/                     # Compiled JavaScript
├── Dockerfile
├── package.json
├── tsconfig.json
└── .env.example
```

---

## 🔌 API Endpoints

See `BACKEND_API_DOCUMENTATION.md` in the root directory for complete API documentation.

### Main Routes

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

**Positions**
- `GET /api/positions` - List all positions
- `GET /api/positions/:positionId` - Get position with trainings

**Trainings**
- `GET /api/trainings/by-category/:categoryId` - Get trainings by category
- `GET /api/trainings/skill/:skill` - Get trainings by skill
- `GET /api/trainings/:trainingId` - Get specific training

**Categories**
- `GET /api/categories` - List all categories

**Users**
- `GET /api/users/:userId` - Get user profile
- `PATCH /api/users/:userId` - Update user profile
- `GET /api/users/:userId/training-history` - Get training history
- `POST /api/users/:userId/training-history` - Add training to history

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255),
  password_hash VARCHAR(255) NOT NULL,
  preferred_position VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Training History Table
```sql
CREATE TABLE training_history (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  training_id VARCHAR(255) NOT NULL,
  position_id VARCHAR(50) NOT NULL,
  completed_at TIMESTAMP NOT NULL,
  duration_minutes INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Login Flow

1. User calls `POST /api/auth/login` with email and password
2. Server returns JWT token
3. Client includes token in Authorization header: `Bearer <token>`
4. Server validates token on protected routes

### Token Expiry

Default: 48 hours (configurable via `JWT_EXPIRES_IN`)

---

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 📝 Testing Endpoints

### Using cURL

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "player1",
    "email": "player@example.com",
    "password": "securepass123"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "player@example.com",
    "password": "securepass123"
  }'

# Get positions
curl http://localhost:3000/api/positions
```

### Using Postman

Import this collection base URL:
```
http://localhost:3000/api
```

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Documentation](https://jwt.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

## 📄 License

ISC
