const express = require("express"); //imported express
const router = express.Router(); //Initialized Router
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route1: Get all notes of user using GET /api/notes/fetchnotes. Login Required

//Listens and responds to specific path
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    //fetches all notes of user through user id using fetchuser as middleware
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occurred");
  }
});

//Route2: Add a new note using POST /api/notes/addnotes. Login Required

router.post(
  "/addnotes",
  fetchuser,
  [
    //validates title and description using expression validator
    body("title", "Title length too small").isLength({ min: 3 }),
    body("description", "Description length atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // destructured title, description and tag
      const { title, description, tag } = req.body;
      // if user is not validated errors will be displayed
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //New note will be created here
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save(); //Note will be saved to database
      res.json(savedNote); //saved note will be sent to user
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

//Route3: Update existing notes of user using PUT /api/notes/updatenotes. Login Required

router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be updated and update it

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found!");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed!");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occurred");
  }
});

//Route4: Update existing notes of user using DELETE /api/notes/deletenotes. Login Required

router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  try {
    //Find the note to be deleted and delete it

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found!");
    }
    //allow only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed!");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ title: note.title, Success: "The note has been deleted!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occurred");
  }
});

module.exports = router; //exported router
