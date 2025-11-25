import Link from "next/link";

export default function Hero() {
    return (
        <section className="pt-20 pb-32 bg-gray-50">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-5xl font-bold text-gray-900">
                    Manage Your Products <span className="text-gray-700">Efficiently</span>
                </h1>
                <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
                    ProductHub is a modern and simple platform to manage, track, and organize your products with ease.
                </p>

                <div className="mt-8">
                    <Link
                        href="/products"
                        className="bg-black text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-900 transition"
                    >
                        Explore Products
                    </Link>
                </div>
            </div>
        </section>
    );
}
