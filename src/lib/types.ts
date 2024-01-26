import type { Prisma, Blog, Comment } from "@prisma/client";

export type CreateCommentDto = Prisma.CommentCreateInput
export type CreateBlogDto = Prisma.BlogCreateInput
export type BlogWithComments = Blog & { comments: Comment[] }
export type BlogDataDto = {comment?: CreateCommentDto, likes?: string}

export type DBClient = {
    createOrUpdateBlog(id: string, blog: BlogDataDto): Promise<Blog | null>;
    getBlogDataById(id: string): Promise<BlogWithComments | null>;
    deleteBlog(id: string): Promise<Blog | null>;
}
