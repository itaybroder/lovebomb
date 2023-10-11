import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { PostType } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    let allBadPostss = await prisma.posts.findFirst({});
    const session: any = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;

    // Step 1: Get all reported post IDs by the user
    const reportedPostsByUser = await prisma.reportedPosts.findMany({
      where: {
        userId: userId,
      },
      select: {
        postId: true,
      },
    });

    const reportedPostIds = reportedPostsByUser.map((post) => post.postId);

    // Step 2: Fetch BAD posts excluding the reported ones
    const unreportedBadPosts = await prisma.posts.findMany({
      where: {
        type: PostType.BAD,
        NOT: {
          id: {
            in: reportedPostIds,
          },
        },
      },
      take: 5,
    });

    const allBadPosts = await prisma.posts.findMany({
      where: {
        type: PostType.BAD,
      },
    });

    return NextResponse.json(unreportedBadPosts);
  } catch (e) {
    console.error(e);
    return new NextResponse("Error in server", { status: 500 });
  }
}
