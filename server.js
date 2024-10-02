const express = require("express");
const notes = require('./data/notes');
const dotenv = require('dotenv');


const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.send("App is running");

});

// Get all notes 
app.get("/api/notes",(req,res)=>{
    res.json(notes)
});

app.get("/api/notes/:id",(req,res)=>{
    const currentNote = notes.filter((notes)=>(notes._id === req.params.id));

    res.json(currentNote);
});



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})