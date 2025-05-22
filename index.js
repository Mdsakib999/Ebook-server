import express from "express";
import dotnenv from 'dotenv'
import cors from 'cors'
import connectDB from "./config/dbConnect.js";
import userRoute from "./routes/user.route.js";
import bookRoute from "./routes/book.route.js";

dotnenv.config()

const port = process.env.PORT || 3001

const app = express()

// middlewares
app.use(cors("*"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/auth', userRoute)
app.use('/api/book', bookRoute)

app.get('/', (req, res) => {
    res.send({ message: "Hello from Readify API" })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDB()
})