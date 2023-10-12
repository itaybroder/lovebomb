import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { PostType, PostPlatfoms } from "@prisma/client";
import { URL } from "url";

export const revalidate = 0;
export async function POST(req: NextRequest) {
  try {
    const session: any = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { postId, amount } = body;

    if (amount < 1 || amount > 10) {
      return new NextResponse("Amount must be between 1 and 10", {
        status: 400,
      });
    }

    if (!amount) {
      return new NextResponse("Missing amount", { status: 400 });
    }
    if (!postId) {
      return new NextResponse("Missing postId", { status: 400 });
    }

    const post = await prisma.posts.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    await prisma.skippedPosts.create({
      data: {
        postId: post.id,
        timestamp: new Date(),
        amountOfReports: amount,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return new NextResponse("", { status: 200 });
  } catch (e) {
    console.error(e);
    return new NextResponse("Error in server", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session: any = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const url = new URL(req.url, "http://localhost:3000"); // Use a dummy base URL
    const platform = url.searchParams.get("platform");
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
    
    let platformDb;
    const lowerCasePlatform = platform?.toLowerCase();
    switch (lowerCasePlatform) {
      case "tiktok":
        platformDb = PostPlatfoms.TIKTOK;
        break;
      case "twitter":
        platformDb = PostPlatfoms.TWITTER;
        break;
      case "instagram":
        platformDb = PostPlatfoms.INSTAGRAM;
        break;
      case "youtube":
        platformDb = PostPlatfoms.YOUTUBE;
        break;
      case "facebook":
        platformDb = PostPlatfoms.FACEBOOK;
        break;
      case "linkedin":
        platformDb = PostPlatfoms.LINKEDIN;
        break;
      default:
        return new NextResponse("Invalid platform", { status: 400 });
    }

    // Step 2: Fetch BAD posts excluding the reported ones
    const unreportedBadPosts = await prisma.posts.findMany({
      where: {
        type: PostType.BAD,
        platform: platformDb,
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
