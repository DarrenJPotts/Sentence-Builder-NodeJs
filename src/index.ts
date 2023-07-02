import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import connect from "./config/db";
import { WordType } from "./enums/word-type.enum";
import { WordModel, WordInterface } from "./interfaces/word.interface";
import { seedDatabase } from "./config/seed_db";
require("dotenv").config();

// Create the Express application
const app: Express = express();
const port = 8080;

// Middleware to parse JSON requests
app.use(express.json());
app.use(bodyParser.json());

// endpoints
// get all words
app.get("/words", async (_req: Request, res: Response) => {
  try {
    const words = await WordModel.find().exec();

    res.json({ words: words });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get words by type
app.get("/words/:type", async (req: Request, res: Response) => {
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
});

// save sentence

// generate dynamic sentence

// Start the server
// Connect to MongoDB Atlas and start the server
connect()
  .then(() => {
    // seedDatabase();
    app.listen(port, () => {
      console.log(`Server listening on port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server", error);
  });
