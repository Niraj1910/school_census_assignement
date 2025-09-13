"use client";

import React, { ReactNode } from "react";
import { GraduationCap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface ProtectedWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({
  children,
  fallback,
}) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      fallback || (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to School Census
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Please sign in to access the platform features and manage your
              school information.
            </p>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
};

export default ProtectedWrapper;
