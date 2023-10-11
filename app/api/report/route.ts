import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { PostType } from "@prisma/client";

export async function POST(req: NextRequest) {
    try{
        const session: any = await getAuthSession();
        if(!session?.user) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const body = await req.json();
        const { postId,  amount} = body;

        if(amount < 1 || amount > 10) {
            return new NextResponse("Amount must be between 1 and 10", {status: 400})
        }

        if(!amount) {
            return new NextResponse("Missing amount", {status: 400})
        }
        if(!postId) {
            return new NextResponse("Missing postId", {status: 400})
        }

        const post = await prisma.posts.findUnique({
            where: {
                id: postId,
            }
        })

        if(!post) {
            return new NextResponse("Post not found", {status: 404})
        }

        console.log('userId DJFLJSDFLJFLDJLFJLJFLKDJFLKJFLKJDFLKJDLFhdfhksdhfkjshkKJDLKFJL', session.user.id)
      

        
        await prisma.reportedPosts.create({
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
        
        return new NextResponse("", {status: 200})
    }
    catch(e) {
        console.error(e);
        return new NextResponse("Error in server", {status: 500})
    }
}

export async function GET(req: NextRequest) {
    try {
      let allBadPostss = await prisma.posts.findFirst({
        
      });
        const session: any = await getAuthSession();
        if(!session?.user) {
            return new NextResponse("Unauthorized", {status: 401})
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
        return new NextResponse("Error in server", {status: 500})
    }
}
