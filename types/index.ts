export type Listing = {
  id: string;
  slug: string;
  status: string;
  price: string;
  pricePerSqFt: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  beds: number;
  baths: number;
  halfBaths: number;
  squareFeet: string;
  lotSize?: string;
  yearBuilt?: number;
  garage?: string;
  imageClass: string;
  imageUrl?: string;
  summary: string;
  financials: {
    estimatedMonthly: string;
    estimatedPropertyTax: string;
    hoa: string;
    showingRequirement: string;
  };
  features: string[];
  nearby: string[];
  disclosure: string;
  listingUrl?: string;
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
