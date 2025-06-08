import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Room Dekho</h3>
            <p className="text-gray-300">
              Connecting room owners with potential tenants. Find your perfect room
              or list your space with us.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/listings" className="text-gray-300 hover:text-white">
                  Listings
                </Link>
              </li>
              <li>
                <Link
                  href="/submit-listing"
                  className="text-gray-300 hover:text-white"
                >
                  Submit Listing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@roomdekho.com</li>
              <li>Phone: +91 1234567890</li>
              <li>Address: Your City, State</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Room Dekho. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 