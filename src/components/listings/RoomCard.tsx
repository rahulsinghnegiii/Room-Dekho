import React from "react";
// import Link from "next/link"; // No longer needed for WhatsApp redirect

type RoomCardProps = {
  title: string;
  price: number;
  location: string;
  imageUrl?: string;
  guests: number;
  bedrooms: number;
};

const RoomCard: React.FC<RoomCardProps> = ({
  title,
  price,
  location,
  imageUrl,
  guests,
  bedrooms,
}) => {
  const handleBookNowClick = () => {
    const phoneNumber = "917849093112"; // Your WhatsApp number
    const message = `Hello! I am interested in booking \"${title}\" located at ${location} for ₹${price.toLocaleString()}/night. Could you please provide more details?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-gray-100 rounded-2xl shadow-custom-light overflow-hidden group">
      <div className="h-64 bg-gray-300 w-full flex items-center justify-center rounded-t-2xl">
        {/* Placeholder for image */}
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="object-cover w-full h-full rounded-t-2xl" />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>
      <div className="p-6 text-left">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{location}</p>
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <span className="mr-4">A {guests} Guests</span>
          <span>{bedrooms} Bedroom</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-dark">
            ₹{price.toLocaleString()}
            <span className="text-gray-500 text-base font-normal">/night</span>
          </span>
          <button
            onClick={handleBookNowClick}
            className="bg-accent text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
          >
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard; 