import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white text-dark py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* About Section */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-accent flex items-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#FF5A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7L17 4.5L22 7" stroke="#FF5A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7L7 4.5L2 7" stroke="#FF5A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 7L12 12L22 7" stroke="#FF5A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12V22" stroke="#FF5A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Room Dekho
            </Link>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet consectetur adipiscing elit phasellus amet.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-accent"><i className="fab fa-facebook-f"></i></Link>
              <Link href="#" className="text-gray-600 hover:text-accent"><i className="fab fa-twitter"></i></Link>
              <Link href="#" className="text-gray-600 hover:text-accent"><i className="fab fa-instagram"></i></Link>
              <Link href="#" className="text-gray-600 hover:text-accent"><i className="fab fa-youtube"></i></Link>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-lg font-bold mb-4">Pages</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/" className="hover:text-accent">Home</Link></li>
              <li><Link href="#" className="hover:text-accent">About</Link></li>
              <li><Link href="#" className="hover:text-accent">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
              <li><Link href="/listings" className="hover:text-accent">Rooms</Link></li>
              <li><Link href="#" className="hover:text-accent">Room single</Link></li>
              <li><Link href="#" className="hover:text-accent">Blog Post</Link></li>
            </ul>
          </div>

          {/* Utility pages */}
          <div>
            <h3 className="text-lg font-bold mb-4">Utility pages</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="#" className="hover:text-accent">Start here</Link></li>
              <li><Link href="#" className="hover:text-accent">Style guide</Link></li>
              <li><Link href="#" className="hover:text-accent">404 Not found</Link></li>
              <li><Link href="#" className="hover:text-accent">Password protected</Link></li>
              <li><Link href="#" className="hover:text-accent">Licences</Link></li>
              <li><Link href="#" className="hover:text-accent">Changelog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@roomdekho.com</li>
              <li>Phone: +91 7849093112</li>
              <li>Address: Your City, State</li>
            </ul>
          </div>

          {/* Follow on Instagram */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-4">Follow on Instagram</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-200 h-20 w-20 rounded-lg"></div>
              <div className="bg-gray-200 h-20 w-20 rounded-lg"></div>
              <div className="bg-gray-200 h-20 w-20 rounded-lg"></div>
              <div className="bg-gray-200 h-20 w-20 rounded-lg"></div>
              <div className="bg-gray-200 h-20 w-20 rounded-lg"></div>
              <div className="bg-gray-200 h-20 w-20 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gray-100 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-accent-100 p-3 rounded-full mr-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
                <path d="M22 4H2C1.44772 4 1 4.44772 1 5V19C1 19.5523 1.44772 20 2 20H22C22.5523 20 23 19.5523 23 19V5C23 4.44772 22.5523 4 22 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6L12 13L21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Subscribe to our newsletter</h3>
              <p className="text-gray-600 text-sm">Join the 5,000+ people that uses BRIX Templates</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-lg border border-gray-300 flex-grow"
            />
            <button className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-16 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Rental X | Designed by BRIX Templates - Powered by Webflow</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 