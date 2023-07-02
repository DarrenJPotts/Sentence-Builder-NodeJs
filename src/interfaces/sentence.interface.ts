import mongoose, { Schema } from "mongoose";

// INTERFACES
interface SentenceInterface {
  sentence: string;
}

const SentenceSchema = new Schema<SentenceInterface>({
  sentence: String,
});

const SentenceModel = mongoose.model<SentenceInterface>("Word", SentenceSchema);

export { SentenceInterface, SentenceModel };
