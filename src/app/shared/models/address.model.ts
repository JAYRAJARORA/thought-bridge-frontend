export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    formattedAddress: string;
    location: {
      coordinates: number[]; // [longitude, latitude]
    };
  }