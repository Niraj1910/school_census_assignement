"use client";

import React from "react";
import { Controller } from "react-hook-form";

import { GraduationCap, Upload } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import useSchoolFormHook from "@/app/hooks/useSchoolFormHook";

const AddSchoolForm: React.FC = () => {
  const {
    handleSubmit,
    isSubmitting,
    control,
    errors,
    isDirty,
    isValid,
    onSubmit,
    register,
    schoolImageFiles,
    selectedFileName,
    setSelectedFileName,
  } = useSchoolFormHook();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Add New School
              </h1>
              <p className="text-gray-600">
                Fill in the details below to add a school to the database
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* School Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="schoolName"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    School Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="schoolName"
                    {...register("schoolName")}
                    placeholder="Enter school name"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500 ${
                      errors.schoolName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.schoolName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.schoolName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="emailAddress"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    {...register("emailAddress")}
                    placeholder="school@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500 ${
                      errors.emailAddress ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.emailAddress && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.emailAddress.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  {...register("address")}
                  placeholder="Enter school address"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500 ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* City and State Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    {...register("city")}
                    placeholder="Enter city"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500 ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    {...register("state")}
                    placeholder="Enter state"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500 ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  maxLength={10}
                  {...register("contactNumber")}
                  placeholder="1234567890"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500 ${
                    errors.contactNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.contactNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>

              {/* School Image */}
              <div>
                <label
                  htmlFor="schoolImage"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  School Image
                </label>
                <div className="relative">
                  <Controller
                    name="schoolImage"
                    control={control}
                    render={({ field: { onChange, name } }) => (
                      <>
                        <input
                          type="file"
                          id="schoolImage"
                          name={name}
                          onChange={(e) => {
                            onChange(e.target.files);
                            setSelectedFileName(
                              e.target.files?.[0]?.name || ""
                            );
                          }}
                          accept="image/*"
                          className="sr-only"
                        />
                        <label
                          htmlFor="schoolImage"
                          className={`w-full flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all ${
                            errors.schoolImage
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent`}
                        >
                          <Upload className="w-5 h-5 text-gray-400 mr-2" />
                          <span className="text-gray-600">
                            {selectedFileName ||
                              schoolImageFiles?.[0]?.name ||
                              "Choose File"}
                          </span>
                          {!selectedFileName &&
                            !schoolImageFiles?.[0]?.name && (
                              <span className="text-gray-500 ml-2">
                                No file chosen
                              </span>
                            )}
                        </label>
                      </>
                    )}
                  />
                  {typeof errors.schoolImage?.message === "string" && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.schoolImage.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Adding School...
                    </span>
                  ) : (
                    "Add School"
                  )}
                </button>

                {/* Form Status */}
                {isDirty && (
                  <p className="mt-2 text-sm text-gray-600 text-center">
                    {isValid
                      ? "✓ Form is ready to submit"
                      : "Please fix the errors above"}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSchoolForm;
