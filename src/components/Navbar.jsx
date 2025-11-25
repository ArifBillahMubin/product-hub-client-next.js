"use client";

import { useState, useContext, useEffect, useRef } from "react";
import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import { MdReviews, MdLibraryAdd } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { AuthContext } from "@/context/AuthContext";
import Swal from "sweetalert2";

export default function Navbar() {
    const { user, signOutUser } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef();

    // Close dropdown on outside click
    useEffect(() => {
        const handleOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);

    // Logout
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "#d33",
            confirmButtonText: "Logout",
        }).then((res) => {
            if (res.isConfirmed) {
                signOutUser().then(() => {
                    Swal.fire({
                        title: "Logged Out!",
                        icon: "success",
                        confirmButtonColor: "#000",
                    });
                    setMenuOpen(false);
                });
            }
        });
    };

    return (
        <nav className="w-full bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">

                {/* LOGO */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">ProductHub</span>
                </Link>

                {/* DESKTOP MENU */}
                <ul className="hidden lg:flex gap-8 text-gray-700 font-medium">
                    <li>
                        <Link href="/" className="flex items-center gap-1 hover:text-black">
                            <GoHomeFill /> Home
                        </Link>
                    </li>

                    <li>
                        <Link href="/products" className="flex items-center gap-1 hover:text-black">
                            <MdReviews /> Products
                        </Link>
                    </li>

                    {user && (
                        <>
                            <li>
                                <Link href="/manage-products" className="flex items-center gap-1 hover:text-black">
                                    <MdReviews /> Manage Products
                                </Link>
                            </li>

                            <li>
                                <Link href="/add-product" className="flex items-center gap-1 hover:text-black">
                                    <IoMdAddCircle /> Add Product
                                </Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* DESKTOP: LOGIN / DROPDOWN */}
                <div className="hidden lg:flex items-center">
                    {!user ? (
                        <Link href="/login" className="px-5 py-2 rounded-full bg-black text-white font-medium hover:bg-gray-900 transition">
                            <span className="flex items-center gap-2">
                                <IoLogIn /> Login
                            </span>
                        </Link>
                    ) : (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-800 hover:border-black transition"
                            >
                                <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-white text-gray-800 shadow-xl rounded-lg p-3 text-sm border animate-fadeScale">
                                    <div className="mb-2 border-b pb-2">
                                        <p className="font-semibold">{user.displayName}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>

                                    <Link href="/add-product" className="block px-2 py-2 hover:bg-gray-100 rounded">
                                        <MdLibraryAdd className="inline mr-1" /> Add Product
                                    </Link>

                                    <Link href="/manage-products" className="block px-2 py-2 hover:bg-gray-100 rounded">
                                        <MdReviews className="inline mr-1" /> Manage Products
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="mt-2 w-full flex items-center gap-1 px-2 py-2 text-red-600 hover:bg-red-50 rounded"
                                    >
                                        <IoLogOut /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* MOBILE MENU BUTTON */}
                <button className="lg:hidden text-3xl text-gray-800" onClick={() => setOpen(!open)}>
                    ☰
                </button>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="lg:hidden bg-white text-gray-700 shadow-md">
                    <ul className="flex flex-col gap-2 p-4">
                        <Link href="/" className="flex items-center gap-2 py-2 border-b">
                            <GoHomeFill /> Home
                        </Link>

                        <Link href="/products" className="flex items-center gap-2 py-2 border-b">
                            <MdReviews /> Products
                        </Link>

                        {user && (
                            <>

                                <Link href="/manage-products" className="flex items-center gap-2 py-2 border-b">
                                    <MdReviews /> Manage Products
                                </Link>

                                <Link href="/add-product" className="flex items-center gap-2 py-2 border-b">
                                    <IoMdAddCircle /> Add Product
                                </Link>
                            </>
                        )}

                        {!user ? (
                            <Link href="/login" className="mt-2 w-full py-2 bg-black text-white text-center rounded-full">
                                <IoLogIn /> Login
                            </Link>
                        ) : (
                            <button onClick={handleLogout} className="text-red-600 flex items-center gap-2 py-2">
                                <IoLogOut /> Logout
                            </button>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}
