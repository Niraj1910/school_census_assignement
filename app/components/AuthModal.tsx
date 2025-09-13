"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
  onSuccess?: () => void; // Add success callback
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "signin",
  onSuccess,
}) => {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  // Add useEffect to sync internal state with prop changes and reset form
  useEffect(() => {
    setMode(initialMode);
    resetForm(); // Reset form fields when initialMode changes
  }, [initialMode]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result =
      mode === "signin"
        ? await login(email, password)
        : await signup(email, password);

    if (result.success) {
      onClose();
      resetForm();

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // If it was a successful registration, switch to signin mode
      if (mode === "signup") {
        setMode("signin");
      }
    } else {
      setError(result.error || "An error occurred");
    }
    setLoading(false);
  };

  const switchMode = () => {
    const newMode = mode === "signin" ? "signup" : "signin";
    setMode(newMode);
    resetForm(); // Reset form fields when switching modes
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="dummy@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="12345678"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors font-medium"
          >
            {loading ? "Loading..." : mode === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={switchMode}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            {mode === "signin"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
