import { Discussion } from "./discussion.model";
import { User } from "./user.model";

export interface Upvote {
    id: string;
    user: User;
    discussion: Discussion;
    date: Date;
}