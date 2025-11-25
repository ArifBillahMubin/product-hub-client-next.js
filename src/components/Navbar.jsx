"use client";

import { useState, useContext, useEffect, useRef } from "react";
import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import { MdReviews, MdFavorite, MdLibraryAdd } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { AuthContext } from "@/context/AuthContext";
import Swal from "sweetalert2";

export default function Navbar() {
    const { user, signOutUser } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef();

    console.log(user);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out from ProductHub.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "#d33",
            confirmButtonText: "Logout",
        }).then((result) => {
            if (result.isConfirmed) {
                signOutUser()
                    .then(() => {
                        Swal.fire({
                            title: "Logged Out!",
                            text: "You have been successfully logged out.",
                            icon: "success",
                            confirmButtonColor: "#000",
                        });
                        setMenuOpen(false);
                    })
                    .catch((err) => console.log(err));
            }
        });
    };

    return (
        <nav className="w-full bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-wide text-gray-900">ProductHub</Link>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex gap-8 text-gray-700 font-medium">
                    <li><Link href="/" className="flex items-center gap-1 hover:text-black"><GoHomeFill /> Home</Link></li>
                    <li><Link href="/products" className="flex items-center gap-1 hover:text-black"><MdReviews /> Products</Link></li>

                    {user && (
                        <>
                            <li><Link href="/my-products" className="flex items-center gap-1 hover:text-black"><MdReviews /> My Products</Link></li>
                            <li><Link href="/add-product" className="flex items-center gap-1 hover:text-black"><IoMdAddCircle /> Add Product</Link></li>
                            <li><Link href="/favorites" className="flex items-center gap-1 hover:text-black"><MdFavorite /> Favorites</Link></li>
                        </>
                    )}
                </ul>

                {/* Desktop: Login or Dropdown */}
                <div className="hidden lg:flex items-center">
                    {!user ? (
                        <Link href="/login" className="px-5 py-2 rounded-full bg-black text-white font-medium shadow hover:bg-gray-900 transition">
                            <span className="flex items-center gap-2"><IoLogIn /> Login</span>
                        </Link>
                    ) : (
                        <div className="relative" ref={dropdownRef}>
                            {/* User Photo */}
                            <button onClick={() => setMenuOpen(!menuOpen)} className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-800 hover:border-black transition">
                                <img src={user?.photoURL} alt="" className="w-full h-full object-cover" />
                            </button>

                            {/* Dropdown */}
                            {menuOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-white text-gray-800 shadow-xl rounded-lg p-3 text-sm border border-gray-200 animate-fadeScale">
                                    <div className="mb-2 border-b pb-2">
                                        <p className="font-semibold">{user?.displayName || "User"}</p>
                                        <p className="text-xs text-gray-500">{user?.email}</p>
                                    </div>

                                    <Link href="/add-product" className="block px-2 py-2 hover:bg-gray-100 rounded">
                                        <MdLibraryAdd className="inline mr-1" /> Add Product
                                    </Link>

                                    <Link href="/manage-products" className="block px-2 py-2 hover:bg-gray-100 rounded">
                                        <MdReviews className="inline mr-1" /> Manage Products
                                    </Link>

                                    <button onClick={handleLogout} className="mt-2 w-full flex items-center gap-1 px-2 py-2 text-red-600 hover:bg-red-50 rounded">
                                        <IoLogOut /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="lg:hidden text-3xl text-gray-800" onClick={() => setOpen(!open)}>☰</button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="lg:hidden bg-white text-gray-700 shadow-md">
                    <ul className="flex flex-col gap-2 p-4">

                        <Link href="/" className="flex items-center gap-2 py-2 border-b"><GoHomeFill /> Home</Link>
                        <Link href="/products" className="flex items-center gap-2 py-2 border-b"><MdReviews /> Products</Link>

                        {user && (
                            <>
                                <Link href="/add-product" className="flex items-center gap-2 py-2 border-b"><IoMdAddCircle /> Add Product</Link>
                                <Link href="/manage-products" className="flex items-center gap-2 py-2 border-b"><MdReviews /> Manage</Link>
                            </>
                        )}

                        {!user ? (
                            <Link href="/login" className="mt-2 w-full py-2 bg-black text-white text-center rounded-full"><span className="flex items-center justify-center gap-2"><IoLogIn /> Login</span></Link>
                        ) : (
                            <button onClick={handleLogout} className="text-red-600 flex items-center gap-2 py-2"><IoLogOut /> Logout</button>
                        )}

                    </ul>
                </div>
            )}
        </nav>
    );
}
