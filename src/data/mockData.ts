import { addPropertyMetadata } from '../utils/propertyUtils';

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  region: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  status: 'available' | 'rented' | 'pending';
  amenities: string[];
  images: string[];
  agentId: string;
  brochureUrl?: string;
  furnishing: 'furnished' | 'semi-furnished' | 'unfurnished';
  leaseTerm: string;
  featured?: boolean;
  verified?: boolean;
  type?: string;
  videoUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  // Rental Terms
  insuranceDeposit?: string;
  annualIncrease?: string;
  minimumStay?: string;
  // Property Reference Codes
  shortcode?: string;
  referenceCode?: string;
  qrCode?: string;
  propertyUrl?: string;
  cycle?: number;
}

export interface Agent {
  id: string;
  name: string;
  photo: string;
  phone: string;
  whatsapp: string;
  email: string;
  listingsCount: number;
  bio?: string;
  specialization?: string;
  experience?: string;
}

export interface Location {
  id: string;
  name: string;
  region: string;
}

export interface Testimonial {
  id: string;
  name: string;
  image: string;
  text: string;
  rating: number;
  date?: string;
  role?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    photo: string;
    role: string;
  };
  publishDate: string;
  readingTime: string;
  excerpt: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
}

export const locations: Location[] = [
  { id: '1', name: 'New Cairo', region: 'Cairo' },
  { id: '2', name: 'Maadi', region: 'Cairo' },
  { id: '3', name: 'New Alamein', region: 'North Coast' },
];

