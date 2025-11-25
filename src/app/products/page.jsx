"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useAxios from "@/hooks/useAxios";

export default function ProductsPage() {
    const axiosPublic = useAxios();
    const [products, setProducts] = useState([]);

    // Load all products
    useEffect(() => {
        axiosPublic.get("/all-products").then((res) => {
            setProducts(res.data);
        });
    }, [axiosPublic]);

    return (
        <div className="container mx-auto px-6 pt-12 pb-20">

            <h1 className="text-3xl font-bold text-gray-900 text-center">
                All Products
            </h1>
            <p className="text-center text-gray-600 mt-2 mb-10">
                Explore the latest products added by our users.
            </p>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}

            </div>
        </div>
    );
}

function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">

            {/* IMAGE SECTION */}
            <div className="relative h-52 overflow-hidden">
                <img
                    src={product.image || "https://i.ibb.co/8mLqQ0T/profile.png"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all"></div>

                {/* Price Badge */}
                <span className="absolute bottom-3 left-3 px-3 py-1 text-sm font-semibold bg-white/90 backdrop-blur rounded-full shadow text-gray-900">
                    ${product.price || "0.00"}
                </span>
            </div>

            {/* CARD CONTENT */}
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black transition">
                    {product.title}
                </h3>

                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {product.shortDesc || "No description available."}
                </p>

                <div className="mt-5 flex justify-between items-center">
                    <Link
                        href={`/products/${product._id}`}
                        className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-900 transition active:scale-95"
                    >
                        View Details
                    </Link>

                    {/* Nice right arrow animation */}
                    <span className="text-gray-400 group-hover:text-black transition text-lg rotate-0 group-hover:rotate-45">
                        →
                    </span>
                </div>
            </div>
        </div>
    );
}

