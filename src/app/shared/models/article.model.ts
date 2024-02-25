import { Category } from "./category.model"
import { User } from "./user.model";

export interface Article {
    id: number,
    category: Category,
    author: User,
    title: string,
    likes: string,
}