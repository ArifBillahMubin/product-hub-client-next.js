import { FaTools, FaShieldAlt, FaBolt } from "react-icons/fa";

export default function Features() {
    return (
        <section className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Features</h2>
            <p className="text-center text-gray-600 mt-2">
                Powerful tools to manage your product catalog.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-10">

                {/* CARD 1 */}
                <div className="p-6 rounded-xl shadow bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <div className="flex justify-center mb-4">
                        <FaTools className="text-4xl text-gray-900 group-hover:scale-110 transition" />
                    </div>
                    <h3 className="text-xl font-semibold text-center">Easy Management</h3>
                    <p className="text-gray-600 mt-2 text-center">
                        Add, edit, and delete products effortlessly with a clean UI.
                    </p>
                </div>

                {/* CARD 2 */}
                <div className="p-6 rounded-xl shadow bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <div className="flex justify-center mb-4">
                        <FaShieldAlt className="text-4xl text-gray-900 group-hover:scale-110 transition" />
                    </div>
                    <h3 className="text-xl font-semibold text-center">Secure Login</h3>
                    <p className="text-gray-600 mt-2 text-center">
                        Protected authentication using NextAuth & Google Login.
                    </p>
                </div>

                {/* CARD 3 */}
                <div className="p-6 rounded-xl shadow bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <div className="flex justify-center mb-4">
                        <FaBolt className="text-4xl text-gray-900 group-hover:scale-110 transition" />
                    </div>
                    <h3 className="text-xl font-semibold text-center">Fast & Modern UI</h3>
                    <p className="text-gray-600 mt-2 text-center">
                        Powered by Next.js App Router with lightning-fast performance.
                    </p>
                </div>

            </div>
        </section>
    );
}
