import { LucideIcon } from 'lucide-react';

export interface RewardItem {
  id: string;
  title: string;
  category: string;
  points: number;
  imageUrl: string;
  description: string;
}

export interface QuickNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  color?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Tab {
  HOME = 'HOME',
  REWARDS = 'REWARDS',
  EV_STATIONS = 'EV_STATIONS',
  AI_CHAT = 'AI_CHAT',
  PROFILE = 'PROFILE',
  MOBILE_TOPUP = 'MOBILE_TOPUP',
  ELEC_BILL = 'ELEC_BILL',
  SERVICE_LIST = 'SERVICE_LIST',
  SETTINGS = 'SETTINGS',
  PERSONAL_INFO = 'PERSONAL_INFO',
  TRANSACTION_HISTORY = 'TRANSACTION_HISTORY',
  NOTIFICATIONS = 'NOTIFICATIONS',
  REWARD_DETAIL = 'REWARD_DETAIL',
  SERVICE_DETAIL = 'SERVICE_DETAIL',
  PAYMENT_METHODS = 'PAYMENT_METHODS'
}

// Knowledge Graph Types
export type NodeType = 'symptom' | 'disease' | 'medicine' | 'location' | 'other';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  x?: number; // For visualization
  y?: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  relation: string;
}

export interface KnowledgeGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

// AI Training Types
export interface LearnedConcept extends GraphNode {
  learnedAt: Date;
  confidence: number;
  sourceInteraction: string; // The chat message ID or preview
}

// EV Station Types
export interface EVStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  status: 'Available' | 'Busy' | 'Maintenance';
  connectors: string[];
  power: string;
  price: string;
  distance?: number; // Calculated distance in km
}

export interface ServiceVenue {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  distance: string;
  imageUrl: string;
  isOpen: boolean;
  address: string;
  tags: string[];
  phone?: string;
  hours?: string;
  description?: string;
}

export interface Transaction {
  id: string;
  type: 'redeem' | 'earn' | 'payment' | 'topup' | 'bill';
  title: string;
  amount: number; // points or money
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  description?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'promotion';
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'wallet';
  name: string;
  last4?: string;
  isDefault: boolean;
  icon?: string;
}