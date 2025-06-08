export interface RoomListing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  city: string;
  facilities: string[];
  images: string[];
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
  createdAt: string;
}

export interface ListingFormData {
  title: string;
  price: string;
  location: string;
  description?: string;
  city?: string;
  facilities?: string[];
  images?: string[];
  capacity?: string;
  bedrooms?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
} 