"use client";

import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import useAxios from "@/hooks/useAxios";
import Swal from "sweetalert2";
import { AuthContext } from "@/context/AuthContext";
import { FiImage } from "react-icons/fi";

export default function EditProductPage() {
    return (
        <ProtectedRoute>
            <EditProductForm />
        </ProtectedRoute>
    );
}

function EditProductForm() {
    const { id } = useParams();
    const axiosPublic = useAxios();
    const router = useRouter();
    const { user } = useContext(AuthContext);

    const [product, setProduct] = useState(null);
    const [preview, setPreview] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);

    // Load product safely
    useEffect(() => {
        axiosPublic
            .get(`/products/${id}`)
            .then((res) => {
                if (res.data) {
                    setProduct(res.data);
                    setPreview(res.data.image || null); // safe
                }
            })
            .catch((err) => console.error(err));
    }, [id]);

    // Image Select Handler
    const handlePhotoSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPhotoFile(file);
        setPreview(URL.createObjectURL(file));
    };

    // ImgBB Upload
    const uploadToImgBB = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
            { method: "POST", body: formData }
        );

        const data = await res.json();
        return data?.data?.url;
    };

    // Update Product
    const handleUpdate = async (e) => {
        e.preventDefault();

        const form = e.target;

        const title = form.title.value.trim();
        const shortDesc = form.shortDesc.value.trim();
        const fullDesc = form.fullDesc.value.trim();
        const price = form.price.value;
        const date = form.date.value;
        const priority = form.priority.value;

        let imgURL = product?.image;

        // Upload new image if selected
        if (photoFile) {
            imgURL = await uploadToImgBB(photoFile);
        }

        const updatedProduct = {
            title,
            shortDesc,
            fullDesc,
            price,
            date,
            priority,
            image: imgURL,
            updatedAt: new Date(),
        };

        try {
            const res = await axiosPublic.put(`/products/${id}`, updatedProduct);

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Updated!",
                    text: "Product updated successfully.",
                    icon: "success",
                    confirmButtonColor: "#000",
                }).then(() => {
                    router.push("/manage-products");
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to update product.", "error");
        }
    };

    // Safety — Prevent "Cannot read property"
    if (!product) {
        return (
            <div className="h-[60vh] flex justify-center items-center text-lg font-medium">
                Loading product...
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto pt-28 px-6">
            <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-200">

                <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

                <form onSubmit={handleUpdate} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block mb-1 font-medium">Title</label>
                        <input
                            name="title"
                            defaultValue={product.title}
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black/30"
                        />
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block mb-1 font-medium">Short Description</label>
                        <input
                            name="shortDesc"
                            defaultValue={product.shortDesc}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black/30"
                        />
                    </div>

                    {/* Full Description */}
                    <div>
                        <label className="block mb-1 font-medium">Full Description</label>
                        <textarea
                            name="fullDesc"
                            rows="5"
                            defaultValue={product.fullDesc}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black/30"
                        />
                    </div>

                    {/* 3 Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div>
                            <label className="block mb-1 font-medium">Price</label>
                            <input
                                name="price"
                                defaultValue={product.price}
                                type="number"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black/30"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Date</label>
                            <input
                                name="date"
                                type="date"
                                defaultValue={product.date}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black/30"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Priority</label>
                            <select
                                name="priority"
                                defaultValue={product.priority}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black/30"
                            >
                                <option value="low">Low</option>
                                <option value="normal">Normal</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                    </div>

                    {/* IMAGE PREVIEW + CHANGE */}
                    <div className="flex flex-col items-center">

                        {preview && (
                            <div className="w-32 h-32 rounded-xl overflow-hidden shadow border">
                                <img src={preview} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <label
                            htmlFor="productImage"
                            className="mt-3 cursor-pointer px-4 py-2 border rounded-lg bg-gray-50 hover:bg-gray-100"
                        >
                            <FiImage className="inline-block mr-2" /> Change Image
                        </label>

                        <input
                            id="productImage"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoSelect}
                        />
                    </div>

                    {/* UPDATE BUTTON */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 active:scale-95"
                    >
                        Update Product
                    </button>

                </form>
            </div>
        </div>
    );
}
