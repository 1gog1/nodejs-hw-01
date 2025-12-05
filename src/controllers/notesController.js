import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const userId = req.user._id;

    let { page = 1, perPage = 10, tag, search } = req.query;

    page = Number(page);
    perPage = Number(perPage);

    const filter = { userId };

    if (tag) filter.tag = tag;
    if (search) filter.$text = { $search: search };

    const [totalNotes, notes] = await Promise.all([
      Note.countDocuments(filter),
      Note.find(filter)
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 }),
    ]);

    const totalPages = Math.ceil(totalNotes / perPage) || 1;

    res.status(200).json({
      page,
      perPage,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { noteId } = req.params;

    const note = await Note.findOne({ _id: noteId, userId });

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { title, content, tag } = req.body;

    const newNote = await Note.create({
      title,
      content,
      tag,
      userId,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { noteId } = req.params;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      req.body,
      { new: true },
    );

    if (!updatedNote) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { noteId } = req.params;

    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      userId,
    });

    if (!deletedNote) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(deletedNote);
  } catch (error) {
    next(error);
  }
};
