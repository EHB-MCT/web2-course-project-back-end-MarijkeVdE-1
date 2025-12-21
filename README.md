Design Exercise Hub

Web2 – Backend API  

Backend API voor **Design Exercise Hub**.  
De API beheert design-oefeningen, categorieën, feedback en assets (uploads).


1. Tech stack

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Multer
- dotenv
- CORS


2. Installatie

- Installeer dependencies:

npm install
Maak een .env bestand in de root:

env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>
PORT=5052
JWT_SECRET=supersecret
Start de server:

npm run dev
De server draait op:

http://localhost:5052

Projectstructuur
css

src/
  models/
  routes/
  app.js
server.js
uploads/
Datamodel (overzicht)

* Category
    name
    description
    timestamps

* Exercise
    title
    category (ObjectId → Category)
    programme
    year
    degree
    description
    timestamps
    
* Feedback
    exercise (ObjectId → Exercise)
    comment
    timestamps

* Asset
    exercise (ObjectId → Exercise)
    filename
    originalName
    url
    caption
    timestamps

API Endpoints
Base URL: http://localhost:5052/api

* Categories
    GET /categories
    POST /categories
    PUT /categories/:id
    DELETE /categories/:id

* Exercises
    GET /exercises
    POST /exercises
    PUT /exercises/:id
    DELETE /exercises/:id

* Feedback
    GET /feedback
    POST /feedback
    DELETE /feedback/:id

* Assets (multer upload)
    GET /assets
    POST /assets/upload
    DELETE /assets/:id

* Multer uploads
Geüploade bestanden worden opgeslagen in:

    /uploads
    De map wordt statisch geserveerd via:
    app.use('/uploads', express.static('uploads'));
    Een bestand is bereikbaar via:

http://localhost:5052/uploads/<filename>
- Opmerkingen
- Relaties worden gelegd via ObjectId en ref
- Assets worden gekoppeld aan exercises
- Feedback hoort bij één exercise
- Backend volgt REST-principes









