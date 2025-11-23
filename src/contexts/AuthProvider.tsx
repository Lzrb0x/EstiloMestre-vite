import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';

interface AuthTokens {
  accessToken: string;
}

interface User {
  name: string;
  tokens: AuthTokens;
}

const API_BASE_URL = 'http://localhost:5008';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Carregar usuário do localStorage ao montar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (name: string, phone: string) => {
    try {
      
      const response = await fetch(`${API_BASE_URL}/login/partial`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({ name, phone }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro na resposta do servidor:', errorText);
        throw new Error('Falha no login');
      }

      const userData: User = await response.json();
      
      // Salvar usuário no estado e localStorage
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const getAccessToken = () => {
    const token = user?.tokens.accessToken || null;
    return token;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}