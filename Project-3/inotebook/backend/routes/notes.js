const express = require('express');
const router = express.Router();
var fetchuser = require("../middleware/fetchuser")
const Notes = require("../models/Notes")
const { body, validationResult } = require("express-validator");



//ROUTE1 - Get all the notes using: GET "/api/notes/fetchallnotes". Login required

//fetches the notes of the user based on the id(extracted from the fetchuser)
router.get('/fetchallnotes',fetchuser, async (req,res)=>
{
    try {
        const notes = await Notes.find({user: req.user.id});  //notes is being located with the help of the user attribute(to which the id of the user is being passed) which was present in the Notes schema
        res.json(notes);
        }  catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error")
        }
})

//the following route simply accepts the title,desc and tag and saves it in the notes schema which also consist the user attribute(which holds the id of the user from user schema)
//once the note is saved it is sent back as a response and at the front-end side it is converted to json and then gets concatenated with the notes
//ROUTE2 - Get all the notes using: GET "/api/notes/addnote". Login required
router.post('/addnote',fetchuser,[
    body("title", "Enter a valid title").isLength({ min: 3 }), 
    body("description", "enter a valid email").isLength({min: 5}),          
], async (req,res)=>
{   
    try {
    const{title, description, tag} = req.body;
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    const note = new Notes({
        title, description, tag, user:req.user.id
    })
    const savenote = await note.save()
    res.json(savenote);
}  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error")
}
})


//the following route gets the title,description,tag and also additionally it gets the notes id of the notes which needs to be updated.
//further functioning has been explained below

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    try {
        // Create a newNote object
        //if user is entering anything then accept it, otherwise don't update anything
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

    // Find the note at the backend(mongoDB) to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    //in the above "note" variable that particular notes is find whose id matches with the id sent in the request(that is of the notes(frontend) only).
    //now this note consist of a user attribute which has the id of the user. that attribute is converted to the string and then it is checked with
    //the id which was extracted from the fetchuser
    if(note.user.toString() !== req.user.id)  //checks if the user who is editing the notes is his/her notes or not
    {
        return res.status(401).send("Not Allowed");
    }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//the following route has been used for deleting the note. same like update note it also receives the id of the notes which needs to be deleted.
//now with the help of the id it checks that whether the note with that id exists or not. then it checks the user is correct or not. if everything 
//is correct the note gets deleted and the updated note is sent back as a response. 
//when the response is send in the frontend it filters the notes using filter method and return those notes whose id does not matches with the id(sent in the updatenote request) anymore.

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router