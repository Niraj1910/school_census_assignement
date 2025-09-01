import React from "react";
import { Plus, List, GraduationCap } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b border-b-gray-200 drop-shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link href={"/"}>
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                School Census
              </h1>
            </div>
          </Link>
          <div className="flex space-x-4">
            <Link href={"/add/school"}>
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                <Plus className="w-4 h-4 mr-2" />
                Add School
              </button>
            </Link>

            <Link href={"/schools"}>
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                <List className="w-4 h-4 mr-2" />
                View Schools
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
