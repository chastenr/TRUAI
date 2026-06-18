// Lean NALA context — single source of truth for the AI brain.
// Separate from data/listings.ts which carries full UI display fields.
// Keep in sync with data/listings.ts when listings change.

export type NalaListing = {
  slug: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  status: string;
  price: string;
  pricePerSqFt: string;
  beds: number;
  baths: number;
  halfBaths: number;
  sqFt: string;
  summary: string;
  features: string[];
  nearby: string[];
  showingRequirement: string;
  listingSource: string;
};

export const NALA_LISTINGS: NalaListing[] = [
  {
    slug: "spindle-ct-sandy-springs",
    address: "395 Spindle CT",
    neighborhood: "Spindlewick · Sandy Springs",
    city: "Sandy Springs",
    state: "GA",
    zip: "30350",
    status: "For Sale",
    price: "$975,000",
    pricePerSqFt: "$213/sq ft",
    beds: 4,
    baths: 4,
    halfBaths: 1,
    sqFt: "4,577",
    summary:
      "Four-bedroom, 4.5-bath home in the Spindlewick subdivision of Sandy Springs. Over 4,500 sq ft with easy access to GA-400, Sandy Springs City Center, and top-rated Fulton County schools.",
    features: [
      "Single Family Residence",
      "Spindlewick Subdivision",
      "Sandy Springs city limits",
      "Fulton County school district",
      "Near GA-400",
    ],
    nearby: [
      "GA-400 — nearby",
      "Sandy Springs City Center — nearby",
      "North Springs MARTA Station — nearby",
      "Perimeter Mall — nearby",
    ],
    showingRequirement: "Contact Abbie Shepherd Real Estate Group — (404) 275-5561",
    listingSource: "abbieagent.com",
  },
  {
    slug: "grove-park-roswell",
    address: "510 Grove Park Place",
    neighborhood: "Lakeside at Ansley · Roswell",
    city: "Roswell",
    state: "GA",
    zip: "30075",
    status: "For Sale",
    price: "$1,935,000",
    pricePerSqFt: "$204/sq ft",
    beds: 7,
    baths: 7,
    halfBaths: 0,
    sqFt: "9,488",
    summary:
      "Estate-sized home in the Lakeside at Ansley community of Roswell. Seven bedrooms and nearly 9,500 sq ft of living space near downtown Roswell's Canton Street dining corridor and Roswell Area Park.",
    features: [
      "Single Family Residence",
      "Lakeside at Ansley Community",
      "Roswell city limits",
      "Near downtown Roswell",
    ],
    nearby: [
      "Downtown Roswell / Canton Street — nearby",
      "Roswell Area Park — nearby",
      "GA-400 — nearby",
      "Alpharetta — nearby",
    ],
    showingRequirement: "Contact Abbie Shepherd Real Estate Group — (404) 275-5561",
    listingSource: "abbieagent.com",
  },
  {
    slug: "overlook-trl-acworth",
    address: "738 Overlook TRL",
    neighborhood: "Overlook · Acworth",
    city: "Acworth",
    state: "GA",
    zip: "30101",
    status: "For Sale",
    price: "$1,550,000",
    pricePerSqFt: "$410/sq ft",
    beds: 4,
    baths: 3,
    halfBaths: 1,
    sqFt: "3,777",
    summary:
      "Four-bedroom home on Overlook Trail in Acworth, north of Atlanta near Lake Allatoona. Nearly 3,800 sq ft in a quiet residential corridor off I-75 with Cherokee County schools.",
    features: [
      "Single Family Residence",
      "Acworth, Cherokee County",
      "Near Lake Allatoona",
      "I-75 corridor access",
      "Cherokee County schools",
    ],
    nearby: [
      "Lake Allatoona — nearby",
      "Downtown Acworth — nearby",
      "I-75 — nearby",
      "Kennesaw — nearby",
    ],
    showingRequirement: "Contact Abbie Shepherd Real Estate Group — (404) 275-5561",
    listingSource: "abbieagent.com",
  },
  {
    slug: "hill-st-grant-park",
    address: "960 Hill ST SE",
    neighborhood: "Grant Park · Atlanta",
    city: "Atlanta",
    state: "GA",
    zip: "30315",
    status: "For Sale",
    price: "$895,000",
    pricePerSqFt: "$355/sq ft",
    beds: 4,
    baths: 2,
    halfBaths: 1,
    sqFt: "2,520",
    summary:
      "Four-bedroom home in Atlanta's historic Grant Park neighborhood. 2,520 sq ft steps from the Atlanta Zoo, Grant Park trail system, and the Georgia Avenue restaurant and retail district.",
    features: [
      "Single Family Residence",
      "Historic Grant Park neighborhood",
      "Intown Atlanta location",
      "Atlanta Public Schools district",
      "Near I-20",
    ],
    nearby: [
      "Atlanta Zoo — nearby",
      "Grant Park trail system — nearby",
      "Georgia Ave dining district — nearby",
      "Downtown Atlanta — nearby",
    ],
    showingRequirement: "Contact Abbie Shepherd Real Estate Group — (404) 275-5561",
    listingSource: "abbieagent.com",
  },
  {
    slug: "kelvington-peachtree-city",
    address: "219 Kelvington WAY",
    neighborhood: "Maple Shade · Peachtree City",
    city: "Peachtree City",
    state: "GA",
    zip: "30269",
    status: "For Sale",
    price: "$850,000",
    pricePerSqFt: "$136/sq ft",
    beds: 5,
    baths: 4,
    halfBaths: 1,
    sqFt: "6,265",
    summary:
      "Five-bedroom home in the Maple Shade subdivision of Peachtree City. Over 6,200 sq ft in a well-established community on Peachtree City's golf cart path network, near McIntosh High School and Peachtree City Town Center.",
    features: [
      "Single Family Residence",
      "Maple Shade Subdivision",
      "Golf cart community access",
      "Fayette County schools",
      "Near McIntosh High School",
    ],
    nearby: [
      "McIntosh High School — nearby",
      "Peachtree City Town Center — nearby",
      "Fayette County golf cart path network",
      "Hwy 54 / Hwy 74 — nearby",
    ],
    showingRequirement: "Contact Abbie Shepherd Real Estate Group — (404) 275-5561",
    listingSource: "abbieagent.com",
  },
  {
    slug: "ambrosia-ct-dacula",
    address: "1922 Ambrosia CT",
    neighborhood: "Ivey Chase · Dacula",
    city: "Dacula",
    state: "GA",
    zip: "30019",
    status: "For Sale",
    price: "$585,000",
    pricePerSqFt: "$146/sq ft",
    beds: 5,
    baths: 5,
    halfBaths: 0,
    sqFt: "3,994",
    summary:
      "Five-bedroom, five-bath home in the Ivey Chase subdivision of Dacula. Nearly 4,000 sq ft in a well-established east Atlanta community near Gwinnett County schools, Mall of Georgia, and Hwy 316.",
    features: [
      "Single Family Residence",
      "Ivey Chase Subdivision",
      "Gwinnett County schools",
      "Near Mall of Georgia",
      "Hwy 316 access",
    ],
    nearby: [
      "Mall of Georgia — nearby",
      "Hwy 316 — nearby",
      "Dacula Middle/High School — nearby",
      "Hamilton Mill — nearby",
    ],
    showingRequirement: "Contact Abbie Shepherd Real Estate Group — (404) 275-5561",
    listingSource: "abbieagent.com",
  },
];
