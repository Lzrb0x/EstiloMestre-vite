import { createContext } from 'react';

interface AuthTokens {
  accessToken: string;
}

interface User {
  name: string;
  tokens: AuthTokens;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string, phone: string) => Promise<void>;
  logout: () => void;
  getAccessToken: () => string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
