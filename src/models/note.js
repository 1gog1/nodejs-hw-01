import mongoose from "mongoose";

const { Schema, model } = mongoose;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: "",
      trim: true,
    },
    tag: {
      type: String,
      enum: [
        "Work",
        "Personal",
        "Meeting",
        "Shopping",
        "Ideas",
        "Travel",
        "Finance",
        "Health",
        "Important",
        "Todo",
      ],
      default: "Todo",
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export const Note = model("Note", noteSchema);
