import { Request, Response } from "express";

import { SentenceModel } from "../interfaces/sentence.interface";
import { WordInterface, WordModel } from "../interfaces/word.interface";
import { WordType } from "../enums/word-type.enum";
// endpoints
// get all words
export async function getWords(_req: Request, res: Response) {
  try {
    const words = await WordModel.find().exec();

    res.json({ words: words });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// get words by type
export async function getWordsByType(req: Request, res: Response) {
  const { type } = req.params;

  if (!(type in WordType)) {
    res.status(400).json({ error: "Invalid word type" });
    return;
  }

  try {
    const words = await WordModel.find({ type }).exec();
    const wordList = words.map((word: WordInterface) => word.word);

    res.json({ words: wordList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// get all sentences
export async function getAllSentences(_req: Request, res: Response) {
  try {
    const sentences = await SentenceModel.find().exec();

    res.json({ sentences: sentences });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// save sentence
export async function saveSentence(req: Request, res: Response) {
  const { sentence } = req.body;

  try {
    // Save the sentence to the database
    await SentenceModel.create({ sentence });
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// return random words
export async function randomWords(req: Request, res: Response) {
  const { length = 10 } = req.params;
  try {
    const words = await WordModel.aggregate([
      { $sample: { size: Number(length) } },
    ]);
    const wordList = words.map((word: WordInterface) => word);

    res.json({ words: wordList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
