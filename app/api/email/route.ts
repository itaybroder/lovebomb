// app/api/email.ts
import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session: any = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Generate a random name for the email
    const name = Math.random().toString(36).substring(2, 15);
    const email = `${name}@darkcheese.org`;

    // Create a new email in the database and assign it to the current user
    await prisma.email.create({
      data: {
        address: email,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return NextResponse.json({ name });
  } catch (e) {
    console.error(e);
    return new NextResponse("Error in server", { status: 500 });
  }
}
