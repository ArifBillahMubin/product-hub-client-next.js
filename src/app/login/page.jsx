"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { AuthContext } from "@/context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function LoginPage() {
    const { signInUser, signInGoogle } = useContext(AuthContext);
    const router = useRouter();

    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(() => {
                Swal.fire({
                    title: "Login Successful!",
                    text: "Welcome back 🎉",
                    icon: "success",
                    confirmButtonColor: "#000",
                });
                const redirectPath = new URLSearchParams(window.location.search).get("redirect") || "/";
                router.push(redirectPath);
            })
            .catch((err) => {
                setError(err.message);
                Swal.fire({
                    title: "Login Failed",
                    text: err.message,
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            });
    };

    const handleGoogle = () => {
        signInGoogle()
            .then(() => {
                Swal.fire({
                    title: "Logged in with Google!",
                    text: "Welcome to ProductHub 🚀",
                    icon: "success",
                    confirmButtonColor: "#000",
                });
                const redirectPath = new URLSearchParams(window.location.search).get("redirect") || "/";
                router.push(redirectPath);
            })
            .catch((err) => {
                Swal.fire({
                    title: "Google Login Failed",
                    text: err.message,
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            });
    };

    return (
        <div className="max-w-md mx-auto pt-28 px-6">
            <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-200">

                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

                {error && <p className="text-red-600 text-center mb-4 text-sm">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-5">

                    {/* Email */}
                    <div className="group">
                        <label className="block mb-1 font-medium">Email</label>
                        <input type="email" name="email" placeholder="example@mail.com" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition group-hover:border-black focus:border-black focus:ring-2 focus:ring-black/30" />
                    </div>

                    {/* Password */}
                    <div className="group">
                        <label className="block mb-1 font-medium">Password</label>
                        <input type="password" name="password" placeholder="••••••••" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition group-hover:border-black focus:border-black focus:ring-2 focus:ring-black/30" />
                    </div>

                    {/* Login Button */}
                    <button type="submit" className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition active:scale-95">
                        Login
                    </button>
                </form>

                {/* Google Button */}
                <button onClick={handleGoogle} className="w-full mt-6 py-3 rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center gap-3 hover:bg-gray-200 transition">
                    <FcGoogle size={22} /> Continue with Google
                </button>

                {/* Register Link */}
                <p className="text-center mt-4 text-sm">
                    Don’t have an account?{" "}
                    <Link href="/register" className="text-blue-600 underline">Register</Link>
                </p>
            </div>
        </div>
    );
}
