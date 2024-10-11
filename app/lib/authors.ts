import { ObjectId } from "mongodb";
import { getCollection } from "./connect";

export async function getTrendingAuthors() {
  try {
    const result = await (
      await getCollection("books")
    )
      .aggregate([
        {
          $group: {
            _id: "$author", // Group by author
            totalReviews: { $sum: "$reviews" }, // Sum reviews for each author
          },
        },
        {
          $sort: { totalReviews: -1 }, // Sort by total reviews in descending order
        },
        {
          $limit: 5, // Limit the result to top 5 authors
        },
        {
          $project: {
            _id: 0, // Exclude the _id field
            authorName: "$_id", // Rename _id to authorName
            totalReviews: 1, // Keep the totalReviews field
          },
        },
      ])
      .toArray();

    return result;
  } catch (error) {
    console.error("Error fetching trending authors", error);
  }
}

export async function followAuthor(id: string) {
  try {
    if (!id) {
      return null;
    }
    const authors = await getCollection("authors");
    const authorId = new ObjectId(id);
    const result = await authors.updateOne(
      { _id: authorId }, // Filter: Find the author by their ID
      { $inc: { followers: 1 } } // Update: Increment 'followers' field by 1
    );
    if (result.matchedCount === 1) {
      return { success: true, message: "Author followed successfully" };
    } else {
      return { success: false, message: "Author not found" };
    }
  } catch (error) {
    throw error;
  }
}
