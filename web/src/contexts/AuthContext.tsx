import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { AuthContextData, AuthProviderType } from "../types/AuthContextType";
import { AuthResponse } from "../types/AuthResponseType";
import { User } from "../types/UserType";

export const AuthContext = React.createContext({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=a485c8da0c6933311177`;

  const signIn = async (githubCode: string) => {
    try {
      const response = await api.post<AuthResponse>("authenticate", {
        code: githubCode,
      });

      const { token, user } = response.data;

      localStorage.setItem("@dowhile:authToken", token);

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      setUser(user);
    } catch (error: any) {
      console.error({ error: error.message });
    }
  };

  const signOut = () => {
    setUser(null);

    localStorage.removeItem("@dowhile:authToken");
  };

  useEffect(() => {
    const token = localStorage.getItem("@dowhile:authToken");

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api
        .get<User>("/profile")
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => console.error(error.message));
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;

    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");

      window.history.pushState({}, "", urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
