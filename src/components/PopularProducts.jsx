"use client";

import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import Link from "next/link";

export default function PopularProducts() {
    const axiosPublic = useAxios();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axiosPublic.get("/popular-products").then((res) => {
            setProducts(res.data);
        });
    }, [axiosPublic]);

    return (
        <section className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Popular Products</h2>
            <p className="text-center text-gray-600 mt-2">
                A quick look at customer favorites.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-10">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="shadow bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        {/* IMAGE */}
                        <div className="h-40 w-full overflow-hidden">
                            <img
                                src={product.image}
                                className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
                                alt={product.title}
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="p-5">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {product.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                                {product.shortDesc}
                            </p>

                            <Link
                                href={`/products/${product._id}`}
                                className="mt-4 inline-block px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-900 transition w-full text-center"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
