export interface User {
  idAccount: string;
  name: string;
  email: string | null;
  region: string | null;
  notifications: boolean;
  image: string | null;
  description: string | null;
  socials: string[];
  isPlaza: boolean;
  lang: string | null;
  createdAt: Date;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  region?: string;
  notifications?: boolean;
  image?: string;
  description?: string;
  socials?: string[];
  lang?: string;
  isPlaza?: boolean;
}

export interface UserBasic {
  [key: string]: {
    // key: accountId
    name: string;
    image: string | null;
    isPlaza?: boolean;
  };
}
