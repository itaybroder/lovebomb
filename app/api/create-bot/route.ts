import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json(); //metadata can be added.

    
    return new NextResponse("email created", {
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Something went wrong.", { status: 500 });
  }
}
