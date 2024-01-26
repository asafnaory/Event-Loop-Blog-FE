import { PrismaService } from './prisma.service';
import type { BlogDataDto, CreateCommentDto, DBClient } from './types';


export class BlogService {
    constructor(private db: DBClient) {}

    async createOrUpdateBlog (id: string, blogDataDto: BlogDataDto) {
        return await this.db.createOrUpdateBlog(id, blogDataDto);
    }
    async getBlogDataById(id: string) {
        return await this.db.getBlogDataById(id);
    }
    async deleteBlog(id: string) {
        return await this.db.deleteBlog(id);
    }

}

export const blogService = new BlogService(PrismaService.getInstance())