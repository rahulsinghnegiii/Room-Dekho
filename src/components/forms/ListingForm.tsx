"use client";

import React, { useState, useRef } from "react";
import type { ListingFormData } from "@/lib/types";
import Image from "next/image";
import imageCompression from "browser-image-compression";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB after compression
const COMPRESSION_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

const initialState: ListingFormData = {
  title: "",
  price: "",
  location: "",
  description: "",
  city: "",
  facilities: [],
  images: [],
  capacity: "",
  bedrooms: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
};

const facilitiesOptions = ["WiFi", "AC", "Parking", "Laundry", "Furnished"];

const ListingForm: React.FC = () => {
  const [form, setForm] = useState<ListingFormData>(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFacilitiesChange = (facility: string) => {
    setForm((prev) => {
      const facilities = prev.facilities || [];
      return facilities.includes(facility)
        ? { ...prev, facilities: facilities.filter((f) => f !== facility) }
        : { ...prev, facilities: [...facilities, facility] };
    });
  };

  const validateFile = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      if (file.size > MAX_FILE_SIZE) {
        setError(`File ${file.name} is too large. Maximum size is 10MB.`);
        resolve(false);
        return;
      }

      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setError(`File ${file.name} is not a valid image type. Please use JPG, PNG, or GIF.`);
        resolve(false);
        return;
      }

      resolve(true);
    });
  };

  const compressImage = async (file: File): Promise<File> => {
    try {
      const compressedFile = await imageCompression(file, COMPRESSION_OPTIONS);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      throw new Error("Failed to compress image");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setError(null);
    const newPreviews: string[] = [];
    const newImages: string[] = [];

    for (const file of Array.from(files)) {
      try {
        const isValid = await validateFile(file);
        if (!isValid) continue;

        const compressedFile = await compressImage(file);
        const previewUrl = URL.createObjectURL(compressedFile);
        newPreviews.push(previewUrl);

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          newImages.push(base64String);
          setForm((prev) => ({
            ...prev,
            images: [...(prev.images || []), base64String],
          }));
        };
        reader.readAsDataURL(compressedFile);
      } catch (error: unknown) {
        setError(`Error processing ${file.name}: ${(error as Error).message}`);
      }
    }

    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setForm((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const formData = new FormData();
      
      // Add all form fields
      Object.entries(form).forEach(([key, value]) => {
        if (key === "facilities") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "images") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });

      const response = await fetch("/api/submit-listing", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setSuccess("Listing submitted successfully!");
        setForm(initialState);
        setImagePreviews([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setError(result.error || "Failed to submit listing.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative" role="alert">
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-accent focus:ring-accent px-4 py-2"
          required
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-accent focus:ring-accent px-4 py-2"
          required
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={form.location}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-accent focus:ring-accent px-4 py-2"
          required
        />
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={form.city}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-accent focus:ring-accent px-4 py-2"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-accent focus:ring-accent px-4 py-2"
          rows={4}
        />
      </div>
      <div>
        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">Number of Guests (Capacity)</label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          value={form.capacity}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-accent focus:ring-accent px-4 py-2"
          required
        />
      </div>
      <div>
        <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">Number of Bedrooms</label>
        <input
          type="number"
          id="bedrooms"
          name="bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-accent focus:ring-accent px-4 py-2"
          required
        />
      </div>
      <div>
        <span className="block text-sm font-medium text-gray-700 mb-1">Facilities</span>
        <div className="flex flex-wrap gap-3 mt-1">
          {facilitiesOptions.map((facility) => (
            <label
              key={facility}
              className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
            >
              <input
                type="checkbox"
                checked={form.facilities?.includes(facility) || false}
                onChange={() => handleFacilitiesChange(facility)}
                className="form-checkbox h-4 w-4 text-accent rounded focus:ring-accent"
              />
              <span className="ml-2 text-sm font-medium">{facility}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">Images</label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-red-700 transition-colors file:cursor-pointer"
        />
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {imagePreviews.map((src, index) => (
            <div key={index} className="relative w-full h-32 rounded-lg overflow-hidden shadow-sm">
              <Image src={src} alt={`Preview ${index}`} fill style={{ objectFit: "cover" }} />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-700 transition-colors"
                aria-label="Remove image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
        <input
          type="text"
          id="contactName"
          name="contactName"
          value={form.contactName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-accent focus:ring-accent px-4 py-2"
          required
        />
      </div>
      <div>
        <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
        <input
          type="tel"
          id="contactPhone"
          name="contactPhone"
          value={form.contactPhone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-accent focus:ring-accent px-4 py-2"
          required
        />
      </div>
      <div>
        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
        <input
          type="email"
          id="contactEmail"
          name="contactEmail"
          value={form.contactEmail}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-accent focus:ring-accent px-4 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Listing"}
      </button>
    </form>
  );
};

export default ListingForm; 