export const agents: Agent[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    phone: '+20 100 123 4567',
    whatsapp: '+20 100 123 4567',
    email: 'ahmed.hassan@bobrentalz.com',
    listingsCount: 12,
    bio: 'Specialized in luxury properties in New Cairo with over 8 years of experience in the real estate market.',
    specialization: 'Luxury Properties',
    experience: '8 years',
  },
  {
    id: '2',
    name: 'Sara Mohamed',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    phone: '+20 100 234 5678',
    whatsapp: '+20 100 234 5678',
    email: 'sara.mohamed@bobrentalz.com',
    listingsCount: 18,
    bio: 'Expert in Maadi properties, helping families find their perfect long-term homes for over 6 years.',
    specialization: 'Maadi Properties',
    experience: '6 years',
  },
  {
    id: '3',
    name: 'Omar Khalil',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    phone: '+20 100 345 6789',
    whatsapp: '+20 100 345 6789',
    email: 'omar.khalil@bobrentalz.com',
    listingsCount: 15,
    bio: 'Specializing in coastal properties in New Alamein with a focus on premium rentals.',
    specialization: 'Coastal Properties',
    experience: '5 years',
  },
  {
    id: '4',
    name: 'Layla Ibrahim',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    phone: '+20 100 456 7890',
    whatsapp: '+20 100 456 7890',
    email: 'layla.ibrahim@bobrentalz.com',
    listingsCount: 10,
    bio: 'Passionate about matching clients with their ideal homes across Cairo.',
    specialization: 'Cairo Properties',
    experience: '4 years',
  },
];

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Villa in New Cairo',
    price: 45000,
    location: 'New Cairo',
    region: 'Fifth Settlement',
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    description:
      'Stunning modern villa with contemporary design, spacious living areas, and a beautiful garden. Located in a gated community with 24/7 security.',
    status: 'available',
    amenities: ['Garden', 'Parking', 'Security', 'Pool', 'Gym'],
    images: [
      'https://images.unsplash.com/photo-1630699375019-c334927264df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2MzQ2ODc5OXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop',
    ],
    agentId: '1',
    furnishing: 'furnished',
    leaseTerm: '12 months minimum',
    featured: true,
    verified: true,
    type: 'Villa',
    videoUrl: 'https://www.youtube.com/embed/zumJJUL_ruM',
    coordinates: {
      lat: 30.0444,
      lng: 31.2357,
    },
    // Rental Terms
    insuranceDeposit: '10% of rent',
    annualIncrease: '5%',
    minimumStay: '12 months',
    // Property Reference Codes
    shortcode: 'MVNC001',
    referenceCode: 'MVNC001-2023',
    qrCode: 'https://example.com/qr/MVNC001-2023.png',
    propertyUrl: 'https://example.com/properties/MVNC001',
    cycle: 1,
  },
  {
    id: '2',
    title: 'Luxurious Apartment in Maadi',
    price: 28000,
    location: 'Maadi',
    region: 'Sarayat',
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    description:
      'Beautiful apartment in the heart of Maadi, featuring modern amenities and a large balcony with garden views. Walking distance to schools and shops. This elegant residence boasts high ceilings, premium hardwood flooring throughout, and floor-to-ceiling windows that flood the space with natural light. The gourmet kitchen is equipped with top-of-the-line appliances, granite countertops, and ample storage space. The master suite includes a walk-in closet and spa-like bathroom with dual vanities. Additional highlights include a dedicated laundry room, guest powder room, and secure underground parking. The building offers 24/7 concierge service, a modern fitness center, and landscaped communal gardens perfect for relaxation.',
    status: 'available',
    amenities: ['Balcony', 'Parking', 'Elevator', 'Central AC'],
    images: [
      'https://images.unsplash.com/photo-1728048756954-be23bd048b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYSUyMHN3aW1taW5nJTIwcG9vbHxlbnwxfHx8fDE3NjMzNzQ5NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop',
    ],
    agentId: '2',
    furnishing: 'semi-furnished',
    leaseTerm: '12 months minimum',
    featured: true,
    verified: true,
    type: 'Apartment',
    videoUrl: 'https://www.youtube.com/embed/A9bPV2kN1SE',
    coordinates: {
      lat: 29.9602,
      lng: 31.2497,
    },
    // Rental Terms
    insuranceDeposit: '10% of rent',
    annualIncrease: '5%',
    minimumStay: '12 months',
    // Property Reference Codes
    shortcode: 'LAM002',
    referenceCode: 'LAM002-2023',
    qrCode: 'https://example.com/qr/LAM002-2023.png',
    propertyUrl: 'https://example.com/properties/LAM002',
    cycle: 1,
  },
  {
    id: '3',
    title: 'Beachfront Villa in New Alamein',
    price: 65000,
    location: 'New Alamein',
    region: 'Marina',
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    description:
      'Exclusive beachfront villa with direct sea access, infinity pool, and panoramic views. Perfect for families seeking a luxurious coastal lifestyle.',
    status: 'available',
    amenities: ['Beach Access', 'Pool', 'Garden', 'Security', 'Parking', 'Gym'],
    images: [
      'https://images.unsplash.com/photo-1702014861373-527115231f8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBhcGFydG1lbnQlMjBraXRjaGVufGVufDF8fHx8MTc2MzQ4MDIyNXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    ],
    agentId: '3',
    furnishing: 'furnished',
    leaseTerm: '12 months minimum',
    featured: true,
    verified: true,
    type: 'Villa',
    videoUrl: 'https://www.youtube.com/embed/c1u0Bk6MwBg',
    coordinates: {
      lat: 31.3547,
      lng: 27.8813,
    },
    // Rental Terms
    insuranceDeposit: '10% of rent',
    annualIncrease: '5%',
    minimumStay: '12 months',
    // Property Reference Codes
    shortcode: 'BVNA003',
    referenceCode: 'BVNA003-2023',
    qrCode: 'https://example.com/qr/BVNA003-2023.png',
    propertyUrl: 'https://example.com/properties/BVNA003',
    cycle: 1,
  },
  {
    id: '4',
    title: 'Spacious Duplex in New Cairo',
    price: 35000,
    location: 'New Cairo',
    region: 'Katameya',
    bedrooms: 3,
    bathrooms: 2,
    area: 250,
    description:
      'Modern duplex with open-plan living, high ceilings, and a private rooftop terrace. Located in a family-friendly compound.',
    status: 'pending',
    amenities: ['Terrace', 'Parking', 'Security', 'Playground'],
    images: [
      'https://images.unsplash.com/photo-1568115286680-d203e08a8be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW50aG91c2UlMjBjaXR5JTIwdmlld3xlbnwxfHx8fDE3NjM0NzE3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    ],
    agentId: '1',
    furnishing: 'semi-furnished',
    leaseTerm: '12 months minimum',
    verified: true,
    type: 'Duplex',
    videoUrl: 'https://www.youtube.com/embed/zumJJUL_ruM',
    coordinates: {
      lat: 30.052,
      lng: 31.245,
    },
    // Rental Terms
    insuranceDeposit: '10% of rent',
    annualIncrease: '5%',
    minimumStay: '12 months',
    // Property Reference Codes
    shortcode: 'SDNC004',
    referenceCode: 'SDNC004-2023',
    qrCode: 'https://example.com/qr/SDNC004-2023.png',
    propertyUrl: 'https://example.com/properties/SDNC004',
    cycle: 1,
  },
  {
    id: '5',
    title: 'Elegant Townhouse in Maadi',
    price: 32000,
    location: 'Maadi',
    region: 'Degla',
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    description:
      'Charming townhouse with private garden, modern kitchen, and spacious bedrooms. Ideal for families.',
    status: 'available',
    amenities: ['Garden', 'Parking', 'Security', 'Storage'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    ],
    agentId: '2',
    furnishing: 'unfurnished',
    leaseTerm: '12 months minimum',
    verified: true,
    type: 'Townhouse',
    videoUrl: 'https://www.youtube.com/embed/A9bPV2kN1SE',
    coordinates: {
      lat: 29.965,
      lng: 31.255,
    },
    // Rental Terms
    insuranceDeposit: '10% of rent',
    annualIncrease: '5%',
    minimumStay: '12 months',
    // Property Reference Codes
    shortcode: 'ETM005',
    referenceCode: 'ETM005-2023',
    qrCode: 'https://example.com/qr/ETM005-2023.png',
    propertyUrl: 'https://example.com/properties/ETM005',
    cycle: 1,
  },
  {
    id: '6',
    title: 'Contemporary Apartment in New Cairo',
    price: 22000,
    location: 'New Cairo',
    region: 'Fifth Settlement',
    bedrooms: 2,
    bathrooms: 2,
    area: 150,
    description:
      'Bright and modern 2-bedroom apartment with contemporary finishes and great natural light. Perfect for young professionals.',
    status: 'available',
    amenities: ['Balcony', 'Parking', 'Elevator', 'Central AC'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop',
    ],
    agentId: '1',
    furnishing: 'furnished',
    leaseTerm: '12 months minimum',
    verified: true,
    type: 'Apartment',
    videoUrl: 'https://www.youtube.com/embed/RpKQEeovaNY',
    coordinates: {
      lat: 30.038,
      lng: 31.228,
    },
    // Rental Terms
    insuranceDeposit: '10% of rent',
    annualIncrease: '5%',
    minimumStay: '12 months',
    // Property Reference Codes
    shortcode: 'CAPNC006',
    referenceCode: 'CAPNC006-2023',
    qrCode: 'https://example.com/qr/CAPNC006-2023.png',
    propertyUrl: 'https://example.com/properties/CAPNC006',
    cycle: 1,
  },
  {
    id: '7',
    title: 'Luxury Penthouse in New Alamein',
    price: 55000,
    location: 'New Alamein',
    region: 'Marina',
    bedrooms: 4,
    bathrooms: 3,
    area: 320,
    description:
      'Spectacular penthouse with panoramic sea views, private terrace, and premium finishes throughout.',
    status: 'available',
    amenities: ['Terrace', 'Beach Access', 'Pool', 'Parking', 'Security', 'Concierge'],
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
    ],
    agentId: '3',
    furnishing: 'furnished',
    leaseTerm: '12 months minimum',
    verified: true,
    type: 'Penthouse',
    videoUrl: 'https://www.youtube.com/embed/ptm8a-DC2gk',
    coordinates: {
      lat: 31.36,
      lng: 27.89,
    },
    // Rental Terms
    insuranceDeposit: '10% of rent',
    annualIncrease: '5%',
    minimumStay: '12 months',
    // Property Reference Codes
    shortcode: 'LPNA007',
    referenceCode: 'LPNA007-2023',
    qrCode: 'https://example.com/qr/LPNA007-2023.png',
    propertyUrl: 'https://example.com/properties/LPNA007',
    cycle: 1,
  },
  {
    id: '8',
    title: 'Family Villa in Maadi',
    price: 38000,
    location: 'Maadi',
    region: 'Sarayat',
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    description:
      'Beautiful family villa with spacious garden, modern kitchen, and multiple living areas. Close to international schools.',
    status: 'rented',
    amenities: ['Garden', 'Parking', 'Security', 'Maid Room'],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
    ],
    agentId: '2',
    furnishing: 'semi-furnished',
    leaseTerm: '12 months minimum',
    verified: true,
    type: 'Villa',
    videoUrl: 'https://www.youtube.com/embed/c1u0Bk6MwBg',
    coordinates: {
      lat: 29.956,
      lng: 31.245,
    },
    // Rental Terms
    insuranceDeposit: '10% of rent',
    annualIncrease: '5%',
    minimumStay: '12 months',
    // Property Reference Codes
    shortcode: 'FVM008',
    referenceCode: 'FVM008-2023',
    qrCode: 'https://example.com/qr/FVM008-2023.png',
    propertyUrl: 'https://example.com/properties/FVM008',
    cycle: 1,
  },
  {
    id: '9',
    title: 'Contemporary Apartment in Zamalek',
    price: 32000,
    location: 'Zamalek',
    region: 'Downtown',
    bedrooms: 2,
    bathrooms: 2,
    area: 180,
    description:
      'Stylish contemporary apartment in the heart of Zamalek with Nile views. Walking distance to restaurants, cafes, and cultural attractions.',
    status: 'available',
    amenities: ['Balcony', 'Elevator', 'Central AC', 'Security'],
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&h=600&fit=crop',
    ],
    agentId: '1',
    furnishing: 'furnished',
    leaseTerm: '12 months minimum',
    featured: true,
    verified: true,
    type: 'Apartment',
    videoUrl: 'https://www.youtube.com/embed/RpKQEeovaNY',
    coordinates: {
      lat: 30.0626,
      lng: 31.2197,
    },
    insuranceDeposit: '10% of rent',
    annualIncrease: '5%',
    minimumStay: '12 months',
    // Property Reference Codes
    shortcode: 'CAPZ009',
    referenceCode: 'CAPZ009-2023',
    qrCode: 'https://example.com/qr/CAPZ009-2023.png',
    propertyUrl: 'https://example.com/properties/CAPZ009',
    cycle: 1,
  },
  {
    id: '10',
    title: 'Luxury Townhouse in New Cairo',
    price: 42000,
    location: 'New Cairo',
    region: 'Fifth Settlement',
    bedrooms: 3,
    bathrooms: 3,
    area: 280,
    description:
      'Modern townhouse in gated community with premium amenities including clubhouse, pool, and gym. Perfect for executive families.',
    status: 'available',
    amenities: ['Garden', 'Parking', 'Pool', 'Gym', 'Security', 'Clubhouse'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    ],
    agentId: '4',
    furnishing: 'semi-furnished',
    leaseTerm: '12 months minimum',
    featured: true,
    verified: true,
    type: 'Townhouse',
    videoUrl: 'https://www.youtube.com/embed/ptm8a-DC2gk',
    coordinates: {
      lat: 30.033,
      lng: 31.4913,
    },
    insuranceDeposit: '10% of rent',
    annualIncrease: '5%',
    minimumStay: '12 months',
    // Property Reference Codes
    shortcode: 'LTCNC010',
    referenceCode: 'LTCNC010-2023',
    qrCode: 'https://example.com/qr/LTCNC010-2023.png',
    propertyUrl: 'https://example.com/properties/LTCNC010',
    cycle: 1,
  },
  {
    id: '11',
    title: 'Elegant Studio in Maadi',
    price: 18000,
    location: 'Maadi',
    region: 'Degla',
    bedrooms: 1,
    bathrooms: 1,
    area: 85,
    description:
      'Compact and elegant studio perfect for young professionals. Modern finishes, fully equipped kitchen, and close to metro station.',
    status: 'available',
    amenities: ['Elevator', 'Central AC', 'Parking', 'Security'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    ],
    agentId: '2',
    furnishing: 'furnished',
    leaseTerm: '12 months minimum',
    verified: true,
    type: 'Studio',
    videoUrl: 'https://www.youtube.com/embed/zumJJUL_ruM',
    coordinates: {
      lat: 29.9511,
      lng: 31.2684,
    },
    insuranceDeposit: '10% of rent',
    annualIncrease: '5%',
    minimumStay: '12 months',
    // Property Reference Codes
    shortcode: 'ESM011',
    referenceCode: 'ESM011-2023',
    qrCode: 'https://example.com/qr/ESM011-2023.png',
    propertyUrl: 'https://example.com/properties/ESM011',
    cycle: 1,
  },
  {
    id: '12',
    title: 'Coastal Chalet in New Alamein',
    price: 48000,
    location: 'New Alamein',
    region: 'Marina',
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    description:
      'Beautifully designed chalet with direct beach access and stunning Mediterranean views. Ideal for summer living or year-round coastal lifestyle.',
    status: 'available',
    amenities: ['Beach Access', 'Pool', 'Parking', 'Security', 'BBQ Area'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    ],
    agentId: '3',
    furnishing: 'furnished',
    leaseTerm: '12 months minimum',
    featured: true,
    verified: true,
    type: 'Chalet',
    videoUrl: 'https://www.youtube.com/embed/A9bPV2kN1SE',
    coordinates: {
      lat: 31.3485,
      lng: 27.8765,
    },
    insuranceDeposit: '10% of rent',
    annualIncrease: '5%',
    minimumStay: '12 months',
    // Property Reference Codes
    shortcode: 'CCNA012',
    referenceCode: 'CCNA012-2023',
    qrCode: 'https://example.com/qr/CCNA012-2023.png',
    propertyUrl: 'https://example.com/properties/CCNA012',
    cycle: 1,
  },
  {
    id: '13',
    title: 'Premium Loft in New Cairo',
    price: 39000,
    location: 'New Cairo',
    region: 'Fifth Settlement',
    bedrooms: 2,
    bathrooms: 2,
    area: 220,
    description:
      'Industrial-chic loft with high ceilings, exposed brick, and floor-to-ceiling windows. Perfect for creative professionals seeking unique living space.',
    status: 'available',
    amenities: ['Parking', 'Elevator', 'Central AC', 'Security', 'Gym'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    ],
    agentId: '1',
    furnishing: 'semi-furnished',
    leaseTerm: '12 months minimum',
    verified: true,
    type: 'Loft',
    coordinates: {
      lat: 30.0278,
      lng: 31.4345,
    },
    insuranceDeposit: '10% of rent',
    annualIncrease: '5%',
    minimumStay: '12 months',
    // Property Reference Codes
    shortcode: 'PLNC013',
    referenceCode: 'PLNC013-2023',
    qrCode: 'https://example.com/qr/PLNC013-2023.png',
    propertyUrl: 'https://example.com/properties/PLNC013',
    cycle: 1,
  },
  {
    id: '14',
    title: 'Garden Apartment in Maadi',
    price: 26000,
    location: 'Maadi',
    region: 'Sarayat',
    bedrooms: 2,
    bathrooms: 2,
    area: 160,
    description:
      'Ground floor apartment with private garden access. Family-friendly compound with playground and green spaces. Close to schools and shops.',
    status: 'available',
    amenities: ['Garden', 'Parking', 'Security', 'Playground', 'Central AC'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&h=600&fit=crop',
    ],
    agentId: '4',
    furnishing: 'furnished',
    leaseTerm: '12 months minimum',
    featured: true,
    verified: true,
    type: 'Apartment',
    coordinates: {
      lat: 29.965,
      lng: 31.258,
    },
    insuranceDeposit: '10% of rent',
    annualIncrease: '5%',
    minimumStay: '12 months',
    // Property Reference Codes
    shortcode: 'GAM014',
    referenceCode: 'GAM014-2023',
    qrCode: 'https://example.com/qr/GAM014-2023.png',
    propertyUrl: 'https://example.com/properties/GAM014',
    cycle: 1,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    text: 'BOB Rentalz made finding our dream home in New Cairo so easy. Professional service and beautiful properties!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Fatima Al-Said',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    text: 'Excellent experience from start to finish. Sara was incredibly helpful and found us the perfect apartment in Maadi.',
    rating: 5,
  },
  {
    id: '3',
    name: 'John Anderson',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop',
    text: 'The verification process gave us peace of mind. Highly recommend BOB Rentalz for long-term rentals in Egypt.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Nour Hassan',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
    text: 'Found our beachfront villa in New Alamein through BOB Rentalz. The entire process was smooth and transparent.',
    rating: 5,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 5 Tips for Renting a Property in Egypt',
    slug: 'top-5-tips-for-renting-a-property-in-egypt',
    featuredImage:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    category: 'Real Estate Tips',
    tags: ['renting', 'egypt', 'tips'],
    author: {
      name: 'Ahmed Hassan',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      role: 'Real Estate Agent',
    },
    publishDate: '2023-09-15',
    readingTime: '5 min',
    excerpt:
      'Renting a property in Egypt can be a daunting task, but with the right tips, you can find your perfect home. In this article, we share the top 5 tips for renting a property in Egypt.',
    content: `Renting a property in Egypt can be a daunting task, but with the right tips, you can find your perfect home. In this article, we share the top 5 tips for renting a property in Egypt.

1. **Research the Area**: Before you start looking for a property, research the area you are interested in. Consider factors such as proximity to schools, hospitals, shopping centers, and public transportation. This will help you find a property that meets your needs and lifestyle.

2. **Check the Legal Documents**: Ensure that the property you are interested in has all the necessary legal documents, such as the title deed and property tax receipts. This will protect you from any legal issues in the future.

3. **Inspect the Property**: Before signing a lease agreement, inspect the property thoroughly. Check for any structural issues, electrical problems, or plumbing leaks. Make sure the property is in good condition and meets your expectations.

4. **Negotiate the Lease Terms**: Don't be afraid to negotiate the lease terms with the landlord. Discuss the rent amount, lease duration, and any additional fees. Make sure the terms are fair and reasonable.

5. **Get a Security Deposit**: Always ask for a security deposit when renting a property. This will protect you in case of any damage to the property during your tenancy. Make sure the deposit is reasonable and clearly stated in the lease agreement.

By following these tips, you can ensure a smooth and hassle-free rental experience in Egypt. Remember to do your research, check the legal documents, inspect the property, negotiate the lease terms, and get a security deposit. Happy renting!`,
    metaTitle: 'Top 5 Tips for Renting a Property in Egypt',
    metaDescription:
      'Renting a property in Egypt can be a daunting task, but with the right tips, you can find your perfect home. In this article, we share the top 5 tips for renting a property in Egypt.',
  },
  {
    id: '2',
    title: 'The Benefits of Renting a Property in New Cairo',
    slug: 'the-benefits-of-renting-a-property-in-new-cairo',
    featuredImage:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    category: 'Real Estate Benefits',
    tags: ['renting', 'new cairo', 'benefits'],
    author: {
      name: 'Sara Mohamed',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      role: 'Real Estate Agent',
    },
    publishDate: '2023-09-10',
    readingTime: '4 min',
    excerpt:
      'Renting a property in New Cairo offers numerous benefits, from convenient location to modern amenities. In this article, we explore the top benefits of renting a property in New Cairo.',
    content: `Renting a property in New Cairo offers numerous benefits, from convenient location to modern amenities. In this article, we explore the top benefits of renting a property in New Cairo.

1. **Convenient Location**: New Cairo is one of the most convenient locations in Egypt, with easy access to major highways, public transportation, and international airports. This makes it an ideal location for both locals and expatriates.

2. **Modern Amenities**: New Cairo is known for its modern amenities, including shopping centers, restaurants, cafes, and entertainment venues. This makes it a great place to live and enjoy a high standard of living.

3. **Affordable Rent**: Renting a property in New Cairo is generally more affordable than buying a property. This makes it an ideal option for young professionals and families who want to live in a modern and convenient location without the high cost of ownership.

4. **Security and Maintenance**: Renting a property in New Cairo means you don't have to worry about maintenance and repairs. The landlord is responsible for maintaining the property, ensuring that it is always in good condition.

5. **Flexibility**: Renting a property in New Cairo offers flexibility in terms of lease duration and location. You can choose a lease duration that suits your needs and move to a different location if necessary.

By renting a property in New Cairo, you can enjoy a modern and convenient lifestyle without the high cost of ownership. Remember to research the area, check the legal documents, inspect the property, negotiate the lease terms, and get a security deposit. Happy renting!`,
    metaTitle: 'The Benefits of Renting a Property in New Cairo',
    metaDescription:
      'Renting a property in New Cairo offers numerous benefits, from convenient location to modern amenities. In this article, we explore the top benefits of renting a property in New Cairo.',
  },
  {
    id: '3',
    title: 'How to Choose the Right Property in Maadi',
    slug: 'how-to-choose-the-right-property-in-maadi',
    featuredImage:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    category: 'Real Estate Tips',
    tags: ['renting', 'maadi', 'tips'],
    author: {
      name: 'Omar Khalil',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      role: 'Real Estate Agent',
    },
    publishDate: '2023-09-05',
    readingTime: '6 min',
    excerpt:
      'Choosing the right property in Maadi can be a challenging task, but with the right tips, you can find your perfect home. In this article, we share the top tips for choosing the right property in Maadi.',
    content: `Choosing the right property in Maadi can be a challenging task, but with the right tips, you can find your perfect home. In this article, we share the top tips for choosing the right property in Maadi.

1. **Research the Area**: Before you start looking for a property, research the area you are interested in. Consider factors such as proximity to schools, hospitals, shopping centers, and public transportation. This will help you find a property that meets your needs and lifestyle.

2. **Check the Legal Documents**: Ensure that the property you are interested in has all the necessary legal documents, such as the title deed and property tax receipts. This will protect you from any legal issues in the future.

3. **Inspect the Property**: Before signing a lease agreement, inspect the property thoroughly. Check for any structural issues, electrical problems, or plumbing leaks. Make sure the property is in good condition and meets your expectations.

4. **Negotiate the Lease Terms**: Don't be afraid to negotiate the lease terms with the landlord. Discuss the rent amount, lease duration, and any additional fees. Make sure the terms are fair and reasonable.

5. **Get a Security Deposit**: Always ask for a security deposit when renting a property. This will protect you in case of any damage to the property during your tenancy. Make sure the deposit is reasonable and clearly stated in the lease agreement.

6. **Consider the Neighborhood**: Maadi is a diverse neighborhood with different areas to choose from. Consider the neighborhood you want to live in based on your lifestyle and preferences. Some areas are more family-friendly, while others are more suitable for young professionals.

7. **Check the Amenities**: Maadi is known for its modern amenities, including shopping centers, restaurants, cafes, and entertainment venues. Check the amenities available in the property you are interested in to ensure they meet your needs.

8. **Visit the Property**: Before signing a lease agreement, visit the property multiple times to get a feel for the area and the property. This will help you make an informed decision and ensure that the property is the right fit for you.

By following these tips, you can ensure a smooth and hassle-free rental experience in Maadi. Remember to do your research, check the legal documents, inspect the property, negotiate the lease terms, get a security deposit, consider the neighborhood, check the amenities, and visit the property. Happy renting!`,
    metaTitle: 'How to Choose the Right Property in Maadi',
    metaDescription:
      'Choosing the right property in Maadi can be a challenging task, but with the right tips, you can find your perfect home. In this article, we share the top tips for choosing the right property in Maadi.',
  },
  {
    id: '4',
    title: 'The Best Properties in New Alamein',
    slug: 'the-best-properties-in-new-alamein',
    featuredImage:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    category: 'Real Estate Highlights',
    tags: ['renting', 'new alamein', 'properties'],
    author: {
      name: 'Layla Ibrahim',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      role: 'Real Estate Agent',
    },
    publishDate: '2023-09-01',
    readingTime: '5 min',
    excerpt:
      'New Alamein is a popular destination for beachfront properties, and there are many great options to choose from. In this article, we highlight the best properties in New Alamein.',
    content: `New Alamein is a popular destination for beachfront properties, and there are many great options to choose from. In this article, we highlight the best properties in New Alamein.

1. **Beachfront Villa**: This exclusive beachfront villa offers direct sea access, infinity pool, and panoramic views. Perfect for families seeking a luxurious coastal lifestyle.

2. **Luxury Penthouse**: This spectacular penthouse features panoramic sea views, private terrace, and premium finishes throughout. Ideal for those looking for a high-end rental in New Alamein.

3. **Spacious Duplex**: This modern duplex with open-plan living, high ceilings, and a private rooftop terrace is located in a family-friendly compound. Perfect for those looking for a comfortable and convenient rental.

4. **Elegant Townhouse**: This charming townhouse with private garden, modern kitchen, and spacious bedrooms is ideal for families. It offers amenities such as parking, security, and storage.

5. **Contemporary Apartment**: This bright and modern 2-bedroom apartment with contemporary finishes and great natural light is perfect for young professionals. It offers amenities such as balcony, parking, elevator, and central AC.

6. **Family Villa**: This beautiful family villa with spacious garden, modern kitchen, and multiple living areas is close to international schools. It offers amenities such as garden, parking, security, and maid room.

7. **Modern Villa**: This stunning modern villa with contemporary design, spacious living areas, and a beautiful garden is located in a gated community with 24/7 security. It offers amenities such as garden, parking, security, pool, and gym.

8. **Luxurious Apartment**: This beautiful apartment in the heart of Maadi features modern amenities and a large balcony with garden views. Walking distance to schools and shops. It offers amenities such as balcony, parking, elevator, and central AC.

By highlighting the best properties in New Alamein, we hope to help you find your perfect home. Remember to do your research, check the legal documents, inspect the property, negotiate the lease terms, get a security deposit, consider the neighborhood, check the amenities, and visit the property. Happy renting!`,
    metaTitle: 'The Best Properties in New Alamein',
    metaDescription:
      'New Alamein is a popular destination for beachfront properties, and there are many great options to choose from. In this article, we highlight the best properties in New Alamein.',
  },
];
