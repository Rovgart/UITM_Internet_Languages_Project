import { login } from "@/lib/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json(); // Destructure email and password from the JSON body
    const user = {
      email: email,
      password: password,
    };
    console.log(email, password);
    // Call the login function with email and password
    const data = await login(user);
    console.log(data);

    if (data) {
      return NextResponse.json({ token: data.token, user: data.user?._id }); // Return the data as a JSON response
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      ); // Handle case where login fails
    }
  } catch (error: any) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: error.message }, { status: 500 }); // Return the error message with a 500 status code
  }
}
