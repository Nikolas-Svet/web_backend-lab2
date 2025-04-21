## О проекте

Данный проект представляет собой современное веб-приложение, созданное для образовательных целей. В его основе лежат Node.js с использованием Express, а также стандартные веб-технологии (HTML и CSS).

## Стек

### Frontend

- JavaScript
- Html
- CSS

### Backend

- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)

## Структура проекта

```
public - frontend
src - backend
```

## Установка и запуск

### требования

- Node.js
- Yarn
- MongoDB

### Установка зависимостей

```bash
# Установка всех зависимостей
yarn install
```

### Создать файл .env в корне проекта и прописать следующее

```bash
PORT=port
MONGO_URI=mongodb://localhost:port/mydb
JWT_SECRET=your_jwt_secret
```

### Запуск

```bash
yarn dev
```


