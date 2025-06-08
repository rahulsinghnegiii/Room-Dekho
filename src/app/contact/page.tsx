import React from "react";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section for Contact Page */}
      <section className="bg-white text-dark py-20 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Contact Us
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-12">
            Have questions or need assistance? Reach out to us.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-100">
        <div className="container mx-auto max-w-2xl bg-white p-8 rounded-2xl shadow-custom-medium">
          <ContactForm />
        </div>
      </section>
    </div>
  );
} 