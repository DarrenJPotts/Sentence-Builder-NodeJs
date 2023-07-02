import { WordType } from "../enums/word-type.enum";
import { WordInterface, WordModel } from "../interfaces/word.interface";

// wordData.ts
const wordData = {
  Noun: [
    "time",
    "year",
    "people",
    "way",
    "day",
    "man",
    "woman",
    "child",
    "government",
    "company",
  ],
  Verb: [
    "be",
    "have",
    "do",
    "say",
    "go",
    "get",
    "make",
    "know",
    "think",
    "take",
  ],
  Adjective: [
    "good",
    "new",
    "first",
    "last",
    "long",
    "great",
    "little",
    "own",
    "other",
    "old",
  ],
  Adverb: [
    "very",
    "well",
    "so",
    "just",
    "really",
    "then",
    "too",
    "quite",
    "much",
    "always",
  ],
  Pronoun: ["I", "you", "he", "she", "it", "we", "they", "me", "him", "her"],
  Preposition: [
    "in",
    "on",
    "at",
    "by",
    "with",
    "from",
    "to",
    "for",
    "of",
    "about",
  ],
  Conjunction: [
    "and",
    "but",
    "or",
    "so",
    "yet",
    "for",
    "nor",
    "although",
    "because",
    "unless",
  ],
  Determiner: [
    "the",
    "a",
    "an",
    "this",
    "that",
    "these",
    "those",
    "my",
    "your",
    "his",
  ],
  Exclamation: [
    "hello",
    "wow",
    "yes",
    "no",
    "hey",
    "oh",
    "alas",
    "bravo",
    "hurray",
    "oops",
  ],
};

async function seedDatabase() {
  try {
    await WordModel.deleteMany({}); // Remove existing words
    const wordsToInsert: WordInterface[] = [];

    // Loop through each WordType and its corresponding words
    for (const type of Object.values(WordType)) {
      const words: string[] = wordData[type];
      let wordObjects: WordInterface[] = [];
      words.map((word) => {
        const newWord: WordInterface = {
          word: word,
          type: type,
        };

        wordObjects.push(newWord);
      });

      wordsToInsert.push(...wordObjects);
    }

    await WordModel.insertMany(wordsToInsert);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Failed to seed database", error);
  }
}

export { wordData, seedDatabase };
