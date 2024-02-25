import { Category } from "./category.model";

export interface Preferences {
    categories: Category[],
    specialization: string[],
    notification: boolean,
    languge: string,
    gender: string,
}