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
    body("title", "Title lenth too small").isLength({ min: 3 }),
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
module.exports = router; //exported router
