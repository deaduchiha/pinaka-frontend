import { UserRole, UserStatus } from "./common";

// auth/login | REQUEST
export type TLoginRequest = {
  phone: string;
  password: string;
};

// auth/register | REQUEST
export type TRegisterRequest = {
  name?: string;
  phone: string;
  password: string;
};

// auth/login | RESPONSE
export type TLoginResponse = {
  access_token: string;
  expires_in: number;
  user: {
    id: string;
    name: string;
    phone: string;
    role: UserRole;
    status: UserStatus;
  };
};

// auth/register | RESPONSE
export type TRegisterResponse = {
  emailVerified: boolean;
  id: string;
  name: string;
  phone: string;
  phoneVerified: boolean;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type TMeResponse = {
  address: string | null;
  city: string | null;
  metadata: Record<string, unknown> | null;
  nationalId: string | null;
  postalCode: string | null;
  province: string | null;
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
