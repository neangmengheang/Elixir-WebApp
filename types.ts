
export interface Claim {
  id: string;
  type: string;
  claimant: string;
  amount: number;
  status: 'PENDING' | 'REVIEWING' | 'APPROVED' | 'REJECTED' | 'AUTO-PAID';
  date: string;
}

export interface SmartContractPolicy {
  id: string;
  policyNumber: string;
  type: string;
  coverageAmount: number;
  premium: number;
  status: 'ACTIVE' | 'EXPIRED';
  startDate: string;
  endDate: string;
  blockchainHash: string; // Immutable record
}

export interface Transaction {
  id: string;
  type: 'PREMIUM_PAYMENT' | 'CLAIM_PAYOUT' | 'REWARD_EARNED' | 'REWARD_REDEEMED';
  amount: number;
  date: string;
  hash: string;
}

export interface Concern {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  date: string;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH'; 
}

export enum ViewState {
  HOME = 'HOME',
  SMART_WALLET = 'SMART_WALLET',
  SOCIALFY = 'SOCIALFY',
  EDUCATION = 'EDUCATION',
  GAME = 'GAME',
  SETTINGS = 'SETTINGS',
  AI_ADVISOR = 'AI_ADVISOR'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}

// User & Role Types
export type UserRole = 'USER' | 'AGENCY' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  walletAddress?: string;
  balance?: number; // ELIXIR Tokens
  isVerified?: boolean;
  companyName?: string;
}

// Socialfy Feed Types
export interface Comment {
  id: string;
  author: User;
  text: string;
  timestamp: string;
  isOfficialResponse?: boolean;
}

export interface Post {
  id: string;
  author: User;
  title: string;
  content: string;
  category: 'General' | 'Claim Issue' | 'Advice' | 'Safety Alert';
  timestamp: string;
  likes: number;
  comments: Comment[];
}

// Game Types
export interface Quest {
  id: string;
  title: string;
  reward: number; // points
  completed: boolean;
}

export interface RewardItem {
  id: string;
  title: string;
  cost: number;
  type: 'CREDIT' | 'VOUCHER' | 'GIFT';
  image?: string;
}

// Settings Types
export interface PrivacySetting {
  id: string;
  label: string;
  description: string;
  isEnabled: boolean;
  isEssential: boolean; // If true, cannot be disabled
}