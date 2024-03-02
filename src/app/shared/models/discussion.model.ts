import { Category } from "./category.model";
import { User } from "./user.model";

export class Discussion {
    id: number;
    category: Category;
    author: User;
    title: string;
    content: string;
    comments: Comment[];
    likes: string;
}