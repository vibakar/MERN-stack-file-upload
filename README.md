### Full-stack application with React, Express, and MongoDB for file upload

## To start frontend

- cd client
- npm install
- npm start

## To start backend

- cd server
- npm install
- npm start

## User Account

- Email: user@gmail.com
- Password: StrongPassword123

## Admin Account

- Email: admin@gmail.com
- Password: StrongPassword123

## By default signup will create account with role 'user', to create admin account use below API and payload

- http://localhost:8080/api/register
- {email: "EMAIL", password: "PASSWORD", role: "admin"}

## Have used cloud mongodb, to use local db make necessary changes