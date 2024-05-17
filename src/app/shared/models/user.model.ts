import { Preferences } from "./preferences.model";

export class User {
    id ?: string;
    username: string;
    email?: string;
    password?: string;
    preferences?: Preferences
    licenseNumber?: string;
}