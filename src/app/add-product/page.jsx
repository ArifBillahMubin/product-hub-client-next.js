"use client";

import { useState, useContext } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Swal from "sweetalert2";
import { AuthContext } from "@/context/AuthContext";
import { FiImage } from "react-icons/fi";
import useAxios from "@/hooks/useAxios";

export default function AddProductPage() {
    return (
        <ProtectedRoute>
            <AddProductForm />
        </ProtectedRoute>
    );
}

function AddProductForm() {
    const axiosPublic = useAxios();
    const { user } = useContext(AuthContext);


    const [preview, setPreview] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);

    const handlePhotoSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPhotoFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const title = form.title.value.trim();
        const shortDesc = form.shortDesc.value.trim();
        const fullDesc = form.fullDesc.value.trim();
        const price = form.price.value;
        const date = form.date.value;
        const priority = form.priority.value;

        const newProduct = {
            title,
            shortDesc,
            fullDesc,
            price,
            date,
            priority,
            image: preview || "",
            userEmail: user?.email,
            userName: user?.displayName,
            createdAt: new Date(),
        };

        try {
            const res = await axiosPublic.post("/products", newProduct);

            if (res.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Product added successfully.",
                    icon: "success",
                    confirmButtonColor: "#000",
                }).then(() => {
                    router.push("/products");  
                });;

                form.reset();
                setPreview(null);
                setPhotoFile(null);
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error!",
                text: "Failed to add product.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto pt-28 px-6">
            <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-200">

                {/* USER INFO */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden border shadow">
                        <img
                            src={user?.photoURL || "https://i.ibb.co/8mLqQ0T/profile.png"}
                            className="w-full h-full object-cover"
                            alt="User"
                        />
                    </div>

                    <div>
                        <p className="font-semibold text-gray-900">{user?.displayName || "User"}</p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-6">Add Product</h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block mb-1 font-medium">Title</label>
                        <input
                            name="title"
                            required
                            placeholder="Product title"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/30 focus:border-black"
                        />
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block mb-1 font-medium">Short Description</label>
                        <input
                            name="shortDesc"
                            placeholder="Short description"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/30 focus:border-black"
                        />
                    </div>

                    {/* Full Description */}
                    <div>
                        <label className="block mb-1 font-medium">Full Description</label>
                        <textarea
                            name="fullDesc"
                            rows="5"
                            placeholder="Full description"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/30 focus:border-black"
                        />
                    </div>

                    {/* 3 Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div>
                            <label className="block mb-1 font-medium">Price</label>
                            <input
                                name="price"
                                type="number"
                                placeholder="0.00"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/30 focus:border-black"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Date</label>
                            <input
                                name="date"
                                type="date"
                                defaultValue={new Date().toISOString().slice(0, 10)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/30 focus:border-black"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Priority</label>
                            <select
                                name="priority"
                                defaultValue="normal"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/30 focus:border-black"
                            >
                                <option value="low">Low</option>
                                <option value="normal">Normal</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    {/* PRODUCT IMAGE UPLOAD (Modern UX) */}
                    <div className="flex flex-col items-center">

                        {!preview && (
                            <label
                                htmlFor="productImage"
                                className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-black transition bg-gray-50"
                            >
                                <FiImage className="text-3xl text-gray-600" />
                                <p className="text-xs text-gray-500 mt-2">Upload Image</p>
                            </label>
                        )}

                        {/* After Select → Show Preview */}
                        {preview && (
                            <div className="w-32 h-32 rounded-xl overflow-hidden shadow border">
                                <img src={preview} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <input
                            id="productImage"
                            required
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoSelect}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition active:scale-95"
                    >
                        Submit Product
                    </button>

                </form>
            </div>
        </div>
    );
}
