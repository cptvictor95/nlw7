import { User } from "./UserType";

export type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

export type AuthProviderType = {
  children: React.ReactNode;
};
