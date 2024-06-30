import clientPromise from "./mongodb";

// app/lib/testConnection.ts

export async function testConnection() {
  try {
    // Your logic to test the connection
    return { success: true }; // Adjust the returned object based on your needs
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
