import React, { useState } from "react";
import { MapPin, Phone, Mail, Plane } from "lucide-react";
import { School } from "../interfaces";

const SchoolCard: React.FC<{ school: School }> = ({ school }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* School Image */}
      <div className="h-48 bg-gray-100 relative">
        {school.image && !imageError ? (
          <>
            <img
              src={school.image}
              alt={`${school.name} - School Image`}
              className="w-full h-full object-cover"
              onError={handleImageError}
              onLoad={handleImageLoad}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Loading state */}
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-xs">Loading image...</p>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Fallback when no image or image fails to load */
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-blue-700">
                  {school.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-700 px-4 text-center">
                {school.name}
              </p>
              {imageError && (
                <p className="text-xs text-gray-500 mt-1">Image unavailable</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* School Information */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {school.name}
        </h3>

        <div className="space-y-2 text-sm text-gray-600">
          {/* Address */}
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p>{school.address}</p>
              <p>
                {school.city}, {school.state}
              </p>
            </div>
          </div>

          {/* Contact */}
          {school.contact && (
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span>{school.contact}</span>
            </div>
          )}

          {/* City */}

          {school.city && (
            <div className="flex items-center space-x-2">
              <Plane className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span>{school.city}</span>
            </div>
          )}

          {/* Email */}
          {school.email && (
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-blue-600 hover:text-blue-800 cursor-pointer break-all">
                {school.email}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;
