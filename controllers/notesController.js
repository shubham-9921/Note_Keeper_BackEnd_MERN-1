const expressAsyncHandler = require("express-async-handler");
const Notes = require("../models/notesModel");


const getAllNotes = expressAsyncHandler(

    async (req, res) => {

        try {
            const notes = await Notes.find({ user: req.user._id });

            if (notes) {
                res.status(200).json(notes);

            } else {
                res.status(400).json({
                    message: "No notes found"
                })
            }

        } catch (error) {
            res.status(400).json({
                error: "Eror in getting notes"
            }).send(error)
        }

    }
)

const createNotes = expressAsyncHandler(
    async (req, res) => {

        try {
            const { title, content, category } = req.body;

            if (!title || !content || !category) {
                res.status(400).json({
                    message: "Please fill all fields"
                })
            } else {
                const newNote = new Notes({ user: req.user._id, title, content, category });

                const note = await newNote.save();
                if (note) {
                    res.status(201).json({
                        message: "Note created successfully",
                    })
                }

            }

        } catch (error) {
            res.status(400);
            throw new Error("Error in creating note")
        }

    }
)

const getSingleNote = expressAsyncHandler(
    async (req, res) => {

        try {
            const { id } = req.params;
            const note = await Notes.findById(id)
            if (note) {
                res.status(200).json({
                    note
                })
            } else {
                res.status(404).json({ msg: "note not found" })
            }

        } catch (error) {
            res.status(400);
            throw new Error("Error in getting single note")

        }

    }
)

const updateNote = expressAsyncHandler(
    async (req, res) => {
        try {
            const { id } = req.params;
            const { title, content, category } = req.body;
            const note = await Notes.findById({ _id: id });

            if (note.user.toString() !== req.user._id.toString()) {
                res.status(401);
                throw new Error("Yo Cannot do this operation")
            } else {
                if (note) {
                    note.title = title;
                    note.content = content;
                    note.category = category;

                    const upadateNote = await note.save();

                    if (upadateNote) {
                        res.status(201).json({
                            upadateNote
                        })
                    }

                }
                else {
                    res.status(400)
                    throw new Error("Error in updating note")
                }
            }


        }
        catch (error) {
            res.status(400);
            throw new Error("Error in updating note")
        }
    }
)

const deleteNote = expressAsyncHandler(
    async (req, res) => {
        try {
            const note = await Notes.findById(req.params.id);
            if (!note) {
                return res.status(404).json({ error: "Note not found" });
            }

            if (note.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ error: "You cannot delete this note" });
            }

            await note.deleteOne();
            return res.status(200).json({ message: "Note deleted successfully" });

        } catch (error) {
            console.error(error); // Log the error for debugging
            return res.status(500).json({ error: "Error in deleting note" });
        }
    }
);

module.exports = { getAllNotes, createNotes, getSingleNote, updateNote, deleteNote }