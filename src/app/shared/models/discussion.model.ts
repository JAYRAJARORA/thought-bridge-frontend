import { Category } from "./category.model";
import { User } from "./user.model";
import { Comment } from "./comment.model";

export class Discussion {
    id: string;
    category: Category;
    author: User;
    title: string;
    content: string;
    upvotes: number;
    type: string;
    createdAt?: string;
    comments?: number;
}