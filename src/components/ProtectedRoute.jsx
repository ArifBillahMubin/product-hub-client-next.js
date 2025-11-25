"use client";

import { useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            router.push(`/login?redirect=${pathname}`);
        }
    }, [loading, user, pathname, router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] text-lg font-medium">
                Loading...
            </div>
        );
    }

    return user ? children : null;
}
