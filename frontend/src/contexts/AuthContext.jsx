import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import apiClient from "../api/client";

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // On mount, try to restore session from stored token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      apiClient
        .get("/auth/me")
        .then((res) => {
          setUser(res.data);
          setToken(storedToken);
        })
        .catch(() => {
          // Token expired or invalid
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const register = async (email, password, role = "investor", displayName = "") => {
    // 1. Create Firebase user
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseToken = await cred.user.getIdToken();

    // 2. Register with backend
    const res = await apiClient.post("/auth/register", {
      firebase_token: firebaseToken,
      role: role,
      display_name: displayName || email.split("@")[0],
    });

    const { access_token, user: userData } = res.data;

    // 3. Store token and user
    localStorage.setItem("token", access_token);
    setToken(access_token);
    setUser(userData);

    return userData;
  };

  const login = async (email, password) => {
    // 1. Sign in with Firebase
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const firebaseToken = await cred.user.getIdToken();

    // 2. Login with backend
    const res = await apiClient.post("/auth/login", {
      firebase_token: firebaseToken,
    });

    const { access_token, user: userData } = res.data;

    // 3. Store token and user
    localStorage.setItem("token", access_token);
    setToken(access_token);
    setUser(userData);

    return userData;
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      // Firebase signout can fail if already signed out
    }
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user && !!token,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
