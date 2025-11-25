import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="mt-20 bg-white border-t border-gray-200">
            <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">ProductHub</h2>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                        A simple and efficient product management app built using Next.js and Tailwind CSS.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
                    <ul className="mt-3 space-y-2 text-gray-600">
                        <li>
                            <Link href="/" className="hover:text-gray-900 transition">Home</Link>
                        </li>
                        <li>
                            <Link href="/products" className="hover:text-gray-900 transition">Products</Link>
                        </li>
                        <li>
                            <Link href="/add-product" className="hover:text-gray-900 transition">Add Product</Link>
                        </li>
                        <li>
                            <Link href="/manage-products" className="hover:text-gray-900 transition">Manage Products</Link>
                        </li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>

                    <div className="flex gap-4 mt-4">
                        <Link
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-900 transition"
                        >
                            <FaFacebookF size={18} />
                        </Link>

                        <Link
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-900 transition"
                        >
                            <FaLinkedinIn size={18} />
                        </Link>

                        <Link
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-900 transition"
                        >
                            <FaGithub size={18} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-200 py-4 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} ProductHub — All Rights Reserved.
            </div>
        </footer>
    );
}
