const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const notesController = require("../controllers/notes");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, notesController.getNote);

router.post("/createNote", upload.single("file"), notesController.createNote);

router.put("/updateNote/:id", notesController.updateNote);

router.delete("/deleteNote/:id", notesController.deleteNote);

module.exports = router;
