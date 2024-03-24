import { Preferences } from "./preferences.model";

export interface User {
    username: string;
    email?: string;
    password?: string;
    preferences?: Preferences
}