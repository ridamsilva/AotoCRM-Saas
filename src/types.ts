export type UserRole = 'master' | 'admin' | 'sales';
export type StoreStatus = 'active' | 'suspended' | 'past_due';
export type VehicleStatus = 'available' | 'reserved' | 'sold';
export type LeadStatus = 'new' | 'contacted' | 'negotiation' | 'closed' | 'lost';

export interface Store {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  primaryColor: string;
  status: StoreStatus;
  planId: string;
  ownerEmail: string;
  createdAt: any;
  updatedAt: any;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  storeId?: string;
  status: 'active' | 'inactive';
  createdAt?: any;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  version: string;
  year: number;
  mileage: number;
  price: number;
  cost: number;
  status: VehicleStatus;
  storeId: string;
  photos: string[];
  fuel: string;
  transmission: string;
  createdAt: any;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  status: LeadStatus;
  score: number;
  storeId: string;
  assignedTo?: string;
  createdAt: any;
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: any;
  type: 'text' | 'image' | 'file';
  fromMe: boolean;
}

export interface Conversation {
  id: string;
  storeId: string;
  leadId: string;
  leadName: string;
  lastMessage: string;
  unreadCount: number;
  status: 'open' | 'closed';
  updatedAt: any;
}
