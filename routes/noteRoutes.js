const express = require('express');
const { getAllNotes, createNotes, getSingleNote, updateNote, deleteNote } = require('../controllers/notesController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router()


router.route('/').get(protect, getAllNotes);
router.route('/create').post(protect, createNotes);
router.route('/:id').get(getSingleNote).put(protect, updateNote).delete(protect, deleteNote)
// .put().delete()

module.exports = router;