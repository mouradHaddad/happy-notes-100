const Note = require("../models/Note");
// const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const notes = await Note.find({ user: req.user.id });
      console.log(notes);
      res.render("profile.ejs", { notes: notes, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getNote: async (req, res) => {
    try {
      const notes = await Note.find({ user: req.user.id });
      const note = await Note.findById(req.params.id);
      console.log(note);
      res.render("note.ejs", { notes: notes, user: req.user, note: note });
    } catch (err) {
      console.log(err);
    }
  },
  createNote: async (req, res) => {
    try {
      await Note.create({
        title: req.body.title,
        note: req.body.note,
        user: req.user.id,
        completed: false,
      });
      console.log("Note has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  deleteNote: async (req, res) => {
    try {
      // Find note by id
      let note = await Note.findById({ _id: req.params.id });
      // Delete note from db
      await Note.remove({ _id: req.params.id });
      console.log("Deleted Note");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },

  //update notes
  updateNote: async (req, res) => {
    try {
      // Find note by id
      let note = await Note.findById({ _id: req.params.id });
      console.log(note);
      // Delete note from db
      await note.updateOne({
        title: req.body.title,
        note: req.body.note,
      });
      console.log("updated Note");
      res.redirect("/edit");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
