export interface AppUser {
  id: number;
  displayName: string;
  email: string;
  token: string;
  imageUrl?: string;
}

export interface Member {
  id: number;
  displayName: string;
  imageUrl?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  displayName: string;
  email: string;
  password: string;
}

