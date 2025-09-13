"use client";

import React from "react";
import Image from "next/image";
import { Plus, List, Users, MapPin, GraduationCap } from "lucide-react";
import HeroImage from "../public/school-hero.jpg";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { useAuth } from "./context/AuthContext";

const SchoolCensusPage: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Education Management Badge */}
        <div className="mb-8">
          <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            <GraduationCap className="w-4 h-4 mr-2" />
            Education Management
          </span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              School Census
              <span className="block text-blue-600">Platform</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Manage and discover educational institutions with our
              comprehensive school database. Add schools, browse listings, and
              connect with educational communities.
            </p>

            {/* Conditional rendering based on auth state */}
            {isLoggedIn ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={"/add/school"}>
                  <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New School
                  </button>
                </Link>
                <Link href={"/schools"}>
                  <button className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    <List className="w-4 h-4 mr-2" />
                    Browse Schools
                  </button>
                </Link>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm font-medium">
                  🔒 Sign in to access all platform features and manage schools
                </p>
              </div>
            )}
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={HeroImage}
                alt="School building"
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  // Fallback when image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
            {/* Floating icon */}
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Why Choose School Census Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose School Census?
            </h2>
            <p className="text-lg text-gray-600">
              Streamlined school management and discovery platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Easy Registration */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Plus className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Easy Registration
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Add schools with our simple, validated form system
              </p>
            </div>

            {/* Browse & Discover */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Browse & Discover
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Explore schools with advanced search and filtering
              </p>
            </div>

            {/* Location Based */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Location Based
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Find schools by city, state, and geographical area
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl px-8 py-16 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            {isLoggedIn
              ? "Start managing school information today"
              : "Join our platform and start managing school information today"}
          </p>
          {isLoggedIn ? (
            <Link href={"/add/school"}>
              <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors shadow-lg">
                <GraduationCap className="w-5 h-5 mr-2" />
                Add Your School Now
              </button>
            </Link>
          ) : (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 inline-block">
              <p className="text-sm mb-2">Sign in to access all features</p>
              <button className="inline-flex items-center px-6 py-2 bg-white text-blue-600 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                <GraduationCap className="w-4 h-4 mr-2" />
                Get Started
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default SchoolCensusPage;
