import { Preferences } from "./preferences.model";

export class User {
    username: string;
    email?: string;
    password?: string;
    preferences?: Preferences
}