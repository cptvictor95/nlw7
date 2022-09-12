import { User } from "./User";

export type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

export type AuthProviderType = {
  children: React.ReactNode;
};
