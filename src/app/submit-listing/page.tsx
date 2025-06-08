import React from "react";
import ListingForm from "@/components/forms/ListingForm";

export default function SubmitListingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section for Submit Listing Page */}
      <section className="bg-white text-dark py-20 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            List Your Room
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-12">
            Showcase your available room to thousands of potential tenants.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-100">
        <div className="container mx-auto max-w-2xl bg-white p-8 rounded-2xl shadow-custom-medium">
          <ListingForm />
        </div>
      </section>
    </div>
  );
} 