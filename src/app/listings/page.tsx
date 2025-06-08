"use client";

import { useState, useEffect } from "react";
import { getListings } from "@/lib/firebase";
import RoomCard from "@/components/listings/RoomCard";
import { ListingFormData } from "@/lib/types";

const ITEMS_PER_PAGE = 9;

export default function ListingsPage() {
  const [listings, setListings] = useState<(ListingFormData & { id: string })[]>([]);
  const [filteredListings, setFilteredListings] = useState<(ListingFormData & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        setListings(data);
        setFilteredListings(data);
      } catch (err) {
        setError("Failed to load listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);
  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-100 rounded-2xl shadow-custom-light overflow-hidden">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
                  <div className="h-8 w-1/3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section for Listings Page */}
      <section className="bg-white text-dark py-20 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Our Listings
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-12">
            Browse through a wide variety of rooms available for rent.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-100 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedListings.map((listing: ListingFormData & { id: string }) => (
              <RoomCard
                key={listing.id}
                title={listing.title}
                price={Number(listing.price) || 0}
                location={listing.location}
                imageUrl={listing.images?.[0]}
                guests={Number(listing.capacity ?? '0')}
                bedrooms={Number(listing.bedrooms ?? '0')}
              />
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No listings found matching your criteria.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 