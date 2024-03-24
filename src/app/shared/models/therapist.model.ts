import { Category } from "./category.model";
import { User } from "./user.model";

export interface Therapist extends User {
    name: string;
    phoneNumber: number;
    address: string;
    specialization: string;
    qualifications: string;
    avgRating?: number;
    categories?: Category[];
    city?: string;
    state?: string;
    country?: string;
    postalCode?: number;
}