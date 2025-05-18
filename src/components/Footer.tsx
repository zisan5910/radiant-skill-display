
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-woodrose-50 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">KathGolap</h3>
            <p className="text-sm text-gray-600 mb-4">
              Your premium online shopping destination for fashion, electronics, and more.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary hover:text-primary-600">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="text-primary hover:text-primary-600">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="text-primary hover:text-primary-600">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/fashion" className="hover:text-primary">Fashion</Link>
              </li>
              <li>
                <Link to="/category/electronics" className="hover:text-primary">Electronics</Link>
              </li>
              <li>
                <Link to="/category/others" className="hover:text-primary">Others</Link>
              </li>
              <li>
                <Link to="/deals" className="hover:text-primary">Deals & Discounts</Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-primary">New Arrivals</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="hover:text-primary">Contact Us</Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-primary">Shipping Information</Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-primary">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary">FAQ</Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-primary">Track Your Order</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-primary">Our Story</Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-primary">Careers</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} KathGolap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
