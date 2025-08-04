// Types
export type TLoginRequest = {
  phone: string;
  password: string;
};

export type TRegisterRequest = {
  name?: string;
  phone: string;
  password: string;
};

export type TAuthResponse = {
  user: {
    email?: string;
    id: string;
    name: string;
    phone: string;
    role: "admin" | "manager" | "customer";
  };
  access_token: string;
};

export type TChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export type TForgotPasswordRequest = {
  phone: string;
};

export type TResetPasswordRequest = {
  phone: string;
  otp: string;
  newPassword: string;
};

export type TVerifyOtpRequest = {
  phone: string;
  otp: string;
};
