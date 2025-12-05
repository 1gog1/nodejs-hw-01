import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';

import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  celebrate({ [Segments.QUERY]: getAllNotesSchema }),
  getAllNotes,
);

router.get(
  '/:noteId',
  celebrate({ [Segments.PARAMS]: noteIdSchema }),
  getNoteById,
);

router.post('/', celebrate({ [Segments.BODY]: createNoteSchema }), createNote);

router.patch(
  '/:noteId',
  celebrate({
    [Segments.PARAMS]: noteIdSchema,
    [Segments.BODY]: updateNoteSchema,
  }),
  updateNote,
);

router.delete(
  '/:noteId',
  celebrate({ [Segments.PARAMS]: noteIdSchema }),
  deleteNote,
);

export default router;
