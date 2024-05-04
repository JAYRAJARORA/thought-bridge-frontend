import { Preferences } from "./preferences.model";

export interface User {
    id ?: string;
    username: string;
    email?: string;
    password?: string;
    preferences?: Preferences
    licenseNumber?: string;
}