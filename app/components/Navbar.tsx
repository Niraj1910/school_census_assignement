"use client";

import React, { useState } from "react";
import { User, GraduationCap, Plus, List } from "lucide-react";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

const Navbar: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleAuthClick = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">
                School Census
              </span>
            </Link>

            {/* Navigation Items */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  {/* Action Buttons */}
                  <Link href="/add/school">
                    <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                      <Plus className="w-4 h-4 mr-2" />
                      Add School
                    </button>
                  </Link>

                  <Link href="/schools">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                      <List className="w-4 h-4 mr-2" />
                      View Schools
                    </button>
                  </Link>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span className="text-sm font-medium">{user?.email}</span>
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm text-gray-500">Signed in as</p>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user?.email}
                          </p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Auth Buttons */}
                  <button
                    onClick={() => handleAuthClick("signin")}
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick("signup")}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </>
  );
};

export default Navbar;
