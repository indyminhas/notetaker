const { nanoid } = require("nanoid");
const express = require("express");
const db = require("./db/db");
var router = express.Router();

router.get("/notes", async function(req,res){
    const newestNotes = await db.readNotes();
    res.json(newestNotes);
});

//  post method
router.post('/notes', async function(req,res) {
    const newNote = req.body;
    //using nanoid to generate random id for note
    newNote.id= nanoid();
    const retrievedNotes = await db.readNotes();
    const freshlyWrittenNotes = await db.writeNotes([...retrievedNotes, newNote]);
    res.json(newNote);
})

router.delete('/notes/:id', async function(req,res){
    let myId = req.params.id;
    const retrievedNotes = await db.readNotes();
    const toDelete = retrievedNotes.findIndex(note => note.id === myId);
    retrievedNotes.splice(toDelete, 1);
    await db.writeNotes(retrievedNotes);
   
    res.json(`deleted note :${myId}`) 
});

module.exports = router;