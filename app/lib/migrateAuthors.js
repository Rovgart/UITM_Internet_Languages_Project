import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://rovgarth:whatislove123@cluster0.dql0bg2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
const dbName = "BookStore"; // Change this to your database name

async function migrateAuthors() {
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    const db = client.db(dbName);

    const booksCollection = db.collection("books");
    const authorsCollection = db.collection("authors");

    // Step 1: Fetch all books and log them
    const books = await booksCollection.find({}).toArray();
    console.log("Books in the collection:", books);

    const uniqueAuthors = {};

    // Normalize and extract unique authors
    books.forEach((book) => {
      // Check if book.author is a string
      if (typeof book.author === "string") {
        const authorName = book.author.trim(); // Trim whitespace
        if (!uniqueAuthors[authorName]) {
          uniqueAuthors[authorName] = {
            name: authorName, // Adjust this if your author object has more fields
            books: [], // Initialize books array
          };
        }
        // Push the book ID to the corresponding author's books array
        uniqueAuthors[authorName].books.push(book._id);
      } else {
        console.warn("Skipping book with invalid author:", book); // Log books with invalid authors
      }
    });

    console.log("Unique authors found:", Object.keys(uniqueAuthors));

    // Step 2: Insert authors into the authors collection
    const authorsArray = Object.values(uniqueAuthors);
    const insertedAuthors = await authorsCollection.insertMany(authorsArray);

    // Check if insert operation was acknowledged
    if (!insertedAuthors.acknowledged) {
      console.error("Insert operation was not acknowledged");
      return;
    }

    console.log("Inserted authors:", insertedAuthors.insertedIds);

    // Step 3: Update books collection to replace author with authorId
    const authorIdMapping = {};

    // Use insertedIds to create a mapping
    for (let index = 0; index < insertedAuthors.insertedIds.length; index++) {
      const authorName = authorsArray[index].name;
      authorIdMapping[authorName] = insertedAuthors.insertedIds[index];
    }

    console.log("Author ID mapping:", authorIdMapping);

    const bulkUpdateOps = books
      .map((book) => {
        if (
          typeof book.author === "string" &&
          authorIdMapping[book.author.trim()]
        ) {
          return {
            updateOne: {
              filter: { _id: book._id },
              update: {
                $set: { authorId: authorIdMapping[book.author.trim()] },
                $unset: { author: "" },
              },
            },
          };
        }
        return null; // Skip books without a valid author
      })
      .filter(Boolean); // Remove null entries

    console.log("Bulk update operations:", bulkUpdateOps);

    if (bulkUpdateOps.length > 0) {
      const updateResult = await booksCollection.bulkWrite(bulkUpdateOps);
      console.log("Books updated:", updateResult.modifiedCount);
    } else {
      console.log("No valid books to update.");
    }

    console.log("Authors migrated and books updated successfully.");
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    await client.close();
  }
}

migrateAuthors();
