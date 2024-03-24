import { Category } from "./category.model";
import { User } from "./user.model";
import { Comment } from "./comment.model";
import { Upvote } from "./upvote.model";

export class Discussion {
    id: string;
    category: Category;
    author: User;
    title: string;
    content: string;
    comments: Comment[];
    upvotes: number;
    upvoteDetail?: Upvote[];
    type: string;
}