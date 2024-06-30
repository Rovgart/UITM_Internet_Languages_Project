import clientPromise from "../lib/mongodb";
export async function connect(
  db: string,
  client: string,
  collectionName: string,
  databaseName: string
) {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db(databaseName);
    collectionName = db.collection(collectionName);
  } catch (err: any) {
    console.error(err.message);
  }
}
