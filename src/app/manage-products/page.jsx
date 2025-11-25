"use client";

import { useEffect, useState, useContext } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import useAxios from "@/hooks/useAxios";
import Swal from "sweetalert2";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

export default function ManageProductsPage() {
    return (
        <ProtectedRoute>
            <ManageProducts />
        </ProtectedRoute>
    );
}

function ManageProducts() {
    const axiosPublic = useAxios();
    const { user } = useContext(AuthContext);

    const [products, setProducts] = useState([]);

    // Load user-specific products
    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/all-products?email=${user.email}`).then((res) => {
                setProducts(res.data);
            });
        }
    }, [user, axiosPublic]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This product will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/products/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "Product has been removed.", "success");
                        setProducts(products.filter((item) => item._id !== id));
                    }
                });
            }
        });
    };

    return (
        <div className="container mx-auto px-6 py-32">
            <h2 className="text-3xl font-bold mb-6">Manage Products</h2>

            {products.length === 0 ? (
                <p className="text-gray-600">No products added yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border rounded-xl overflow-hidden">
                        <thead className="bg-gray-100 text-left text-sm text-gray-700 uppercase">
                            <tr>
                                <th className="p-3">Image</th>
                                <th className="p-3">Title</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Priority</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} className="border-b">
                                    <td className="p-3">
                                        <img
                                            src={product.image}
                                            className="w-16 h-16 rounded object-cover"
                                        />
                                    </td>

                                    <td className="p-3 font-semibold">{product.title}</td>

                                    <td className="p-3">${product.price}</td>

                                    <td className="p-3 capitalize">{product.priority}</td>

                                    <td className="p-3">
                                        <div className="flex justify-center items-center gap-4">
                                            {/* View */}
                                            <Link
                                                href={`/products/${product._id}`}
                                                className="text-blue-600 hover:text-blue-800 text-xl"
                                            >
                                                <FiEye />
                                            </Link>

                                            {/* Edit */}
                                            <Link
                                                href={`/edit-product/${product._id}`}
                                                className="text-green-600 hover:text-green-800 text-xl"
                                            >
                                                <FiEdit />
                                            </Link>

                                            {/* Delete */}
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="text-red-600 hover:text-red-800 text-xl"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
