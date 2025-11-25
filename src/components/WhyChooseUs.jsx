"use client";

import Marquee from "react-fast-marquee";
import { FaRocket, FaPalette, FaCode, FaMobileAlt } from "react-icons/fa";

export default function WhyChooseUs() {
    return (
        <section className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
                Why Choose ProductHub?
            </h2>
            <p className="text-center text-gray-600 mt-2">
                Simple, reliable, and built for modern users.
            </p>

            <div className="mt-12">
                <Marquee pauseOnHover={true} speed={40} gradient={false}>

                    {/* CARD 1 */}
                    <div className="min-w-[280px] mx-4 p-6 rounded-xl shadow bg-white 
          hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">

                        <div className="flex justify-center mb-3">
                            <FaRocket className="text-4xl text-gray-900 group-hover:scale-125 group-hover:text-black transition" />
                        </div>

                        <h3 className="text-xl font-semibold text-center">Fast Performance</h3>
                        <p className="text-gray-600 mt-2 text-center">
                            Optimized for speed using Next.js.
                        </p>
                    </div>

                    {/* CARD 2 */}
                    <div className="min-w-[280px] mx-4 p-6 rounded-xl shadow bg-white 
          hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">

                        <div className="flex justify-center mb-3">
                            <FaPalette className="text-4xl text-gray-900 group-hover:scale-125 transition" />
                        </div>

                        <h3 className="text-xl font-semibold text-center">Clean UI</h3>
                        <p className="text-gray-600 mt-2 text-center">
                            Minimal and modern design that users love.
                        </p>
                    </div>

                    {/* CARD 3 */}
                    <div className="min-w-[280px] mx-4 p-6 rounded-xl shadow bg-white 
          hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">

                        <div className="flex justify-center mb-3">
                            <FaCode className="text-4xl text-gray-900 group-hover:scale-125 transition" />
                        </div>

                        <h3 className="text-xl font-semibold text-center">Developer Friendly</h3>
                        <p className="text-gray-600 mt-2 text-center">
                            Simple structure that you can customize freely.
                        </p>
                    </div>

                    {/* CARD 4 */}
                    <div className="min-w-[280px] mx-4 p-6 rounded-xl shadow bg-white 
          hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">

                        <div className="flex justify-center mb-3">
                            <FaMobileAlt className="text-4xl text-gray-900 group-hover:scale-125 transition" />
                        </div>

                        <h3 className="text-xl font-semibold text-center">Fully Responsive</h3>
                        <p className="text-gray-600 mt-2 text-center">
                            Works beautifully on all devices.
                        </p>
                    </div>

                </Marquee>
            </div>
        </section>
    );
}
