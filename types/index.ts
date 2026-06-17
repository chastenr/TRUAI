export type Listing = {
  id: string;
  price: string;
  address: string;
  neighborhood: string;
  beds: number;
  baths: number;
  squareFeet: string;
  imageClass: string;
  summary: string;
  status?: string;
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
