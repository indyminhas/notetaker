// Require
const express = require('express')
const path = require('path')
const DB = require("./db/Db.js")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"./public/index.html"))
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname,"./public/notes.html"))
})

app.get('/api/notes', async (req, res) => {
  try {  
    let currentNotes = await DB.readNotes()
    console.log(currentNotes);
    res.json(currentNotes)
  } catch (e){
    console.log(e);
  }
})

// API Post
app.post('/api/notes', async (req, res) => {
  const notes = req.body;
  let currentNotes = await DB.readNotes()
  await DB.writeNotes([...currentNotes, notes]) 
  res.json(notes)
})

// API Delete Chosen ID
app.delete('/api/notes/:id', async (req, res) => {
  const chosenID = req.params.id
  const notes = req.body;

  let currentNotes = await DB.readNotes()
  const remainingNotes = currentNotes.filter((notes) => {
    return notes.id !== chosenID
  })
  await DB.writeNotes([...remainingNotes])

  res.json(notes)
  console.log("The note has been deleted");
})

// Listening
app.listen(PORT, () => console.log(`Note Taker App listening on port: ${PORT}`))