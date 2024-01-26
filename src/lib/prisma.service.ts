import { type Prisma, type Blog, PrismaClient } from "@prisma/client";
import type { DBClient, CreateCommentDto, BlogWithComments, BlogDataDto } from "./types";


export class PrismaService implements DBClient{
  private static instance: PrismaService;
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }

    return PrismaService.instance;
  }

  async getBlogDataById(id: string): Promise<BlogWithComments | null>{
    try {
      const blogData = await this.prisma.blog.findUnique({
        where: { id },
        include: { comments: true },
      });
      if (!blogData) return null;
      return blogData;
    } catch (err: unknown) {
        return null;
    //   handleErrors(err);
    }
  }

  async createOrUpdateBlog(id: string, blogData: BlogDataDto ): Promise<Blog | null> {
    const blog = await this.getBlogDataById(id);
    console.log('blogData', blogData);
    const updates: Prisma.BlogUpdateInput = {};
    if(blog){
        if (blogData.likes) {
            updates.likes = Number(blogData.likes);
        }
        if (blogData.comment) {
            updates.comments = {
                create: blogData.comment,
            };
        }
        console.log('updates', updates);
        
          return this.prisma.blog.update({
          where: { id },
          data: updates,
        });
    }
    else {
        return this.prisma.blog.create({
          data: {
            id,
            comments: {
              create: blogData.comment,
            },
            likes: 0,
          },
        });
    }
  }

  async deleteBlog(id: string): Promise<Blog| null> {
    try {
      return await this.prisma.blog.delete({ where: { id } });
    } catch (err: unknown) {
        return null;
    //   handleErrors(err);
    }
  }
}
