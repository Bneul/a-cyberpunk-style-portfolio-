export interface Project {
  id: string;
  title: string;
  role: string;
  completion: number;
  description: string;
  tags: string[];
  thumbnailUrl: string;
  videoUrl?: string; // Optional video trailer
  stats: {
    label: string;
    value: string;
  }[];
  locked?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export enum GameLevel {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
  COMPLETED = 'COMPLETED'
}
