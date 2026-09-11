export interface Project {
  id: string;
  title: string;
  category: 'corporate' | 'ecommerce' | 'healthcare' | 'landing' | 'realestate';
  categoryLabel: string;
  client: string;
  year: string;
  image: string;
  mobileImage?: string;
  description: string;
  results: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  features: string[];
  liveUrl?: string;
  speedScore: number;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  badge?: string;
  highlights: string[];
  details: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  isPopular?: boolean;
  deliveryDays: number;
  features: {
    text: string;
    included: boolean;
    highlight?: boolean;
  }[];
  suitability: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'technical' | 'support';
}

export interface CalculatorState {
  websiteType: 'corporate' | 'ecommerce' | 'landing' | 'webcustom';
  pageCount: number;
  hasEcommerce: boolean;
  hasMultiLang: boolean;
  hasSeoPro: boolean;
  hasBooking: boolean;
  hasPdpa: boolean;
  hasLineOa: boolean;
  speedTier: 'standard' | 'express';
}

