const express = require("express");
const notes = require('./data/notes');
const dotenv = require('dotenv');
const cors = require('cors')
const app = express();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')


app.use(express.json());
app.use(cors());
dotenv.config();
connectDB();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send("App is running");

});

// Get all notes 
app.get("/api/notes", (req, res) => {
    res.json(notes)
});

app.use('/api/users', userRoutes)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})