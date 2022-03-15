const express = require("express"); //imported express
const router = express.Router(); //Initialized Router
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route1: Get all notes of user using GET /api/notes/fetchnotes. Login Required

//Listens and responds to specific path
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
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
    body("title", "Title lenth too small").isLength({ min: 3 }),
    body("description", "Description length atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);
module.exports = router; //exported router
