import React, { createContext, useEffect, useState } from "react";
import {
  AuthContextData,
  AuthProviderType,
} from "../interface/AuthContextTypes";
import * as AuthSession from "expo-auth-session";
import { User } from "../interface/User";

import { api } from "../services/api";

import { GITHUB_CLIENT_ID, GITHUB_SCOPE } from "react-native-dotenv";

import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthResponse = {
  token: string;
  user: User;
};

type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  };
  type?: string;
};

const CLIENT_ID = GITHUB_CLIENT_ID;
const SCOPE = GITHUB_SCOPE;
const USER_STORAGE = "@dowhile-mobile:user";
const TOKEN_STORAGE = "@dowhile-mobile:token";

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(true);

  const signIn = async () => {
    try {
      setIsSigningIn(true);
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
      const authSessionResponse = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (
        authSessionResponse.type === "success" &&
        authSessionResponse.params.error !== "access_denied"
      ) {
        const response = await api.post("authenticate", {
          code: authSessionResponse.params.code,
        });

        const { user, token } = response.data as AuthResponse;

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE, token);

        setUser(user);
      }
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOut = async () => {
    setUser(null);

    await AsyncStorage.removeItem(USER_STORAGE);
    await AsyncStorage.removeItem(TOKEN_STORAGE);
  };

  const getLoggedInUser = async () => {
    const storedUser = await AsyncStorage.getItem(USER_STORAGE);
    const storedToken = await AsyncStorage.getItem(TOKEN_STORAGE);

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setIsSigningIn(false);
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isSigningIn,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
