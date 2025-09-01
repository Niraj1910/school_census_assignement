export interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email: string;
  image?: string;
}

export interface SchoolFormData {
  schoolName: string;
  emailAddress: string;
  address: string;
  city: string;
  state: string;
  contactNumber: string;
  schoolImage: File | null;
}
