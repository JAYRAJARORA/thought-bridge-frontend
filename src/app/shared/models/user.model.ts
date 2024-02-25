import { Preferences } from "./preferences.model";

export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    preferences: Preferences
}