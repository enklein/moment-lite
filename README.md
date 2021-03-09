# Moment

Portfolio project. Manage tasks and track sessions for each task with MomentLite.

**Frontend**: Angular with NG-ZORRO.

**Backend**: Node, Express, CORS, bcryptjs, jsonwebtoken, Sequelize, and PostgreSQL

## Frontend
Setup and run the frontend:
```
cd frontend/Moment
npm install
ng serve --open
```

## Backend
Run the backend in a separate command line instance:
```
cd backend
npm install
npm run dev
```

### Database Setup (Local Copy)
- Install Postgres v13 if you haven't ([Postgres Downloads](https://www.postgresql.org/download/)).
- Run from `/backend` directory, replacing USERNAME with your database's superuser and DATABASE with the database name: `psql -U USERNAME DATABASE < ./bin/sql/moment.sql`.
- Copy the contents of `.sample-env` into `backend/.env`, replacing each value to match your local copy of the database.