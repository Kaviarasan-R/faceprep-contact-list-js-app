/* Import libraries */ 
const cors = require("cors")
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db');

/* Import middlewares */
const { errorHandler } = require('./middleware/errorHandler')

/* Port configuration*/ 
const port = process.env.PORT || 8080

/* Database connection */
connectDB()

/* Express initialize */
const app = express()

/* Cross origin resource sharing */
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

/* For form accepting data */ 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* Routes */ 
app.use('/api/users', require('./routes/userRoutes'))

/* Return object instead of html when encounter error */
app.use(errorHandler)

/* Running server */
app.listen(port, () => console.log(`Server started on port ${port}`))
