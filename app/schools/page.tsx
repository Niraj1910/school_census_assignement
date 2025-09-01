"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import SchoolCard from "../components/SchoolCard";
import { School } from "../interfaces";
import Navbar from "../components/Navbar";

const OurSchools: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSchoolsData() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch("/api/schools");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();

        console.log("API Response:", json); // Debug log

        if (json.success && Array.isArray(json.schools)) {
          setSchools(json.schools);
          console.log("Schools set:", json.schools); // Debug log
        } else {
          console.error("Invalid response format:", json);
          setError("Invalid response format from server");
        }
      } catch (error) {
        console.error("Failed to fetch schools:", error);
        setError("Failed to fetch schools. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSchoolsData();
  }, []);

  // Filter schools based on search term - FIXED: Added schools as dependency
  const filteredSchools = useMemo(() => {
    console.log("Filtering schools:", schools.length); // Debug log

    if (!searchTerm) return schools;

    return schools.filter(
      (school) =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.state.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, schools]); // FIXED: Added schools to dependency array

  console.log("Filtered schools:", filteredSchools.length); // Debug log

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="animate-spin h-12 w-12 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Loading schools...
              </h3>
              <p className="text-gray-600">
                Please wait while we fetch the school data.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Error loading schools
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Our Schools
            </h1>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search schools by name, city, or state..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Debug Info - Remove this in production */}
          {/* <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Debug: Total schools: {schools.length}, Filtered:{" "}
              {filteredSchools.length}
            </p>
          </div> */}

          {/* Schools Grid */}
          {schools.length === 0 ? (
            // No schools in DB
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No schools found
              </h3>
              <p className="text-gray-600">
                No schools have been added to the database yet.
              </p>
            </div>
          ) : filteredSchools.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredSchools.map((school) => (
                  <SchoolCard key={school.id} school={school} />
                ))}
              </div>
              {/* Results Counter */}
              <div className="text-center">
                <p className="text-gray-600">
                  Showing {filteredSchools.length} of {schools.length} schools
                </p>
              </div>
            </>
          ) : (
            // No results for search
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No schools found for &quot;{searchTerm}&quot;
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or browse all schools.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Show All Schools
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OurSchools;
