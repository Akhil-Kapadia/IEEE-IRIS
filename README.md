# Project IRIS : Build a website for IEEE
### website: ieee.ttu.edu
---

Project IRIS was started in 2021 to provide a website for the IEEE student organization at Texas Tech University. The goal of the website was to foster community within the ECE department as well as keep track of ProPoints for the 5 Project labs at TTU. Propoints are 10% of students grades and are managed by IEEE. As such students need an easy and accessible way to manage and add their propoints.

## Table of Contents
1. [Resource Stack](https://github.com/Akhil-Kapadia/IEEE-IRIS/tree/ttu-merger#website-stack)
2. [Getting Started](https://github.com/Akhil-Kapadia/IEEE-IRIS/tree/ttu-merger#getting-started)
3. [Task List](https://github.com/Akhil-Kapadia/IEEE-IRIS/tree/ttu-merger#tasks)

---
## Website Stack

The IEEE website is build on the PERN stack, which is a very popular stack. The PERN stack uses a Postgres (SQL) database and nodeJS webengine to power its backend. The backend is built on a framework called ExpressJS which is an efficent and easy to use Javascript backend with good async support. To make calls to the database, the Sequelize ORM is used to provide object functionality. Authentication is done using JWTs and the passport library.  
The frontend is built on the React framework and uses the Material UI (developed by google/MIT) as its theme and user interface framework. Any requests to the backend is done through HTTPS and sent using Axios.  

## Getting Started  
Since this stack is built entirely in javascript, its possible to get the entire website started with 5 console commands. I recommend installing and using VSCode.  

Prereqs:  
Requires installing NodeJS 16 LTS & VSCode.
The development database uses SQLite3, which doesn't need to be preinstalled. You may however chose to install Postgres.  

1. **Clone the repo into a folder.**  
Open a folder in git bash that you'd to clone the project into. Use git clone to copy the project over and then open the resulting folder (IEEE-IRIS) in VSCode.
2. **Setup libraries**  
Once the project is open in VSCode, open a console and install packages.
`npm install`
To install packages for the frontend (not needed unless developing the frontend)  
```
cd frontend   
npm install
```
3. **Environment Variables**  
Create a file named `.env` and insert this into it:  
```
JWT_SECRET = asdugfYGyutb786r^*r67rFI&TADFsd876artsd78GOGON G&*r8t785*&RSFD* \
DB_USER = iris  
DB_PASS = password  
DB_HOST = localhost  
DB_PORT = 5432  
DB_NAME = test  
NODE_ENV = development  
```  
If you install postgres, change the DB_ stuff to whatever you configure your database for.
4. **Database Setup**  
You do not need to install Postgres as you can use SQLite for development (preinstalled).  
Run these in console to setup your db tables and relations:  
`npx sequelize db:migrate`  
Run this to provide data:  
`npx sequelize db:seed:all`  
5. **Launch Website!**  
You should be all setup now!  
run this in console and visit http://localhost:3001 to see the website!  
`npm run dev`  
6. **Frontend Development (optional)**  
To develop the frontend, run this command while the console is in the "frontend" folder.  
`npm start`

## Task List
- [x] Update website with new database tables
- [ ] Add Password reset through Email
- [ ] Add profile page.
- [ ] Implement PDF and png/jpeg file upload
- [ ] Generate excel report for end of semester propoint reporting
- [ ] Document backend using swagger
- [ ] Add post functionality to annoucements page
- [ ] Add NFC propoint verification
- [ ] Fill out About Us page
- [ ] Refactor authentication code.
- [ ] Code discord bot to sync with web api