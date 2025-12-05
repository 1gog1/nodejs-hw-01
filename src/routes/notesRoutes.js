import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';

import {
  createNoteSchema,
  updateNoteSchema,
  getNoteByIdSchema,
} from '../validations/noteValidation.js';

import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/notes', getAllNotes);
router.get(
  '/notes/:noteId',
  celebrate({ params: getNoteByIdSchema }),
  getNoteById,
);
router.post('/notes', celebrate({ body: createNoteSchema }), createNote);
router.patch(
  '/notes/:noteId',
  celebrate({ body: updateNoteSchema }),
  updateNote,
);
router.delete(
  '/notes/:noteId',
  celebrate({ params: getNoteByIdSchema }),
  deleteNote,
);

export default router;
