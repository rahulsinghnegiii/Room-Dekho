import Image from "next/image";
import Link from "next/link";
import RoomCard from "@/components/listings/RoomCard";

export default function Home() {
  const featuredListings = [
    {
      id: 1,
      title: "Duplex Rustic Cabin",
      price: 150,
      location: "Lorem ipsum dolor sit amet consectetur adipiscing elit phasellus amet.",
      imageUrl: "/images/room1.jpg", // Replace with actual image paths
      guests: 4,
      bedrooms: 2,
    },
    {
      id: 2,
      title: "Family Rustic Cabin",
      price: 399,
      location: "Lorem ipsum dolor sit amet consectetur adipiscing elit phasellus amet.",
      imageUrl: "/images/room2.jpg",
      guests: 8,
      bedrooms: 4,
    },
    {
      id: 3,
      title: "Family Duo Rustic Cabin",
      price: 499,
      location: "Lorem ipsum dolor sit amet consectetur adipiscing elit phasellus amet.",
      imageUrl: "/images/room3.jpg",
      guests: 8,
      bedrooms: 4,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white text-dark py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Rooms with WiFi
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-12">
            Non consectetur a erat nam at lectus urna duis convallis molestie
            nunc non blandit massa ut etiam sit amet nisl.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredListings.map((room) => (
              <RoomCard
                key={room.id}
                title={room.title}
                price={room.price}
                location={room.location}
                imageUrl={room.imageUrl}
                guests={room.guests}
                bedrooms={room.bedrooms}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Search</h3>
              <p className="text-gray-600">
                Browse through our extensive list of available rooms in your area.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Contact</h3>
              <p className="text-gray-600">
                Get in touch with room owners directly through our platform.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Move In</h3>
              <p className="text-gray-600">
                Find your perfect room and move in hassle-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings Preview */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Listings
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Using RoomCard component for featured listings */}
            {featuredListings.map((room) => (
              <RoomCard
                key={room.id}
                title={room.title}
                price={room.price}
                location={room.location}
                imageUrl={room.imageUrl}
                guests={room.guests}
                bedrooms={room.bedrooms}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/listings"
              className="inline-block bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 shadow-md"
            >
              View All Listings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
