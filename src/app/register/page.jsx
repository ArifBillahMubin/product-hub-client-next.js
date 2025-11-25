"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { AuthContext } from "@/context/AuthContext";
import { updateProfile } from "firebase/auth";
import { FiCamera } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const { registerUser, signInGoogle } = useContext(AuthContext);

    const [error, setError] = useState("");
    const [preview, setPreview] = useState("");
    const [photoFile, setPhotoFile] = useState(null);

    const handlePhotoSelect = (e) => {
        const file = e.target.files[0];
        setPhotoFile(file);
        setPreview(URL.createObjectURL(file));
    };

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

    const handleRegister = (e) => {
        e.preventDefault();
        setError("");

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        registerUser(email, password)
            .then(async (result) => {
                const user = result.user;

                let photoURL = preview;
                if (photoFile) {
                    photoURL = await uploadToImgBB(photoFile);
                }

                updateProfile(user, { displayName: name, photoURL })
                    .then(() => {
                        Swal.fire({
                            title: "Account Created!",
                            text: "Welcome to ProductHub 🚀",
                            icon: "success",
                            confirmButtonColor: "#000",
                        });

                        router.push("/");
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                setError(err.message);
                Swal.fire({
                    title: "Registration Error",
                    text: err.message,
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            });
    };

    return (
        <div className="max-w-md mx-auto pt-28 px-6">
            <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-200">

                <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

                {error && <p className="text-red-600 text-center mb-4 text-sm">{error}</p>}

                <div className="flex flex-col items-center mb-6 relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border shadow">
                        <img src={preview || "https://i.ibb.co/8mLqQ0T/profile.png"} className="w-full h-full object-cover" />
                    </div>

                    {!preview && (
                        <label htmlFor="photo" className="mt-3 px-4 py-2 flex items-center gap-2 bg-black text-white rounded-full cursor-pointer hover:bg-gray-900 transition text-sm">
                            <FiCamera size={18} /> Upload Photo
                        </label>
                    )}

                    <input id="photo" type="file" accept="image/*" className="hidden" onChange={handlePhotoSelect} />
                </div>

                <form onSubmit={handleRegister} className="space-y-5">

                    <div className="group">
                        <label className="block mb-1 font-medium">Name</label>
                        <input type="text" name="name" required placeholder="Your Full Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition group-hover:border-black focus:border-black focus:ring-2 focus:ring-black/30" />
                    </div>

                    <div className="group">
                        <label className="block mb-1 font-medium">Email</label>
                        <input type="email" name="email" required placeholder="example@mail.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition group-hover:border-black focus:border-black focus:ring-2 focus:ring-black/30" />
                    </div>

                    <div className="group">
                        <label className="block mb-1 font-medium">Password</label>
                        <input type="password" name="password" required placeholder="••••••••" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition group-hover:border-black focus:border-black focus:ring-2 focus:ring-black/30" />
                    </div>

                    <button type="submit" className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition active:scale-95">
                        Register
                    </button>
                </form>

                <button onClick={signInGoogle} className="w-full mt-6 py-3 rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center gap-3 hover:bg-gray-200 transition">
                    <FcGoogle size={22} /> Continue with Google
                </button>

                <p className="text-center mt-4 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 underline">Login</Link>
                </p>
            </div>
        </div>
    );
}
