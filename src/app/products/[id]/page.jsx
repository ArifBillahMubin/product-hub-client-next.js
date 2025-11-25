"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProductDetailsWrapper() {
    return (
        <ProtectedRoute>
            <ProductDetailsPage />
        </ProtectedRoute>
    );
}

function ProductDetailsPage() {
    const { id } = useParams();
    const axiosPublic = useAxios();
    const [product, setProduct] = useState(null);

    // Fetch product
    useEffect(() => {
        if (id) {
            axiosPublic.get(`/products/${id}`).then((res) => {
                setProduct(res.data);
            });
        }
    }, [id, axiosPublic]);

    if (!product) {
        return (
            <div className="h-[60vh] flex justify-center items-center text-lg font-medium">
                Loading product...
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-32 max-w-4xl">

            {/* Back Button */}
            <Link
                href="/products"
                className="inline-block mb-6 text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
            >
                ← Back to Products
            </Link>

            {/* IMAGE */}
            <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg mb-8">
                <img
                    src={product.image || "https://i.ibb.co/8mLqQ0T/profile.png"}
                    className="w-full h-full object-cover"
                    alt={product.title}
                />
            </div>

            {/* TITLE */}
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {product.title}
            </h1>

            {/* META */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700 mb-6">
                <p><span className="font-semibold">Price:</span> ${product.price}</p>
                <p><span className="font-semibold">Priority:</span> {product.priority}</p>
                <p><span className="font-semibold">Date:</span> {product.date}</p>
                <p><span className="font-semibold">Added by:</span> {product.userName}</p>
            </div>

            {/* FULL DESCRIPTION */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm leading-relaxed text-gray-800">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">
                    {product.fullDesc}
                </p>
            </div>
        </div>
    );
}
