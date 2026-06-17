export type Listing = {
  id: string;
  price: string;
  address: string;
  neighborhood: string;
  city?: string;
  state?: string;
  beds: number;
  baths: number;
  halfBaths?: number;
  squareFeet: string;
  lotSize?: string;
  yearBuilt?: number;
  imageClass: string;
  summary: string;
  status?: string;
  detailSlug?: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type LeadFormData = {
  fullName: string;
  email: string;
  phone: string;
  persona: string;
  budget: string;
  neighborhood: string;
  timeline: string;
  message: string;
};
