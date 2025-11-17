# Sistema de Autenticação Parcial

## Visão Geral

Este sistema implementa autenticação parcial para o fluxo de agendamento. Quando um usuário tenta confirmar um agendamento sem estar logado, um dialog é exibido solicitando nome e número de telefone.

## Estrutura

### Componentes Criados

1. **Dialog Components** (`src/components/ui/dialog.tsx`)
   - Componentes de UI do shadcn para exibir modais
   - Baseado em @radix-ui/react-dialog

2. **Input Component** (`src/components/ui/input.tsx`)
   - Campo de entrada de formulário estilizado
   - Usado no formulário de login

3. **Label Component** (`src/components/ui/label.tsx`)
   - Label para campos de formulário
   - Baseado em @radix-ui/react-label

4. **AuthContext** (`src/contexts/AuthContext.tsx`)
   - Gerencia o estado de autenticação da aplicação
   - Armazena token no localStorage
   - Fornece funções de login/logout

5. **useAuth Hook** (`src/hooks/useAuth.ts`)
   - Hook personalizado para acessar o contexto de autenticação
   - Separado do contexto para evitar warnings de Fast Refresh

6. **PartialLoginDialog** (`src/components/auth/PartialLoginDialog.tsx`)
   - Dialog modal para login parcial
   - Coleta nome e telefone do usuário
   - Integra com a API de autenticação

### Integração

O `AuthProvider` foi adicionado ao `main.tsx` para envolver toda a aplicação:

```tsx
<AuthProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</AuthProvider>
```

## Como Funciona

### Fluxo de Autenticação

1. **Usuário tenta confirmar agendamento**
   - No `ConfirmationStep.tsx`, ao clicar em "Confirmar Agendamento"
   - O sistema verifica se o usuário está autenticado

2. **Se não estiver autenticado**
   - Um dialog é exibido (`PartialLoginDialog`)
   - Solicita nome e número de telefone
   - Envia os dados para `http://localhost:5008/login/partial`

3. **Resposta da API**
   ```json
   {
     "name": "string",
     "tokens": {
       "accessToken": "string"
     }
   }
   ```

4. **Após login bem-sucedido**
   - Token é armazenado no localStorage
   - Usuário é armazenado no estado global
   - Agendamento é processado automaticamente
   - Token é enviado no header `Authorization` das próximas requisições

### Persistência

O token é salvo no localStorage, então o usuário permanece logado mesmo após recarregar a página.

### Uso em Outras Partes da Aplicação

Para usar a autenticação em outros componentes:

```tsx
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { isAuthenticated, user, getAccessToken, login, logout } = useAuth();

  const handleApiCall = async () => {
    const token = getAccessToken();
    
    const response = await fetch('http://localhost:5008/api/endpoint', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  };
}
```

## API Endpoints

### Login Parcial
- **URL**: `http://localhost:5008/login/partial`
- **Método**: POST
- **Body**:
  ```json
  {
    "name": "Nome do Usuário",
    "phone": "(00) 00000-0000"
  }
  ```
- **Resposta**:
  ```json
  {
    "name": "Nome do Usuário",
    "tokens": {
      "accessToken": "jwt-token-aqui"
    }
  }
  ```

### Uso do Token

Para todas as requisições autenticadas, envie o token no header:
```
Authorization: Bearer {accessToken}
```

## Funcionalidades Disponíveis

### AuthContext API

- `user`: Objeto do usuário atual ou null
- `isAuthenticated`: Boolean indicando se há um usuário logado
- `login(name, phone)`: Função para fazer login
- `logout()`: Função para fazer logout
- `getAccessToken()`: Retorna o token de acesso atual

## Próximos Passos

Para integrar completamente o agendamento com a API:

1. No `ConfirmationStep.tsx`, descomente o código no `processBooking()`
2. Substitua pelo endpoint real de agendamento
3. Ajuste o body da requisição conforme necessário

Exemplo:
```tsx
const processBooking = async () => {
  try {
    const token = getAccessToken();
    
    const response = await fetch('http://localhost:5008/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        barbershopId: bookingData.barbershopId,
        serviceId: bookingData.barbershopServiceId,
        employeeId: bookingData.employeeId,
        date: bookingData.date,
        time: bookingData.time
      })
    });

    if (!response.ok) {
      throw new Error('Falha ao criar agendamento');
    }

    const result = await response.json();
    // Processar sucesso...
  } catch (error) {
    // Tratar erro...
  }
};
```

## Dependências Adicionadas

- `@radix-ui/react-label`: ^2.1.8
