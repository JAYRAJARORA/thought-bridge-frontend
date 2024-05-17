import { Address } from "./address.model";
import { Availability } from "./availability.model";
import { Category } from "./category.model";
import { Language } from "./language.model";
import { User } from "./user.model";

export class Therapist extends User {
    name?: string;
    phoneNumber?: number;
    address?: Address;
    specialization?: string;
    qualifications?: string;
    avgRating?: number;
    categories?: Category[];
    city?: string;
    state?: string;
    country?: string;
    postalCode?: number;
    meetingLink?: string;
    description?: string;
    gender?: string;
    age?: number;
    languagesSpoken?: Language[];
    availability?: Availability[];
    experience?: number;
    education?: string;
    licenseCertifications?: string;
    treatmentApproaches?: string[];
    fees?: string;
    insuranceAccepted?: string[];
    additionalServices?: string;
}