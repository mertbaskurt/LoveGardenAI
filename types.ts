
export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  coupleId?: string;
}

export interface Couple {
  id: string;
  partner1Id: string;
  partner2Id?: string; // Optional until matched
  plantId?: string;
  code: string; // The join code
}

export type PlantType = 'flower' | 'bonsai' | 'tropical';

export interface Plant {
  id: string;
  coupleId: string;
  type: PlantType;
  level: number;
  exp: number;
  maxExp: number; // XP needed for next level
  name: string;
  createdAt: number;
}

export type CareType = 'water' | 'sun'; // water = text, sun = emoji

export interface CareAction {
  id: string;
  coupleId: string;
  fromUserId: string;
  type: CareType;
  message: string; // The text note or the emoji char
  createdAt: number;
  xpGained: number;
}

export interface AppState {
  user: User | null;
  couple: Couple | null;
  plant: Plant | null;
  careHistory: CareAction[];
}

export type ViewState = 
  | 'onboarding' 
  | 'auth' 
  | 'match' 
  | 'plant-select' 
  | 'garden' 
  | 'timeline' 
  | 'settings' 
  | 'send-care'
  | 'generate-image';
