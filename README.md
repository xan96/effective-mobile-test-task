# User Service

REST API для управления пользователями + Vue 3 фронтенд.

## Стек

- **Backend:** Express + TypeScript + Sequelize + PostgreSQL + JWT
- **Frontend:** Vue 3 (Composition API) + Vuex 4 + Vue Router

## Быстрый старт

```bash
# 1. БД (Docker)
docker compose up -d

# 2. Backend
npm install
cp .env.example .env
npm run dev
npm run seed  # создать admin

# 3. Frontend
cd frontend
npm install
npm run dev
```

- Backend: http://localhost:3000
- Frontend: http://localhost:5173
- Admin: `admin@example.com` / `admin123`

## API

| Метод | Endpoint | Описание | Доступ |
|-------|----------|----------|--------|
| POST | `/api/auth/register` | Регистрация | Публичный |
| POST | `/api/auth/login` | Авторизация | Публичный |
| GET | `/api/users` | Список пользователей | Admin |
| GET | `/api/users/:id` | Пользователь по ID | Admin / владелец |
| PATCH | `/api/users/:id/block` | Блокировка | Admin / владелец |

## Структура

```
src/
├── config/        # Конфигурация
├── controllers/   # HTTP обработчики
├── dto/           # Валидация (Zod)
├── entities/      # TypeORM сущности
├── middleware/    # Auth, rate limit, errors
├── routes/        # Маршруты API
├── services/      # Бизнес-логика
└── utils/         # JWT, bcrypt, errors

frontend/src/
├── api/           # Axios клиент
├── pages/         # Страницы
├── router/        # Vue Router + guards
├── store/         # Vuex
└── types/         # TypeScript типы
```
