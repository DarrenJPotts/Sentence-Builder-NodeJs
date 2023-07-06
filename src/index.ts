import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import connect from "./config/db";
import {
  getAllSentences,
  getWords,
  getWordsByType,
  randomWords,
  saveSentence,
} from "./controllers/sentence-builder.controller";

// Create the Express application
const app: Express = express();
const port = 8080;

// Middleware to parse JSON requests
app.use(
  cors({
    methods: ["GET", "POST"],
    credentials: true,
    origin: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());

// endpoints
// get all words
app.get("/words", getWords);

// get words by type
app.get("/words/:type", getWordsByType);

// get all sentences
app.get("/sentences", getAllSentences);

// save sentence
app.post("/sentence", saveSentence);

// get random words
app.get("/random-words/:length?", randomWords);

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
