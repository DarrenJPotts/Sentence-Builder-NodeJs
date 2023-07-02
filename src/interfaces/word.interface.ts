import mongoose, { Schema } from "mongoose";
import { WordType } from "../enums/word-type.enum";

// INTERFACES
interface WordInterface {
  word: string;
  type: WordType;
}

const WordSchema = new Schema<WordInterface>({
  word: String,
  type: {
    type: String,
    enum: Object.values(WordType),
  },
});

const WordModel = mongoose.model<WordInterface>("Word", WordSchema);

export { WordInterface, WordModel };
